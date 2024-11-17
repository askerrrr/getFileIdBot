import env from "./env.js";
import { Bot } from "grammy";
import getFileUrl from "./getFileUrl.js";
import errorHandler from "./errorHandler.js";
import checkUrl from "./checkUrl.js";

const bot = new Bot(env.token);

bot.on("message", async (ctx) => {
  const url = ctx.message.text;

  await checkUrl(url, ctx);
});

bot.on("message:photo", async (ctx) => {
  const photos = ctx.message.photo;
  const fileId = photos[photos.length - 1].file_id;
  const fileURL = await getFileUrl(ctx, fileId);

  await ctx.reply(`FileID:${fileId}`);
  await ctx.reply(`${fileURL}`);
});

bot.on("message:document", async (ctx) => {
  const fileId = ctx.message.document.file_id;
  const fileURL = await getFileUrl(ctx, fileId);
  await ctx.reply(`FileID:${fileId}`);
  await ctx.reply(`${fileURL}`);
});

bot.catch(errorHandler);

bot.start();
