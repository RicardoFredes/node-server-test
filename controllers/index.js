const express = require('express')
const rp = require('request-promise')
const router = express.Router()

router.use('/', (req, res) => {
	const getBlogPosts = require('../models/getBlogPosts');
	getBlogPosts()
		.then(data => res.render('../views/pages', {data}))
		.catch(error => console.log(error))
})
/*
router.use('/',function(req, res){
  var pathname = req.url;
  res.render('../views/pages' + pathname, {pathname});
});
*/
module.exports = router
