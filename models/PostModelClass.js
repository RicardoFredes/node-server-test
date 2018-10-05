const ModelBase = require('./ModelBase.js')

class PostModel extends ModelBase{
	constructor(){
		super('posts')
	}
}

module.exports = PostModel


PostModel.get()