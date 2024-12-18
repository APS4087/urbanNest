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

// Set up paths and views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(errorHandler());
app.use(express.static(path.join(__dirname, "public")));

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

// Route handlers
const renderPage = async (req, res, page, fetchData) => {
  const api = initPrismicApi(req);
  try {
    const data = await fetchData(api);
    res.render(`pages/${page}`, data);
  } catch (error) {
    console.error(`Error fetching document for ${page}:`, error);
    res.status(500).send("Error fetching document.");
  }
};

// Routes
app.get("/", (req, res) => {
  renderPage(req, res, "home", async (api) => {
    const home = await api.getSingle("home");
    const preloader = await api.getSingle("preloader");
    const meta = await api.getSingle("metadata");
    const collections = await api.getAllByType("collection", {
      fetchLinks: "product.image",
    });
    return { meta, collections, home, preloader };
  });
});

app.get("/about", (req, res) => {
  renderPage(req, res, "about", async (api) => {
    const preloader = await api.getSingle("preloader");
    const about = await api.getSingle("about");
    const meta = await api.getSingle("metadata");
    return { about, meta, preloader };
  });
});

app.get("/collections", (req, res) => {
  renderPage(req, res, "collections", async (api) => {
    const meta = await api.getSingle("metadata");
    const preloader = await api.getSingle("preloader");
    const home = await api.getSingle("home", {
      fetchLinks: "collection.title",
    });
    const collections = await api.getAllByType("collection", {
      fetchLinks: "product.image",
    });
    const products = collections.flatMap(
      (collection) => collection.data.products
    );
    return { products, collections, home, preloader, meta };
  });
});

app.get("/details/:uid", (req, res) => {
  renderPage(req, res, "details", async (api) => {
    const { uid } = req.params;
    const meta = await api.getSingle("metadata");
    const preloader = await api.getSingle("preloader");
    const product = await api.getByUID("product", uid, {
      fetchLinks: "collection.title",
    });
    return { product, preloader, meta };
  });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
