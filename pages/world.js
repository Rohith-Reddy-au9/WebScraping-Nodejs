const cheerio = require('cheerio')
const mongoose = require('mongoose')

const World = require('../model/world')


exports.getWorldsContent = async(page) => {
    try {
      await page.goto("https://www.firstpost.com/category/world", 
      {
        waitUntil: 'load', 
        timeout: 0
      })
    const html = await page.content()
    const $ = cheerio.load(html)

    // get all the content as  an array object
    const worldresult = $(".big-thumb").map((index, element) => {
            // class for respective tag
        const titleclass = $(element).find(".main-title")
         // tag and attribute content
        const title = $(titleclass).text().trim()
        const titleurl = $("a", titleclass).attr("href")
        return { title, titleurl }
    }).get()
    return worldresult
    } catch (error) {
      console.log(error)
    }
}

  // in this function we awill get respective titile content and images 
exports.worldContent = async(worldnews, page) => {
  try {
    // here i use traditaional for loop because 
    // for each loop doesn't work properly with puppeteer
    for(i = 0; i < worldnews.length; i++) {
      // it goes to the getWorldsContent function and get the title and title url
      await page.goto(worldnews[i].titleurl)
      const html = await page.content()
      const $ = cheerio.load(html)

      // here we get the image url
      const worldimgurl = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.article-img > img").attr("src")
      worldnews[i].worldimgurl = worldimgurl
      // we get the content 
      const worldnewscontent = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.inner-copy.article-full-content").text().trim() .replace("/n", " ").replace("\n", " ").replace("+", "")
      worldnews[i].worldnewscontent = worldnewscontent

      console.log(worldnews[i].worldimgurl)

      // here we save the content in database
      const worldnewsModel =new World(worldnews[i])
      await worldnewsModel.save()
    }
  } catch (error) {
    console.log(error)
  }
}