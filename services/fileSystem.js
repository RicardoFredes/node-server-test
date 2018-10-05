const fs = require('fs')

const exists = path => 
  new Promise((resolve, reject) => {
    fs.exists(path, data => {
      if(!data) reject(data)
      else resolve(data)
    })
  })

const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if(err) reject(err)
      else resolve(data)
    })
  })

const writeFile = (path, content) => 
  new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err, data) => {
      if(err) reject(err)
      else resolve(content)
    })
  })

const writeJsonFile = (path, content) =>
  writeFile(path, typeof content === 'string' ? content : JSON.stringify(content))

module.exports = {
  exists,
  readFile,
  writeFile,
  writeJsonFile
}