
const imageService = require('../services/imageService');
const firebaseService = require('../services/firebaseService');

// POST - Buat item baru
async function postItem(req, res) {
    const { title, description, location, status, contact } = req.body;

    // Upload gambar jika ada
    let imageUrl = null;
    if (req.file) {
        imageUrl = await imageService.uploadImage(req.file.buffer);
    }

    // Simpan ke database
    const data = {
        title,
        description,
        location,
        status,
        contact,
        image: imageUrl
    };

    const newItem = await firebaseService.createItem(data);

    res.json({
        success: true,
        data: newItem
    });
}

// GET - Ambil semua items
async function getAllItems(req, res) {
    const { status, location } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (location) filters.location = location;

    const items = await firebaseService.getItems(filters);

    res.json({
        success: true,
        data: items
    });
}

module.exports = {
    postItem,
    getAllItems
};