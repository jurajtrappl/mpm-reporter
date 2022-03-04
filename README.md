# News page reporter
News web scraper that sends new posts using Discord webhooks to a Discord server.

## Program flow
* [News page] is being checked every minute using custom [Cron] job.
* When a new post appears
  * data are scraped from the webpage using [cheerio-js]
  * sent as Discord embed using Discord webhook to a server

## dotenv variables
1. WEBHOOK_URL - URL of the server's webhook integration
2. MPM_URL and MPM_LOGO are two environment variables representing the news page URL and the embed's thumbnail logo

[News page]: https://dennikn.sk/minuta/tema/6826/konflikt-na-ukrajine
[Cron]: https://www.npmjs.com/package/cron
[cheerio-js]: https://cheerio.js.org/
