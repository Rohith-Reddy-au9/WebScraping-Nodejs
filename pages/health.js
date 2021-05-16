const cheerio = require('cheerio')
const mongoose = require('mongoose')

const Health = require('../model/health')


exports.getHealthContent = async(page) => {
    await page.goto("https://www.firstpost.com/category/health", {waitUntil: 'load', timeout: 0})
      const html = await page.content()
      const $ = cheerio.load(html)
  
          // get all the content as  an array object
      const healthresult = $(".big-thumb").map((index, element) => {
              // class for respective tags
          const titleclass = $(element).find(".main-title")
  
          // tag and attribute content
          const title = $(titleclass).text().trim()
          const titleurl = $("a", titleclass).attr("href")
          return { title, titleurl }
      }).get()
      return healthresult
  }
  
exports.healthContent = async(healthnews, page) => {
    try {
      for(i = 0; i < healthnews.length; i++) {
        await page.goto(healthnews[i].titleurl)
        const html = await page.content()
        const $ = cheerio.load(html)
        const healthimgurl = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.article-img > img").attr("src")
        healthnews[i].healthimgurl = healthimgurl
        const healthnewscontent = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.inner-copy.article-full-content").text().trim() .replace("/n", " ").replace("\n", " ").replace("+", "")
        healthnews[i].healthnewscontent = healthnewscontent
        console.log(healthnews[i].healthimgurl)
  
        const healthnewsModel =new Health(healthnews[i])
        await healthnewsModel.save()
    }
    } catch (error) {
      console.log(error)
    }
  }