const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next){
	const token = req.header('x-auth-token');

	//Check For Token
	if(!token){
		return res.status(401).json({ msg: 'No Token, Authorization Denied'});
	}

	try {
		//Verify Token
		const decoded = jwt.verify(token ,config.get('jwtSecret'));
		//Add user From Payload
		req.user = decoded;
		next();
	} catch(e) {
		return res.status(400).json({ msg: 'Token Is Not Valid'});
	}

}

module.exports = auth;
