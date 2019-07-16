const mongoose = require('mongoose');

const menu = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   itemname:{type: String, required: true},
   itemdescription: {type: String, required: true},
   itemcategory: {type: String, required: true},
   itemprice: {type: String, required: true}

},
{timestamps: true}
);

module.exports = mongoose.model('Menu', menu);