const parseDate = require('./parseDate')

const parsePosts = data => data.map(postItem => ({
  _id: postItem.id,
  title: postItem.title.rendered,
  content: postItem.excerpt.rendered,
  date: parseDate(postItem.date),
  slug: postItem.slug,
  _imageUri: postItem._links['wp:featuredmedia'][0].href,
  _authorId: postItem.author,
  _categories: postItem.categories
}))

const parseImageSize = image => ({
  src: image.source_url,
  height: image.height,
  width: image.width,
})

module.exports = {
	parsePosts,
  parseImageSize
}