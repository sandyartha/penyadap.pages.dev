/**
 * Menghasilkan peta dimensi asli (width/height) semua gambar di `public/`,
 * lalu mengekspornya sebagai template virtual `#build/image-dimensions.mjs`.
 *
 * Tujuannya: `ProseImg.vue` bisa mengisi atribut width/height secara otomatis
 * sehingga tidak perlu lagi ditulis di file Markdown, tapi space gambar tetap
 * direservasi browser (mencegah Cumulative Layout Shift).
 *
 * Peta dibuat sekali saat `nuxt prepare`/build, bukan saat runtime, jadi tidak
 * ada pembacaan file di sisi client maupun server saat halaman dibuka.
 */
import { addTemplate, defineNuxtModule } from "@nuxt/kit";
import { readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { imageMeta } from "image-meta";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

function collectImages(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectImages(path));
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(path);
    }
  }
  return files;
}

export default defineNuxtModule({
  meta: {
    name: "image-dimensions"
  },

  setup(_options, nuxt) {
    const publicDir = join(nuxt.options.rootDir, nuxt.options.dir.public);

    addTemplate({
      filename: "image-dimensions.mjs",
      // Tanpa `write: true`, template hanya hidup di VFS Nuxt (tetap bisa
      // diimpor saat dev/build), tapi tidak pernah ditulis ke `.nuxt/` sehingga
      // sulit diperiksa. Dengan ini isinya bisa dilihat langsung setelah
      // `nuxt prepare`.
      write: true,
      getContents: () => {
        // key = path URL seperti yang ditulis di Markdown ("/demo/foto.png")
        const dimensions: Record<string, { width: number; height: number }> = {};

        for (const file of collectImages(publicDir)) {
          try {
            const { width, height } = imageMeta(readFileSync(file));
            if (width && height) {
              dimensions[`/${relative(publicDir, file).replace(/\\/g, "/")}`] = { width, height };
            }
          } catch {
            // Gambar yang gagal dibaca cukup dilewati: tanpa dimensi, gambar
            // tetap tampil, hanya kehilangan reservasi ruang (CLS).
          }
        }

        return [
          "// Dibuat otomatis oleh modules/image-dimensions.ts — jangan diedit manual.",
          `export default ${JSON.stringify(dimensions)}`
        ].join("\n");
      }
    });
  }
});
