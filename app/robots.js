export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://nimamhn.github.io/nimamehrani/sitemap.xml'
  };
}
