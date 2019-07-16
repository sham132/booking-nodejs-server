const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config.json');

/** verifyToken method - this method verifies token */
// function verifyToken(req, res, next){

//     //Request header with authorization key
//     const token = req.body.token || req.query.token || req.headers['x-access-token']
//   // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, config.secret, function(err, decoded) {
//         if (err) {
//             return res.status(401).json({"error": true, "message": 'Unauthorized access.' });
//         }
//       req.decoded = decoded;
//       next();
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//         "error": true,
//         "message": 'No token provided.'
//     });
//   }
// }


router.post('/signin', function (req, res) {
   User.findOne({
         email: req.body.email
      })
      .exec()
      .then(function (user) {
         if(user){
             bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) {
               return res.status(401).json({
                  failed: 'Unauthorized Access'
               });
            }
            if (result) {
               const JWTToken = jwt.sign({
                     email: user.email,
                     _id: user._id
                  },
                  'secret', {
                     expiresIn: '2h'
                  });
               return res.status(200).json({
                  name: user.name,
                  email: user.email,
                  token: JWTToken
               });
            }
           
            return res.status(401).json({
               failed: 'Unauthorized Access'
            });
         });
         }
         else
         {
          return res.status(401).json({
                  failed: 'Email or password incorrect ! Please try again..'
               });  
         }
        
      })
      .catch(error => {
         res.status(500).json({
            error: error
         });
      });;
});
router.post('/signup', function (req, res) {




   // if (!req.body.name) {
      
   //    return res.json({
   //       message: "Name can't be Empty"
   //    })

   // }
   // if (!req.body.phone & req.body.phone.length >= 11) {
   //    console.log(req.body.phone.length);
   //    return res.json({
   //       message: "Pleasae enter correct phone number"
   //    })
   // }
   // if (!req.body.address && req.body.address.length <7) {
   //    return res.json({
   //       message: "Address can't be Empty"
   //    })
   // }

   // function isEmailAddress(str) {
   //    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   //    return pattern.test(str); // returns a boolean 
   // }
   // let checkemail = isEmailAddress(req.body.email);

   // if (!req.body.email || checkemail === false) {
   //    console.log(typeof (checkemail));
   //    return res.json({
   //       message: "Please enter correct email"
   //    })
   // }

   if (!req.body.password) {
      return res.json({
         message: "password can't be empty"
      })
   }


   User.find({
      email: req.body.email
   }, function (err, docs) {
      if (err) {
         return res.status(400).json({
            error: err
         });
      } else {
         console.log("check user", docs.length);
         if (docs.length == 1) {
            return res.status(422).json({
               message: "User Already Exist"
            });
         } else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
               if (err) {
                  return res.status(500).json({
                     error: err
                  });
               } else {
                  const user = new User({
                     _id: new mongoose.Types.ObjectId(),
                     name: req.body.name,
                     phone: req.body.phone,
                     address: req.body.address,
                     email: req.body.email,
                     password: hash
                  });
                  console.log("user",user);
                  user.save().then(function (result) {
                     console.log(result);
                     res.status(200).json({
                        success: 'New user has been created'
                     });
                  }).catch(error => {
                     res.status(500).json({
                        error: error
                     });
                  });
               }
            });
         }
      }

   });


});



router.put('/edituser/:id', function (req, res) {
   var userToUpdate = req.params.id;
   User.update({
      _id: userToUpdate
   }, req.body, function (err, result) {
      if (err) {
         console.log(err);
      } else {
         res.send({
            message: "Record update Susscessfully"
         });
      }

   });
});


router.delete('/deleteuser/:id', function (req, res) {
   var userToUpdate = req.params.id;
   User.deleteOne({
      _id: userToUpdate
   }, function (err, result) {
      res.send({
         message: "Record delete Susscessfully"
      });
   });
});

// router.use(require('../tokenChecker'));
router.get('/list', function (req, res) {

   User.find()
      .then(notes => {
         res.json(notes);
      }).catch(err => {
         res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
         });
      });
});







module.exports = router;