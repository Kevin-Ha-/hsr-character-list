const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs-js')
const path = require('path')
const http = require('http')
const https = require('https')

import { characterData } from './../types/types'

const starRailData = require('./../data/data.json')

async function getHTML(url) {
    const { data } = await axios.get(url)

    const $ = cheerio.load(data)
    return $
}

/** @returns {characterData}  an array of objects containing relevant character info */
async function getData() {
    const data = await Promise.all([
        getCharacterData(),
        getPathData()
    ]).then(([charData, pathData]) => {
        // data is sorted by 5 stars alphabetically, then 4 stars. Combine and return all alphabetically
        const sortedCharData = charData.sort((a,b) => {
            return a.name.localeCompare(b.name)
        })

        const combinedData = pathData.map((item, idx) => Object.assign({}, item, sortedCharData[idx]))
        return combinedData
    })

    return data
    
}

/**
 * retrieve character data and return, path data is missing from this source
 * @returns {Partial<characterData>}
 */
async function getCharacterData() {
    const $ = await getHTML(`https://genshin.gg/star-rail/character-stats`)

    const nodeList = []
    const nodes = $('.character-portrait')

    nodes.each((idx, el) => {
        const fullImageSrc = $(el).children('.character-icon').attr('src').replace('Thumb', 'Full')
        nodeList.push({
            name: $(el).children('.character-icon').attr('alt'),
            rarity: $(el).children('.character-icon').attr('class').includes('rarity-5') ? 5 : 4,
            element: $(el).children('.character-type').attr('alt'),
            owned: !returnOwned(),
            new: returnOwned()
        })
    })
    return nodeList
}

/**
 * need a seperate scrape to get path data since genshin.gg does not have it
 * @returns {Partial<characterData>}
 */
async function getPathData() {
    const $ = await getHTML(`https://honkai-star-rail.fandom.com/wiki/Character/List`)

    const nodeList = []
    const nodeBody = $('.article-table tbody')[0]
    const nodes = $(nodeBody).children()

    nodes.each((idx, el) => {  
        const nameRow = $(el).children('td')[0]
        const pathRow = $(el).children('td')[2]

        const cName = $(nameRow).children('a').attr('title')
        const cPath = $(pathRow).children('.nowrap').find('a').attr('title')

        nodeList.push({
            name: cName,
            character_path: cPath
        })
    })

    return nodeList.slice(1) // remove the first element, its undefined
}

/**
 * @param {characterData} data
 */
function writeToFile(data) {
    try {
        fs.writeFileSync('./../data/data.json', JSON.stringify(data), null, 6)
    } catch(e) {
        throw new Error(`failed to write to file: ${e}`)
    }
}

/**
 * download images to images directory
 */
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
            downloadImage(charData.src, filePath)
        } catch(e) { console.error(`error downloading: ${e}`)}
    }
}

/**
 * 
 * @param {string} src URL of image to download
 * @param {string} destination src folder to download image to
 * @returns {void}
 */
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

/** for demonstration to new and owned character state, since I don't have access to that info*/
function returnOwned() {
    const val = Math.random() * 10
    return val > 7.5
}

/** 
 * to run:
 * 1. navigate to src/helpers
 * 2. node scrape-portraits.js
 * 3. json file should be generated in src/data
 */
getData().then(result => {
    writeToFile(result)
}).catch(e => console.log(e))
