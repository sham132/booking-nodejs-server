const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/signup', function(req, res) {
   console.log(req.body);
   
   User.find({email : req.body.email}, function (err, docs) {
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
                message:"User Already Exist"
             }); 
        }else{
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err) {
                   return res.status(500).json({
                      error: err
                   });
                }
                else {
                   const user = new User({
                      _id: new  mongoose.Types.ObjectId(),
                      name:req.body.name,
                      phone:req.body.phone,
                      email: req.body.email,
                      password: hash    
                   });
                   user.save().then(function(result) {
                      console.log(result);
                      res.status(200).json({
                         success: 'New user has been created'
                      });
                   }).catch(error => {
                      res.status(500).json({
                         error: err
                      });
                   });
                }
             });
        }
      }
      
    });


});



// router.put('/edituser/:id', function(req, res) {
//     var userToUpdate = req.params.id;
//     User.update({ _id: userToUpdate }, req.body, function (err, result) {
//        if(err)
//        {
//        console.log(err);
//        }else{
// res.send({
//             message: "Record update Susscessfully"
//         });
//        }
        
//     });
//  });

 
// router.delete('/deleteuser/:id', function(req, res) {
//     var userToUpdate = req.params.id;
//     User.deleteOne({ _id: userToUpdate },function (err, result) {
//         res.send(
//             {
//                 message: "Record delete Susscessfully"
//             });
//     });
//  });

// router.get('/list', function(req, res) {
   
//     User.find()
//     .then(notes => {
//         res.json(notes);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });
//  });






module.exports = router;