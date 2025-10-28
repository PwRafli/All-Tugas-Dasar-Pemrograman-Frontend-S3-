// Ambil elemen
const openPopup = document.getElementById('openPopup');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const dataForm = document.getElementById('dataForm');

// Buka popup saat tombol diklik
openPopup.addEventListener('click', () => {
    popup.style.display = 'block';
});

// Tutup popup saat tombol close diklik
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Tutup popup saat klik di luar konten
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// Handle submit form
dataForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload halaman
    
    // Ambil data dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Tampilkan alert sederhana (bisa diganti dengan logika lain, seperti kirim ke server)
    alert(`Data diterima:\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`);
    
    // Tutup popup setelah submit
    popup.style.display = 'none';
    
    // Reset form
    dataForm.reset();
});