const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploadFile = async (files) => {
  const fileArray = Array.isArray(files) ? files : [files];
  const results = [];

  for (const file of fileArray) {
    try {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "hotel_rooms",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );

        stream.end(file.data);
      });

      results.push(result.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return results;
};
