require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const mangaRouter = require("./routes/manga.routes");
app.use("/", mangaRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});