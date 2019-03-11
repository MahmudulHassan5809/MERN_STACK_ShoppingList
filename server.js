const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const path = require('path');
const config = require('config')

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

//Body parser
app.use(express.json());


// DB Config
const db = require('./config/keys').mongoURI

//Connect to Mongo
mongoose
	.connect(db,{
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('Mongo DB Connected'))
	.catch(err => console.log(err));



//Use Routes
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);

//Serve Static assets if in Production
if(process.env.NODE_ENV === 'production'){
	//set static folder
	app.use(express.static('client/build'));

	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	});
}

const port = process.env.PORT || 5000
app.listen(port,() => console.log(`Server Started on Port ${port}`))
