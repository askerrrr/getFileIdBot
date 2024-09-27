const { env } = require("./env");
const { Bot } = require("grammy");
const { getFileUrl } = require("./getFileUrl");
const { errorHandler } = require("./errorHandler");

const bot = new Bot(env.token);

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
