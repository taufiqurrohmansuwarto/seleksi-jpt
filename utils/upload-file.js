const uploadFileMinio = (mc, fileBuffer, filename, size) => {
  return new Promise((resolve, reject) => {
    mc.putObject(
      "documents-seleksi-jpt",
      `files/${filename}`,
      fileBuffer,
      size,
      function (err, info) {
        if (err) {
          reject(err);
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
