const Item = require('../models/song');
// instead of doing try catch on all functions we can put them in this fucntion
// asyncHandler -> it wraps the functions with try and catch
const asyncHandler = require('express-async-handler'); 

exports.items_list = asyncHandler(async(req, res, next) => {
    const allItems = await Item.find({}).sort({title: 1}).populate('category').exec();
})
