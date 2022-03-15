import { defineClientAppEnhance } from '@vuepress/client'
import { VanillaComponents } from "@indigit/vanilla-components";

export default defineClientAppEnhance(({ app, router, siteData }) => {
  const configuration = {};
  app.use(VanillaComponents, configuration)
})
