import axios from "axios";
import { MessageEmbed } from "discord.js";
import cheerio from "cheerio";
import cron from "cron";
import dotenv from "dotenv";

dotenv.config();

export default (newestPostContent, webhook) =>
  new cron.CronJob("*/1 * * * *", async () => {
    try {
      const response = await axios.get(process.env.MPM_URL);
      const $ = cheerio.load(response.data);

      const posts = $("div .mnt-Posts")[0];
      const firstPost = posts.childNodes[0];

      const article = $(firstPost).find(".mnt-article")[0];
      const paragraph = article.firstChild;

      const a = $(paragraph).find("a").toArray();
      let link = "";
      let linkText = "";
      if (a) {
        link = $(a).attr("href");
        linkText = $(a).text();
      }

      const pContent = $(paragraph).text();

      if (newestPostContent !== pContent) {
        newestPostContent = pContent;
        console.log(`${new Date()}: A new post!`);

        let embed = new MessageEmbed()
          .setColor("#80091d")
          .setThumbnail(process.env.MPM_LOGO)
          .addFields({
            name: "Obsah",
            value: pContent,
          })
          .setTimestamp(new Date());

        if (a) {
          embed.setTitle(linkText).setURL(link);
        }

        await webhook.send({ embeds: [embed] });
      } else {
        console.log(`${new Date()}: The same post!`);
      }
    } catch (error) {
      console.log(error);
    }
  });
