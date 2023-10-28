const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
 subtotal: { type: Number, required: true },
 tax: { type: Number, required: true },
 total: { type: Number, required: true },
 items: [
    {
      article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
      quantity: { type: Number, required: true },
    },
 ],
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;