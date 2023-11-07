const s3 = require('../../sdk');
require('dotenv').config();

const upload = async (path, buffer, mimetype) => {
  const file = await s3
    .upload({
      Bucket: process.env.BUCKET_NAME,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: file.Location,
    path: file.Key,
  };
};
module.exports = {
  upload,
};
