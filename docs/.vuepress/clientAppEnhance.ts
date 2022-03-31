import { defineClientAppEnhance } from '@vuepress/client'
// @ts-ignore
import { VanillaComponents } from "@indigit/vanilla-components";
import { makeServer } from "../mocks/server";

export default defineClientAppEnhance(({ app, router, siteData }) => {
  const configuration = {};
  app.use(VanillaComponents, configuration);
  // Mock Server
  makeServer();
})
