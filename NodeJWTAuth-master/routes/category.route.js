const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category.model');

router.post('/addCategory', function(req, res) {
   console.log(req.body);
   
   Category.find({categoryname : req.body.categoryname}, function (err, docs) {
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
                message:"categoryname Already Exist"
             }); 
        }else{
             const category = new Category({
                      _id: new  mongoose.Types.ObjectId(),
                      categoryname:req.body.categoryname,
                      categorydescription:req.body.categorydescription   
                   });
                   category.save().then(function(result) {
                      console.log(result);
                      res.status(200).json({
                         success: 'New category has been created'
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



router.put('/editCategory/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Category.update({ _id: userToUpdate }, req.body, function (err, result) {
       if(err)
       {
       console.log(err);
       }else{
res.send({
            message: "Category update Susscessfully"
        });
       }
        
    });
 });

 
router.delete('/deleteCategory/:id', function(req, res) {
    var userToUpdate = req.params.id;
    Category.deleteOne({ _id: userToUpdate },function (err, result) {
        res.send(
            {
                message: "Category delete Susscessfully"
            });
    });
 });

router.get('/listCategory', function(req, res) {
   
    Category.find()
    .then(notes => {
        res.json(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
 });






module.exports = router;