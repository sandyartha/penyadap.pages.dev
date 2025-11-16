export const useSiteUrl = () => {
  const runtimeConfig = useRuntimeConfig()
  return computed(() => runtimeConfig.public.siteUrl || 'https://penyadap.pages.dev')
}
