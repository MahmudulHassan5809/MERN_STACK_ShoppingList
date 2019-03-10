const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');


const app = express();

//Body parser
app.use(bodyParser.json());


// DB Config
const db = require('./config/keys').mongoURI

//Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('Mongo DB Connected'))
	.catch(err => console.log(err));



//Use Routes
app.use('/api/items',items);

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
