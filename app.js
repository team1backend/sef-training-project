const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const { notFound, errorHanlder } = require("./middlewares/errors");

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    optionsSuccessStatus: 200,
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
