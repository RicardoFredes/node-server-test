const rp = require('request-promise')
const {exists, readFile, writeFile, writeJsonFile} = require('../services/fileSystem')

const tempFile = '_temp/wp-json_wp_v2_posts.cache'

const rpPosts = () => 
  getCachedPosts(tempFile)
    .catch(getPostsFromApi)
    .catch(error => console.log(error))

const getCachedPosts = path => 
  exists(path)
    .then(() => readFile(path))
    .then(cacheFile => JSON.parse(cacheFile))

const getPostsFromApi = () => 
  rp({ uri: 'https://blog.mesalva.com/wp-json/wp/v2/posts', json: true})
    .then(data => Promise.all(parseDataAndGetImages(data)))
    .then(data => {
      writeJsonFile(tempFile, data)
      return data
    })

const parseDataAndGetImages = data => 
  data.map(postItem => 
    rpImage(postItem._links['wp:featuredmedia'][0].href)
      .then(image => 
        ({
          title: postItem.title.rendered,
          content: postItem.excerpt.rendered,
          slug: postItem.slug,
          image,
        })
      )
    )

const rpImage = uri => 
  rp({ uri, json: true })
    .then(image => 
      ({
        alt: image.alt_txt,
        default: {
          src: image.source_url,
          height: image.media_type.height,
          width: image.media_type.width,
        },
        medium: parseImageSize(image.media_details.sizes.medium),
      })
    )
    .catch(error => console.log(error))

const parseImageSize = image => ({
  src: image.source_url,
  height: image.height,
  width: image.width,
})

module.exports = rpPosts
