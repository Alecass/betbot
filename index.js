const puppeteer = require('puppeteer')
const settings = require('./settings.json')
const db = require('./db/db.json')

const fs = require('fs');


async function getValueBets() {

  const url = `https://oddspedia.com/api/v1/getValueBets?markets=&overValue=${settings.minOvervalue}%2C100.00&oddsRangeMin=1.01&oddsRangeMax=1000.00&geoCode=IT&geoState=&sports=&bookmakers=${settings.bookmakers}&wettsteuer=0&sort=${settings.sortBy}&language=en`

  const browser = await puppeteer.launch({ headless: "new" })
  const page = await browser.newPage()
  await page.setJavaScriptEnabled()
  await page.goto(url)

  const valueBetsJson = await page.evaluate(() => {
    return document.body.textContent;
  })

  await browser.close()

  return JSON.parse(valueBetsJson)

}


function updateDb(newValueBets) {

  // db.forEach(valueBetId => {
  //   if(newValueBets.includes())
  // })

  fs.writeFile('./db/db.js', valueBet.id, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    }
  });

}


(async () => {
  const valueBets = await getValueBets()
  //updateDb(valueBets)
  console.log(valueBets.data);
})()