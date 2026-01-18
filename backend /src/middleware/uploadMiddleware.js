
const multer = require('multer');

// Simpan file di memory
const storage = multer.memoryStorage();

// Setup upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB
});

module.exports = upload;