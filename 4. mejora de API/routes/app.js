const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./api/product-router");
const ticketRouter = require("./api/ticket-router");
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');


mongoose.connect("mongodb://localhost/ticketsystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/tickets", ticketRouter);

module.exports = app;

//Mejora de API
let tickets = [
  {
      id: 1,
      items: [
          { articleId: 1, quantity: 2, price: 100 },
          { articleId: 2, quantity: 1, price: 150 },
      ],
  },
];

let articles = [
  { id: 1, name: 'Article 1', quantity: 10, price: 100 },
  { id: 2, name: 'Article 2', quantity: 5, price: 150 },
];

app.use(bodyParser.json());

app.get('/ticket/:id/calculate', (req, res) => {
  const ticketId = req.params.id;
  const ticket = tickets.find(t => t.id == ticketId);

  if (!ticket) {
      return res.status(404).send('Ticket not found');
  }

  let subtotal = 0;
  let total = 0;
  let vat = 0;

  ticket.items.forEach(item => {
      const article = articles.find(a => a.id == item.articleId);
      if (!article) {
          return res.status(404).send('Article not found');
      }

      subtotal += item.quantity * article.price;
      vat = subtotal * 0.21;
      total = subtotal + vat;
  });

  res.status(200).json({ subtotal, vat, total });
});

app.put('/ticket/:id/updateStock', (req, res) => {
  const ticketId = req.params.id;
  const ticket = tickets.find(t => t.id == ticketId);

  if (!ticket) {
      return res.status(404).send('Ticket not found');
  }

  let allArticlesAreAvailable = true;

  ticket.items.forEach(item => {
      const article = articles.find(a => a.id == item.articleId);
      if (!article) {
          return res.status(404).send('Article not found');
      }

      if (article.quantity < item.quantity) {
          allArticlesAreAvailable = false;
      } else {
          article.quantity -= item.quantity;
      }
  });

  if (!allArticlesAreAvailable) {
      return res.status(400).send('Some articles are not available in the required quantity');
  }

  res.status(200).send('Ticket articles stock updated successfully');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
