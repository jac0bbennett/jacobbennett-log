const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/favicon.ico", (req, res) => {
      return res.sendFile(path.join(__dirname, "favicon.ico"));
    });

    server.get("/post/:slug", (req, res) => {
      const queryParams = { slug: req.params.slug };
      return app.render(req, res, "/post", queryParams);
    });

    server.get("/tag/:tag", (req, res) => {
      if (req.params.tag === req.params.tag.toLowerCase()) {
        const queryParams = {
          tag: req.params.tag
        };
        return app.render(req, res, "/tag", queryParams);
      } else {
        return res.redirect("/tag/" + req.params.tag.toLowerCase());
      }
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
