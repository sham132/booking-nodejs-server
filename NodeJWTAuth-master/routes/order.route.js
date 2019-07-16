const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order.model');
const User = require('../models/user.model');

router.post('/orderMeal', function(req, res) {
   console.log(req.body);
   if(!req.body.itemname)
   {
User.find({name : req.body.ordername}, function (err, docs) {
      if(err)
      {
        return res.status(400).json({
                error:err
             }); 
      }
      else{

        if (docs.length==0){
            return res.status(422).json({
                message:"USer Not Exists"
             }); 
        }else{
             const order = new Order({
                      _id: new  mongoose.Types.ObjectId(),
                      ordername:req.body.ordername,
                      orderphone:req.body.orderphone,
                      orderemail :req.body.orderemail, 
                      ordercategory :req.body.ordercategory,
                      orderitems:req.body.orderitems,
                      orderdescription:req.body.orderdescription,
                      orderquantity :req.body.orderquantity, 
                      orderprice :req.body.orderprice,
                      orderaddress :req.body.orderaddress,
                      orderstatus :req.body.orderstatus,
                   });
                   order.save().then(function(result) {
                      console.log(result);
                      res.status(200).json({
                         success: 'New Order have been initiated'
                      });
                   }).catch(error => {
                      res.status(500).json({
                         error: err
                      });
                   });
        }
      }
      
    });
   }
   else{
       res.send("No user Exists Please register and Login to continue..");
   }
   
   


});



router.put('/editOrderMeal/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Order.update({ _id: userToUpdate }, req.body, function (err, result) {
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

 
router.delete('/deleteOrderMeal/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Order.deleteOne({ _id: userToUpdate },function (err, result) {
        res.send(
            {
                message: "OrderMeal delete Susscessfully"
            });
    });
 });

router.get('/listOrderMeal', function(req, res) {
   
    Order.find()
    .then(notes => {
        res.json(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
 });






module.exports = router;