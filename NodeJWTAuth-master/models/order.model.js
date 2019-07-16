const mongoose = require('mongoose');

const order = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId, 
   ordername:{type: String, required: true}, // order name means customer name
   orderphone:{type: String, required: true},   // order name means customer phone number
   orderemail:{type: String, required: true},   // order name means customer email address
   ordercategory:{type: String, required: true},
   orderitems:{type: String, required: true},
   orderdescription: {type: String, required: true},
   orderquantity: {type: String, required: true},
   orderprice: {type: String, required: true},
   orderaddress: {type: String, required: true},   // order name means customer full address
  orderstatus: {type: String, required: true}

},
{timestamps: true}
);

module.exports = mongoose.model('Order', order);