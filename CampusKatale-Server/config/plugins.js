// ./config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: env("UPLOAD_PROVIDER", "local"),
      providerOptions:
        env("UPLOAD_PROVIDER") === "cloudinary"
          ? {
              cloud_name: env("CLOUDINARY_NAME"),
              api_key: env("CLOUDINARY_KEY"),
              api_secret: env("CLOUDINARY_SECRET"),
            }
          : {
              sizeLimit: 10000000,
            },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
