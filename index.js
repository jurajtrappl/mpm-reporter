import { Client, WebhookClient } from "discord.js";
import dotenv from "dotenv";
import job from "./job.js";

dotenv.config();

const discordClient = new Client({ intents: [] });
const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

let newestPostContent = "";

discordClient.on("error", ({ message }) => {
  console.error(`Discord client error: ${message}`);
});

discordClient.once("ready", async () => {
  job(newestPostContent, webhook).start();

  console.log(`${discordClient.user.username} is ready!`);
});

discordClient.login(process.env.TOKEN);
