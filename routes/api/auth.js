const express = require('express');
const router  = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');


// Item Model
const User = require('../../models/User');

// auth middleware
const auth = require('../../middleware/auth');

// @route  Post api/auth
// @desc   Auth User
// @access Public
router.post('/',(req,res)=>{
	const { email,password } = req.body;

	//Simple Validation
	if(!email || !password){
		return res.status(400).json({msg: 'Please Enter All Fields'});
	}

	//Check For Existing User
	User.findOne({email})
		.then(user => {
			if(!user){
				return res.status(400).json({msg: 'User Does Not Exists'});
			}
			//Validate Password
			bcrypt.compare(password,user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});
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

		})
});


// @route   GET api/users/current
// @desc    return Current User
// @access  private
router.get('/current',auth,(req , res) =>{
	//res.json({msg : 'Success'});
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user));
});


module.exports = router;
