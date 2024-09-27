import env from "./env.js";

async function getFileUrl(ctx, file) {
  try {
    const fileLink = await ctx.api.getFile(file);
    const filePath = fileLink.file_path;
    const fileURL = `https://api.telegram.org/file/bot${env.token}/${filePath}`;
    return fileURL;
  } catch (err) {
    console.log(err);
  }
}

export default getFileUrl;
