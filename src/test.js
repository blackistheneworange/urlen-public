const createCompress = require('compress-brotli')

// It exposes compress/decompress methods
const { compress, decompress } = createCompress()

const data = 'https://www.youtube.com/watch?v=j6dKHisNISU&list=RDlpeuIu-ZYJY&index=27'

// Override call level options (deep merge for parameters)
const compressed = compress(data)
.then((d)=>{
    console.log(d.length)
    console.log(d.toString('base64'))
});