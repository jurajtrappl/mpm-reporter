import { WebhookClient } from "discord.js";
import dotenv from "dotenv";
import job from "./job.js";

dotenv.config();

const webhook = new WebhookClient({ url: process.env.WEBHOOK_URL });

let newestPostContent = "";
job(newestPostContent, webhook).start();