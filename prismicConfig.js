// prismicConfig.js
import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

const repoName = process.env.PRISMIC_REPOSITORY_NAME;
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

const routes = [
  {
    type: "page",
    path: "/:uid",
  },
];

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes,
});
