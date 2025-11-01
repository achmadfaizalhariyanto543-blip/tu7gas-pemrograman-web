// 1. Data Produk
const produkData = [
    { id: 101, nama: "Knalpot Racing Premium", harga: 850000, deskripsi: "Meningkatkan performa dan suara yang gahar. Tersedia untuk semua jenis motor matic." },
    { id: 102, nama: "Ban Tubeless Sport (Sepasang)", harga: 620000, deskripsi: "Daya cengkeram tinggi, cocok untuk harian dan touring." },
    { id: 103, nama: "Shockbreaker Belakang Adjustable", harga: 480000, deskripsi: "Meningkatkan kenyamanan berkendara, bisa diatur tingkat kekerasannya." },
    { id: 104, nama: "Lampu LED Projie Motor", harga: 210000, deskripsi: "Pencahayaan sangat terang dan hemat daya. Tampilan modern." },
    { id: 105, nama: "Handle Rem CNC Lipat", harga: 155000, deskripsi: "Variasi handle rem aluminium CNC, anti patah saat jatuh." }
];

// 2. Variabel Global
let keranjang = [];
let daftarProdukEl, daftarKeranjangEl, totalHargaEl, jumlahItemKeranjangEl, btnCheckout, btnHapusKeranjang;

// 3. Fungsi Render Produk
function renderProduk() {
    daftarProdukEl.innerHTML = '';
    produkData.forEach(produk => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        col.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${produk.nama}</h5>
                    <p class="card-text">${produk.deskripsi}</p>
                    <p class="card-text"><strong>Rp${produk.harga.toLocaleString('id-ID')}</strong></p>
                    <button class="btn btn-primary" data-id="${produk.id}">Tambah ke Keranjang</button>
                </div>
            </div>
        `;
        // Event tombol
        col.querySelector('button').addEventListener('click', tambahKeKeranjang);
        daftarProdukEl.appendChild(col);
    });
}

// 4. Fungsi Tambah ke Keranjang
function tambahKeKeranjang(event) {
    const idProduk = parseInt(event.target.getAttribute('data-id'));
    const produk = produkData.find(p => p.id === idProduk);
    const itemKeranjang = keranjang.find(item => item.id === idProduk);
    if (itemKeranjang) {
        itemKeranjang.jumlah += 1;
    } else {
        keranjang.push({ ...produk, jumlah: 1 });
    }
    renderKeranjang();
}

// 5. Fungsi Render Keranjang dan Hitung Total
function renderKeranjang() {
    daftarKeranjangEl.innerHTML = '';
    let total = 0;
    keranjang.forEach(item => {
        total += item.harga * item.jumlah;
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                ${item.nama} x ${item.jumlah}
            </span>
            <span>
                Rp${(item.harga * item.jumlah).toLocaleString('id-ID')}
                <button class="btn btn-sm btn-outline-danger ms-2" data-id="${item.id}">Hapus</button>
            </span>
        `;
        li.querySelector('button').addEventListener('click', function() {
            hapusItemKeranjang(item.id);
        });
        daftarKeranjangEl.appendChild(li);
    });
    totalHargaEl.textContent = 'Rp' + total.toLocaleString('id-ID');
    jumlahItemKeranjangEl.textContent = keranjang.reduce((sum, item) => sum + item.jumlah, 0);
}

// 5a. Hapus item individual
function hapusItemKeranjang(idProduk) {
    keranjang = keranjang.filter(item => item.id !== idProduk);
    renderKeranjang();
}

// 6. Fungsi Checkout
function checkout() {
    if (keranjang.length === 0) {
        alert('Keranjang kosong!');
        return;
    }
    alert('Pesanan berhasil! Terima kasih telah berbelanja.');
    keranjang = [];
    renderKeranjang();
}

// 7. Fungsi Hapus Keranjang
function hapusKeranjang() {
    keranjang = [];
    renderKeranjang();
}

// 8. Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan elemen DOM
    daftarProdukEl = document.getElementById('daftar-produk');
    daftarKeranjangEl = document.getElementById('daftar-keranjang');
    totalHargaEl = document.getElementById('total-harga');
    jumlahItemKeranjangEl = document.getElementById('jumlah-item-keranjang');
    btnCheckout = document.getElementById('btn-checkout');
    btnHapusKeranjang = document.getElementById('btn-hapus-keranjang');

    // Menjalankan fungsi awal
    renderProduk();
    renderKeranjang();

    // Menambahkan event listeners untuk tombol utama
    btnCheckout.addEventListener('click', checkout);
    btnHapusKeranjang.addEventListener('click', hapusKeranjang);
});
