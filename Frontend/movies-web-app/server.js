import express from "express";
import React from "react";
import http from "http";
import https from "https";
import fs from "fs";
import { renderToString } from "react-dom/server";
import cors from "cors";
import ListPage from "./src/pages/list-page.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend URL
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    credentials: true, // Enable CORS credentials (cookies, headers)
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
const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
  console.log("HTTP Server is running on port 3000");
});
