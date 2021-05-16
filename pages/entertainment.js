const cheerio = require('cheerio')
const mongoose = require('mongoose')

const Entertainment = require('../model/entertainment')


// here i take sports world health news 
// In this function we get the title and title url only
// same process for all the pages 


exports.getentertainmentContent = async(page) => {
    await page.goto("https://www.firstpost.com/category/entertainment", 
    {
      waitUntil: 'load', 
      timeout: 0
    })
      const html = await page.content()
      const $ = cheerio.load(html)
  
          // get all the content as  an array object
      const entertainmentresult = $(".big-thumb").map((index, element) => {
              // class for respective tags
          const titleclass = $(element).find(".main-title")
  
          // tag and attribute content
          const title = $(titleclass).text().trim()
          const titleurl = $("a", titleclass).attr("href")
          return { title, titleurl }
      }).get()
      return entertainmentresult
  }

    // in this function we awill get respective titile content and images 

  
  exports.entertainmentContent = async(entertainmentnews, page) => {
    try {
        // here i use traditaional for loop because 
      // for each loop doesn't work properly with puppeteer
      for(i = 0; i < entertainmentnews.length; i++) {
        // it goes to the getWorldsContent function and get the title and title url
        await page.goto(entertainmentnews[i].titleurl)
        const html = await page.content()
        const $ = cheerio.load(html)
        const entertainmentimgurl = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.article-img > img").attr("src")
        entertainmentnews[i].entertainmentimgurl = entertainmentimgurl
        const entertainmentnewscontent = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.inner-copy.article-full-content").text().trim() .replace("/n", " ").replace("\n", " ").replace("+", "")
        entertainmentnews[i].entertainmentnewscontent = entertainmentnewscontent
        
        console.log(entertainmentnews[i].entertainmentimgurl)
  
        const entertainmentnewsModel =new Entertainment(entertainmentnews[i])
        await entertainmentnewsModel.save()
    }
    } catch (error) {
      console.log(error)
    }
  }