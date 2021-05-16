const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

const { getWorldsContent, worldContent } = require('./pages/world')
const { getSportContent, sportContent } = require('./pages/sport')
const { getHealthContent, healthContent } = require('./pages/health')
const  { getentertainmentContent, entertainmentContent } = require('./pages/entertainment')

var MONGO_URL = "mongodb+srv://rohith:rohith06@cluster0.d3ltm.mongodb.net/WebScraping?retryWrites=true&w=majority"

// db connection 

const dbconnect = async() => {
    await mongoose.connect(MONGO_URL, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }, (err, res)=>{
        if (err) console.log("mongo err", err)
        console.log("db connected")
    })
}


const Mainfunction = async() => {
    await dbconnect()
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    // respective pages content

    // const worldnews = await getWorldsContent(page)
    // const world = await worldContent(worldnews, page)

    // const sportnews = await getSportContent(page)
    // const sport = await sportContent(sportnews, page)

    // const healthnews = await getHealthContent(page)
    // const health = await healthContent( healthnews, page)

    const entertainmentnews = await getentertainmentContent (page)
    const entertainment = await entertainmentContent(entertainmentnews, page)

    console.log(world)
    console.log(sport)
    console.log(health)
    console.log(entertainment)

}
Mainfunction()

