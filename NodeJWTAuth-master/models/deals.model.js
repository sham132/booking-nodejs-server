const mongoose = require('mongoose');

const deal = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   dealname:{type: String, required: true},
   dealdescription: {type: String, required: true},
   dealitems: {type: String, required: true},
   dealprice: {type: String, required: true}

},
{timestamps: true}
);

module.exports = mongoose.model('Deal', deal);