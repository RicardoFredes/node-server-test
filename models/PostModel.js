const {modelCachedGetter} = require('./ModelBase.js')

const getPosts = modelCachedGetter('posts')

module.exports = {
	getPosts
}

getPosts()