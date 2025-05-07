const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs-js')
const path = require('path')
const http = require('http')
const https = require('https')

const starRailData = require('./data')

async function getHTML() {
    const url = `https://genshin.gg/star-rail/character-stats`
    const { data } = await axios.get(url)

    const $ = cheerio.load(data)
    return $
}

async function getData() {
    const $ = await getHTML()

    const nodeList = []
    const nodes = $('.character-icon')

    nodes.each((idx, el) => {
        const fullImageSrc = $(el).attr('src').replace('Thumb', 'Full')
        nodeList.push({name: $(el).attr('alt'), thumb_src: $(el).attr('src'), full_src: fullImageSrc})
    })
    
    return nodeList
}

function getDataFromFile(starRailData) {
    console.log(starRailData)
}

function writeToFile(data) {
    try {
        fs.writeFileSync('./data.json', JSON.stringify(data))
    } catch(e) {
        throw new Error(`failed to write to file: ${e}`)
    }
}

async function downloadImages() {
    const imagesDirectory = './images'
    if(!fs.existsSync(imagesDirectory)) { 
        fs.mkdirSync(imagesDirectory, { recursive: true })
    }

    // maybe add seperate directory for thumbs and full size image?
    const imageUrls = starRailData.map((v) => ({name: v.name, src: v.full_src}))
    
    for(charData of imageUrls) {
        const fileName = `${charData.name.replaceAll(' ', '_')}_portrait.png`
        const filePath = path.join(imagesDirectory, fileName)
        try {
            await downloadImage(charData.src, filePath)
        } catch(e) { console.error(`error downloading: ${e}`)}
    }
}

function downloadImage(src, destination) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(destination)

        const request = (src.startsWith('https') ? https : http).get(src, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP error! status: ${response.statusCode}`));
                return;
            }
            response.pipe(fileStream)

            fileStream.on('finish', () => {
                fileStream.close()
                resolve()
            }).on('error', (error) => {
                fs.unlink(destination, () => reject(error))
            })
        })
    })
}

// getData().then(result => {
    // writeToFile(result)
    // getDataFromFile(starRailData)
    // downloadImages()
// }).catch(e => console.log(e))
