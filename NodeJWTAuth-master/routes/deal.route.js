const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Deal = require('../models/deal.model');

router.post('/addDeal', function(req, res) {
   console.log(req.body);
   
   Deal.find({dealname : req.body.dealname}, function (err, docs) {
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
                message:"Deal Already Exist"
             }); 
        }else{
             const deal = new Deal({
                      _id: new  mongoose.Types.ObjectId(),
                      dealname:req.body.dealname,
                      dealdescription:req.body.dealdescription,
                      dealitems :req.body.dealitems, 
                      dealprice :req.body.dealprice
                   });
                   deal.save().then(function(result) {
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



router.put('/editDeal/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Deal.update({ _id: userToUpdate }, req.body, function (err, result) {
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

 
router.delete('/deleteDeal/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Deal.deleteOne({ _id: userToUpdate },function (err, result) {
        res.send(
            {
                message: "Deal delete Susscessfully"
            });
    });
 });

router.get('/listDeal', function(req, res) {
   
    Deal.find()
    .then(notes => {
        res.json(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
 });






module.exports = router;