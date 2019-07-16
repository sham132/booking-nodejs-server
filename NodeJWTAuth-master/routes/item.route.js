const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/item.model');

router.post('/addItem', function(req, res) {
   console.log(req.body);
   
   Item.find({itemname : req.body.itemname}, function (err, docs) {
      if(err)
      {
        return res.status(400).json({
                error:err
             }); 
      }
      else{
console.log("check user",docs.length);
        if (docs.length==1){
            return res.status(422).json({
                message:"itemname Already Exist"
             }); 
        }else{
             const item = new Item({
                      _id: new  mongoose.Types.ObjectId(),
                      itemname:req.body.itemname,
                      itemdescription:req.body.itemdescription,
                      itemcategory :req.body.itemcategory, 
                      itemprice :req.body.itemprice
                   });
                   item.save().then(function(result) {
                      console.log(result);
                      res.status(200).json({
                         success: 'New item has been created'
                      });
                   }).catch(error => {
                      res.status(500).json({
                         error: err
                      });
                   });
        }
      }
      
    });


});



router.put('/editItem/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Item.update({ _id: userToUpdate }, req.body, function (err, result) {
       if(err)
       {
       console.log(err);
       }else{
res.send({

            message: result
        });
       }
        
    });
 });

 
router.delete('/deleteItem/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Item.deleteOne({ _id: userToUpdate },function (err, result) {
        res.send(
            {
                message: "Item delete Susscessfully"
            });
    });
 });

router.get('/listItems', function(req, res) {
   
    Item.find()
    .then(notes => {
        res.json(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
 });






module.exports = router;