const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmzltcsku",
  api_key: "346588267111398",
  api_secret: "oV7nDMjWQjCY3_PZzkKkYyEdo6E",
});

module.exports = cloudinary;