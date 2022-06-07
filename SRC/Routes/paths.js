"use strict";

const path = require("path");

function about(req, res) {
  res.sendFile(path.join(__dirname, "..", "Views", "levelsPage.html"));
}

module.exports = { login };
