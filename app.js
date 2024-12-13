import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@prismicio/client";
import PrismicDom from "prismic-dom";
import fetch from "node-fetch"; // Import fetch for the Prismic client

const app = express();
const port = 3000;

// Initialize Prismic client
const initPrismicApi = (req) => {
  return createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetch,
  });
};

const handleLinkResolver = (doc) => {
  return "/";
};

// Set up paths and views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver,
  };
  res.locals.PrismicDom = PrismicDom;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routes
app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/about", async (req, res) => {
  const api = initPrismicApi(req);

  try {
    // Fetch 'about' documents
    const aboutDocuments = await api.getAllByType("about");
    // Fetch 'meta' documents
    const metaDocuments = await api.getAllByType("metadata");

    // console.log("about documents", aboutDocuments);
    // console.log("meta documents", metaDocuments);

    // // Log the gallery property of each about document
    // aboutDocuments.forEach((doc) => {
    //   console.log(doc.data.body);
    // });

    // Combine the results if needed
    const combinedResults = {
      about: aboutDocuments[0], // get the first element of data sent by Prismic
      meta: metaDocuments,
    };

    res.render("pages/about", { combinedResults });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Error fetching documents.");
  }
});

app.get("/details/:uid", async (req, res) => {
  const api = initPrismicApi(req);
  const { uid } = req.params;

  try {
    const product = await api.getByUID("product", uid, {
      fetchLinks: "collection.title",
    });
    console.log(product.data);
    res.render("pages/details", { product });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).send("Error fetching document.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
