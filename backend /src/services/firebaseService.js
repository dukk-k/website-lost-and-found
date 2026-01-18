
const { db } = require('../config/firebase');

// Buat item baru
async function createItem(data) {
    const docRef = await db.collection('items').add({
        ...data,
        createdAt: new Date()
    });

    return { id: docRef.id, ...data };
}

// Ambil semua items
async function getItems(filters) {
    let query = db.collection('items');

    // Filter by status
    if (filters.status) {
        query = query.where('status', '==', filters.status);
    }

    // Filter by location
    if (filters.location) {
        query = query.where('location', '>=', filters.location)
                     .where('location', '<=', filters.location + '\uf8ff');
    }

    // Urutkan dari terbaru
    query = query.orderBy('createdAt', 'desc');

    const snapshot = await query.get();
    
    const items = [];
    snapshot.forEach(doc => {
        items.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return items;
}

module.exports = {
    createItem,
    getItems
};