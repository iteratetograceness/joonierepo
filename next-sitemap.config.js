/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://joonie.dev',
  generateRobotsTxt: true,
}

export default config
