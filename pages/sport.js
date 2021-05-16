const cheerio = require('cheerio')
const mongoose = require('mongoose')

const Sport = require('../model/sport')

exports.getSportContent = async(page) => {
    try {
      await page.goto("https://www.firstpost.com/category/sports", {waitUntil: 'load', timeout: 0})
      const html = await page.content()
      const $ = cheerio.load(html)
  
          // get all the content as  an array object
      const sportresult = $(".big-thumb").map((index, element) => {
              // class for respective tags
          const titleclass = $(element).find(".main-title")
          // tag and attribute content
          const title = $(titleclass).text().trim()
          const titleurl = $("a", titleclass).attr("href")
  
          return { title, titleurl}
      }).get()
      return sportresult
      } catch (error) {
        console.error(error)
      }
  }
  
exports.sportContent = async(sportnews, page) => {
    try {
      for(i = 0; i < sportnews.length; i++) {
        await page.goto(sportnews[i].titleurl)
        const html = await page.content()
        const $ = cheerio.load(html)
        const sportimgurl = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.article-img > img").attr("src")
        sportnews[i].sportimgurl = sportimgurl
        const sportnewscontent = $("div.container.mainArticlediv > div.main-container > div > div.article-div-wrap > div.article-sect > div.inner-copy.article-full-content").text().trim() .replace("/n", " ").replace("\n", " ").replace("+", "")
        sportnews[i].sportnewscontent = sportnewscontent

        console.log(sportnews[i].sportimgurl)

        const sportnewsModel =new Sport(sportnews[i])
        await sportnewsModel.save()
    }
    } catch (error) {
      console.log(error)
    }
  }