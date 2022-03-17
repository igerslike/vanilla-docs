import { defineClientAppEnhance } from '@vuepress/client'
import { VanillaComponents } from "@indigit/vanilla-components";
import worker from "../mocks/browser";

export default defineClientAppEnhance(({ app, router, siteData }) => {
  const configuration = {};
  app.use(VanillaComponents, configuration);

  if (import.meta.env.DEV) {
    worker.start({
      onUnhandledRequest: "bypass"
    });
  }
})
