import { URL } from "url";
import { validOrigin, validProtocol } from "./validUrlParams.js";

export default async function checkUrl(url, ctx) {
  try {
    const result = new URL(url);
    console.log(result);

    return validOrigin.includes(result.origin) &&
      validProtocol.includes(result.protocol)
      ? await ctx.reply(result.href)
      : await ctx.reply("Невалидный URL");
  } catch (err) {
    if (err.message === "Invalid URL") {
      url = url.split(" ").find((item) => item.startsWith("http:" || "https:"));

      if (!url) return await ctx.reply("Невалидный URL");

      const result = new URL(url);
      console.log(result);

      return validOrigin.includes(result.origin) &&
        validProtocol.includes(result.protocol)
        ? await ctx.reply(result.href)
        : await ctx.reply("Невалидный URL");
    }

    return await ctx.reply("Невалидный URL");
  }
}
