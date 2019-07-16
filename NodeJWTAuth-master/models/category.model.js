const mongoose = require('mongoose');

const category = mongoose.Schema({
   id: mongoose.Schema.Types.ObjectId,
   categoryname:{type: String, required: true},
   categorydescription: {type: String, required: true}

},
{timestamps: true}
);

module.exports = mongoose.model('Category', category);