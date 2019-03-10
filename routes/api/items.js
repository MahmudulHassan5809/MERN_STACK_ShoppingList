const express = require('express');
const router  = express.Router()

// Item Model
const Item = require('../../models/Item');

// @route  GET api/items
// @desc   GET ALL Items
// @access Public
router.get('/',(req,res)=>{
	Item.find()
		.sort({ date:-1 })
		.then(items => {
			res.json(items)
		})
		.catch(err => res.json({warning:err}));
});




// @route  Post api/items
// @desc   Create A Item
// @access Public
router.post('/',(req,res)=>{
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save()
		.then(item => {
		   	res.json(item)
		})
		.catch(err => res.json({warning:err}));
});



// @route  DELETE api/items/:id
// @desc   Delete An Item
// @access Public
router.delete('/:id',(req,res)=>{
	Item.findById(req.params.id)
		.then(item => {
			item.remove().then(() => res.json({success:'Item Deleted'}))
		})
		.catch(err => {
			res.status(404).json({warning:'Item Not Found'})
		})
});

module.exports = router;
