const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const upload = require('../middleware/uploadMiddleware');

// POST - Buat item baru
router.post('/', upload.single('image'), itemController.postItem);

// GET - Ambil semua items
router.get('/', itemController.getAllItems);

module.exports = router;
