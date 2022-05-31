const express = require("express");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const router = require("./routes/routes");

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuates
  max: 100, // 100 requests
});
const PORT = 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(xss()); // Prevent xss attacks
app.use(limiter);
app.use(hpp()); // Prevent http param polution
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
  return res.send("api is working!");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
