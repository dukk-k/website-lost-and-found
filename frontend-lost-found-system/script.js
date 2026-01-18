
const API_URL = 'http://localhost:3000/api/items';
// Ambil elemen HTML
const form = document.getElementById('itemForm');
const list = document.getElementById('list');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const dropZone = document.getElementById('dropZone');


dropZone.addEventListener('click', () => {
    imageInput.click();
});

// Preview gambar
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.innerHTML = `<img src="${e.target.result}">`;
        };
        reader.readAsDataURL(file);
    }
});



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Siapkan data
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('status', document.getElementById('status').value);
    formData.append('contact', document.getElementById('contact').value);
    
    // Tambah gambar jika ada
    if (imageInput.files[0]) {
        formData.append('image', imageInput.files[0]);
    }

    // Kirim ke backend
    const res = await fetch(API_URL, {
        method: 'POST',
        body: formData
    });

    const result = await res.json();

    if (result.success) {
        alert('✅ Berhasil!');
        form.reset();
        imagePreview.innerHTML = '<p>Klik atau Seret Foto ke Sini</p>';
        loadItems();
    } else {
        alert('Gagal: ' + result.message);
    }
});



async function loadItems() {
    const status = document.getElementById('filterStatus').value;
    const location = document.getElementById('filterLocation').value;

    // Build URL
    let url = API_URL + '?';
    if (status) url += 'status=' + status + '&';
    if (location) url += 'location=' + location;

    // Ambil data
    const res = await fetch(url);
    const result = await res.json();

    // Kosongkan list
    list.innerHTML = '';

    // Jika tidak ada data
    if (result.data.length === 0) {
        list.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Belum ada data</p>';
        return;
    }

    // Tampilkan semua item
    result.data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item';
        
        card.innerHTML = `
            ${item.image 
                ? `<img src="${item.image}" class="item-img">` 
                : `<div class="item-img" style="display:flex; align-items:center; justify-content:center;">📦</div>`
            }
            <div class="item-content">
                <span class="badge ${item.status}">
                    ${item.status === 'hilang' ? '🔍 HILANG' : '✅ DITEMUKAN'}
                </span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="meta-info">
                    <p>📍 ${item.location}</p>
                    <p>📞 ${item.contact}</p>
                </div>
            </div>
        `;
        
        list.appendChild(card);
    });
}

// Load data saat pertama kali buka
loadItems();