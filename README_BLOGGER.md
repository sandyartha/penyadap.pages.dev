# Publish Markdown to Blogger

Script untuk publish Markdown files dari Nuxt project langsung ke Blogger dengan upload gambar otomatis.

## 📋 Requirements

- Python 3.7+
- `client_secrets.json` dari Google Cloud Console
- Google account dengan akses ke Blogger blog

## 🚀 Quick Start

### 1. Setup Dependencies (PowerShell)
```powershell
pip install google-auth-oauthlib google-api-python-client markdown2
```

### 2. Jalankan Script

**Option A: Interactive Mode (Recommended)**
```powershell
python publish_interactive.py
```
Menu interaktif untuk pilih file, label, slug, dll.

**Option B: PowerShell Script**
```powershell
./run.ps1
```
Auto-detect dependencies, pilih file dari menu.

**Option C: Command Line (Direct)**
```powershell
python publish_md_to_blogger.py content/articles/your-file.md --draft --labels "Tag1" "Tag2"
```

**Option D: Batch File (Windows CMD)**
```cmd
run.bat
```

## 📖 Usage Examples

### Publish sebagai Draft
```powershell
python publish_md_to_blogger.py content/articles/aplikasi-penyadap-hp.md --draft
```

### Publish dengan Labels & Custom Slug
```powershell
python publish_md_to_blogger.py content/articles/my-post.md --labels "Hacking" "Tips" --slug "cara-sadap-wp"
```

### Interactive Mode
```powershell
python publish_interactive.py

# Akan meminta:
# 1. Pilih file (menu atau path)
# 2. Labels (optional)
# 3. Custom slug (optional)
# 4. Confirm publish as draft? (y/n)
```

## 🔧 Configuration

Edit variables di `publish_md_to_blogger.py`:
```python
BLOGGER_BLOG_ID = "2617078619347850321"  # Ganti dengan blog ID kamu
OAUTH_CLIENT_SECRETS = "client_secrets.json"  # Path ke OAuth file
```

### Cara dapat Blog ID:
1. Buka blog di https://www.blogger.com
2. Buka Chrome DevTools (F12)
3. Cari di Network tab saat refresh halaman
4. Cari request ke `www.blogger.com/json/posts`
5. Response akan mengandung `"blog":{"id":"XXXX"}`

Atau cek di Dashboard → Settings → Blog ID

## 🖼️ Image Handling

- Script otomatis:
  1. Cari semua gambar di Markdown (`![alt](path/to/image)`)
  2. Upload ke Blogger
  3. Ganti URL lokal dengan URL Blogger
  4. Publish post dengan gambar terupload

- Format gambar yang didukung: JPG, PNG
- Remote URLs (http://..., https://...) tidak di-upload ulang

## 🔐 OAuth Setup

### Pertama kali jalankan:
1. Script akan buka browser otomatis
2. Login dengan Google account (punya akses ke Blogger)
3. Grant permission ke Blogger API
4. Script akan save token otomatis

### Token disimpan di:
- `.creds/blogger_creds.json` (auto-created)
- Reusable untuk publish berikutnya, no need re-login

## 📝 Markdown Features Supported

Script support markdown extras:
- Fenced code blocks (\`\`\`)
- Tables
- Inline HTML
- Standard Markdown (bold, italic, links, dll)

## 🐛 Troubleshooting

### `ModuleNotFoundError: No module named 'google_auth_oauthlib'`
```powershell
pip install google-auth-oauthlib google-api-python-client markdown2
```

### `client_secrets.json not found`
1. Buka https://console.cloud.google.com/
2. Create Project baru
3. Enable Blogger API
4. Create OAuth 2.0 Desktop Client
5. Download JSON, save sebagai `client_secrets.json`

### Browser tidak buka otomatis
Script akan print URL ke console, buka manual di browser.

### Gambar gagal upload
- Pastikan path gambar benar (relative to markdown file)
- Cek format gambar (JPG/PNG only)
- Check file permissions

## 📋 Script Files

| File | Fungsi |
|------|--------|
| `publish_md_to_blogger.py` | Main script (command line) |
| `publish_interactive.py` | Interactive UI version |
| `run.ps1` | PowerShell wrapper + auto-setup |
| `run.bat` | Windows CMD wrapper |
| `client_secrets.json` | OAuth credentials (download dari Google Cloud) |

## 🎯 Tips

- Gunakan `--draft` untuk test sebelum publish live
- Custom slug buat URL yang SEO-friendly
- Labels (tags) memudahkan kategorisasi blog posts
- Images disimpan di Blogger, bukan CDN eksternal

## 📞 Support

Untuk error atau issue, cek:
1. Error message di console
2. Pastikan `client_secrets.json` valid
3. Check blog ID benar
4. Verify OAuth permissions granted

---

**Happy blogging! 🚀**
