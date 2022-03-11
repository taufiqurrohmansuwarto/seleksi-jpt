const uploadFileMinio = (mc, fileBuffer, filename, size, mimetype) => {
  return new Promise((resolve, reject) => {
    mc.putObject(
      "document-seleksi-jpt",
      `files/${filename}`,
      fileBuffer,
      size,
      { "Content-Type": mimetype },
      function (err, info) {
        if (err) {
          reject(err);
          console.log(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports = {
  uploadFileMinio,
};
