const express = require('express');
const app = express();
const swaggerUi =require('swagger-ui-express');
const swaggerDocument =require('./swagger.json');
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
/*  ---------------admin-----------------*/
const menu = require('./routes/menu.route');
const category = require('./routes/category.route');
const item = require('./routes/item.route');
/*  ---------------admin-----------------*/

/*  ---------------order-----------------*/
const order = require('./routes/order.route');
/*  ---------------order-----------------*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/OrderManagmentSystem');



const PORT = 3000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', function(req, res){
   res.json({
      "Tutorial": "Server is running"
   });
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user', user);
app.use('/admin/menu', menu);
app.use('/admin/category', category);
app.use('/admin/item', item);

app.use('/order/addorder', order);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});