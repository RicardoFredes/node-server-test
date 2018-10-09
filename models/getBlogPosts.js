const rp = require('request-promise')
const {exists, readFile, writeJsonFile} = require('../services/fileSystem')
const {parsePosts, parseImageSize} = require('../services/postsBlogParsers')

const tempFile = '_temp/wp-json_wp_v2_posts.cache'

const getBlogPosts = () => 
  getCachedPosts(tempFile)
    .catch(getPostsFromApi)
    .catch(error => console.log(error))

const getCachedPosts = path => 
  exists(path)
    .then(() => readFile(path))
    .then(cacheFile => JSON.parse(cacheFile))

const getPostsFromApi = () => 
  rp({ uri: 'https://blog.mesalva.com/wp-json/wp/v2/posts', json: true})
    .then(data => parsePosts(data))
    .then(data => Promise.all(getImages(data)))
    //.then(data => Promise.all(getAuthor(data)))
    .then(data => {
      writeJsonFile(tempFile, data)
      return data
    })

const getImages = data => 
  data.map(({_imageUri, ...props}) => rp({ uri, json: true })
  .then(image => (
   {
    ...props,
    image: {
      alt: image.alt_txt,
      default: {
        src: image.source_url,
        height: image.media_type.height,
        width: image.media_type.width,
      },
      medium: parseImageSize(image.media_details.sizes.medium),
    }
   } 
  )))

const getImageFromApi = (uri, props) => rp({ uri, json: true })
  .then(image => (
   {
    ...props,
    image: {
      alt: image.alt_txt,
      default: {
        src: image.source_url,
        height: image.media_type.height,
        width: image.media_type.width,
      },
      medium: parseImageSize(image.media_details.sizes.medium),
    }
   } 
  ))
  .catch(error => console.log(error))

module.exports = getBlogPosts
