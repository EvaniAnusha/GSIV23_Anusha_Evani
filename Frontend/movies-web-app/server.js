import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import cors from "cors";
import ListPage from "./src/pages/list-page.js";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  const appHtml = renderToString(ListPage);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Movies Browser App</title>
      </head>
      <body>
        <div id="list-page">${appHtml}</div>
        <script src="/client.js"></script> <!-- Client-side JavaScript bundle -->
      </body>
    </html>
  `);
});
app.listen(3000, () => {
  console.log("HTTP Server is running on port 3000");
});
