import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@prismicio/client";
import PrismicDom from "prismic-dom";
import fetch from "node-fetch"; // Import fetch for the Prismic client
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import logger from "morgan";

const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(errorHandler());

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

// ---------Routes------------
// landing page
app.get("/", (req, res) => {
  res.render("pages/home");
});

// about page
app.get("/about", async (req, res) => {
  const api = initPrismicApi(req);

  try {
    const preloader = await api.getSingle("preloader");
    // Fetch 'about' documents
    const aboutDocuments = await api.getAllByType("about");
    // Fetch 'meta' documents
    const metaDocuments = await api.getAllByType("metadata");
    const combinedResults = {
      about: aboutDocuments[0], // get the first element of data sent by Prismic
      meta: metaDocuments,
    };

    res.render("pages/about", { combinedResults, preloader });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send("Error fetching documents.");
  }
});

// collections page
app.get("/collections", async (req, res) => {
  const api = initPrismicApi(req);
  try {
    const preloader = await api.getSingle("preloader");
    const home = await api.getSingle("home", {
      fetchLinks: "collection.title",
    });
    //console.log(home);
    const collections = await api.getAllByType("collection", {
      fetchLinks: "product.image",
    });
    // Getting the products in each collection and save into product array
    let products = [];
    collections.forEach((collection) => {
      collection.data.products.forEach((product) => {
        products.push(product);
      });
    });
    //console.log("products array: ", products);
    res.render("pages/collections", { products, collections, home, preloader });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).send("Error fetching document.");
  }
});

// details page
app.get("/details/:uid", async (req, res) => {
  const api = initPrismicApi(req);
  const { uid } = req.params;

  try {
    const preloader = await api.getSingle("preloader");
    const product = await api.getByUID("product", uid, {
      fetchLinks: "collection.title",
    });
    console.log(product.data);
    res.render("pages/details", { product, preloader });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).send("Error fetching document.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
