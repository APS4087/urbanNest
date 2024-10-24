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

app.get("/about", (req, res) => {
  const api = initPrismicApi(req);

  // Fetch 'about' documents first
  api
    .getAllByType("about")
    .then((aboutResponse) => {
      console.log("About Response:", aboutResponse); // Log the entire response

      // Check if there are any results for 'about'
      if (aboutResponse.length > 0) {
        // Change this line
        const about = aboutResponse[0]; // Accessing the first item in the 'about' array

        if (about.data && about.data.gallery) {
          about.data.gallery.forEach((media) => {
            console.log(media);
          });
        } else {
          console.log("No gallery found in the 'about' data.");
        }

        res.render("pages/about", { about });
      } else {
        // Handle case where no 'about' document is returned
        console.log("No 'about' documents found.");
        res.render("pages/about", { about: null });
      }
    })
    .catch((error) => {
      console.error("Error fetching 'about' documents:", error);
      res.status(500).send("Error fetching 'about' documents.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
