require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');

const connectToDB = require("./config/dbConfig");
const errorHandler = require("./middlewares/errorHandler");
const mangaRouter = require("./routes/mangaRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", mangaRouter);

// global error handler
app.use(errorHandler);

connectToDB();

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});