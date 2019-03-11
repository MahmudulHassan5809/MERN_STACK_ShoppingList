const express = require('express');
const router  = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');


// Item Model
const User = require('../../models/User');

// @route  Post api/users
// @desc   Register New User
// @access Public
router.post('/',(req,res)=>{
	const { name,email,password } = req.body;

	//Simple Validation
	if(!name || !email || !password){
		return res.status(400).json({msg: 'Please Enter All Fields'});
	}

	//Check For Existing User
	User.findOne({email})
		.then(user => {
			if(user){
				return res.status(400).json({msg: 'Email Already Exists'});
			}
			const newUser = new User({
				name,
				email,
				password
			});

			//Create salt & hash
			bcrypt.genSalt(10 , (err , salt) => {
                bcrypt.hash(newUser.password , salt , (err , hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    	.then(user => {
                    		jwt.sign(
								{ id: user.id },
								config.get('jwtSecret'),
								{ expiresIn: 3600 },
								(err,token) => {
									if(err) throw err;
									res.json({
									token,
	                    			user:{
	                    				id: user.id,
	                    				name: user.name,
	                    				email: user.email
	                    			}
	                    		})
								}
                    		)
						})
                    	.catch(err => console.log(err));
                });
          	});

		})
});


module.exports = router;
