// import { SitemapStream, streamToPromise } from "sitemap";
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
import firebase from "../../libs/clientApp"

export default async function sitemap(req, res) {
  try {
    const collection = await firebase.firestore().collection("portfolio").where("type", "==", "Project");
    const items = (await collection.get()).docs;
    const data = items.map((item) => item.data());
    // console.log(data)
    // An array with your links
    const links = [];
    data.map((project) => {
      links.push({
        url: `/project/${project.title}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // Add other static pages
    const pages = ["/about", "/contact", "/portfolio"];
    pages.map((url) => {
      links.push({
        url,
        changefreq: "daily",
        priority: 0.9,
      });
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    res.end(xmlString);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};