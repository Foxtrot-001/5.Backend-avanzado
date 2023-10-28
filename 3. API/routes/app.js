const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./api/product-router");
const ticketRouter = require("./api/ticket-router");
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect("mongodb://localhost/ticketsystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/tickets", ticketRouter);

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
