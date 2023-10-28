const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
