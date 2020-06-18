const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const db = require("./database/db");

// Connect to MongoDB
db();

// Generate static assets (public folder)
app.use(express.static("./public"));

// Accept request
app.use(express.json({ extended: false }));

// Routes
app.use("/api/images", require("./routes/file"));

// Run the server
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
