$(document).ready(function () {
    // Variabel untuk menyimpan kategori yang dipilih
    let selectedCategory = '';

    // Event listener untuk tombol Select Option
    $('#btnSelectKategori').click(function () {
        $('#popupKategori').css('display', 'flex');
    });

    // Event listener untuk tombol close popup
    $('#closePopupKategori').click(function () {
        $('#popupKategori').hide();
    });

    // Event listener untuk klik pada overlay popup
    $('#popupKategori').click(function (e) {
        if (e.target === this) {
            $(this).hide();
        }
    });

    // Event listener untuk pemilihan kategori
    $('.category-card').click(function () {
        // Menggunakan jQuery selector untuk menghapus class 'selected' dari semua card
        $('.category-card').removeClass('selected');
        // Menambahkan class 'selected' ke card yang diklik
        $(this).addClass('selected');
        // Menyimpan nilai kategori yang dipilih
        selectedCategory = $(this).data('category');
    });

    // Event listener untuk tombol konfirmasi pemilihan kategori
    $('#confirmKategori').click(function () {
        if (selectedCategory) {
            // Menggunakan jQuery selector untuk mengatur nilai input kategori
            $('#kategori').val(selectedCategory);
            // Menutup popup
            $('#popupKategori').hide();
            // Memperbarui informasi produk
            updateProductInfo(selectedCategory);
        } else {
            alert('Silakan pilih kategori terlebih dahulu!');
        }
    });

    // Fungsi untuk memperbarui informasi produk
    function updateProductInfo(category) {
        let infoHTML = '';

        switch (category) {
            case 'PC / LAPTOP':
                infoHTML = `
                    <h5>PC / LAPTOP</h5>
                    <p>Komputer personal dan laptop untuk berbagai kebutuhan:</p>
                    <ul>
                        <li>Desktop PC (Gaming, Office, Workstation)</li>
                        <li>Laptop (Ultrabook, Gaming, Business)</li>
                        <li>Garansi resmi 1-3 tahun</li>
                        <li>Gratis instalasi software dasar</li>
                    </ul>
                `;
                break;
            case 'AKSESORIS':
                infoHTML = `
                    <h5>AKSESORIS</h5>
                    <p>Berbagai aksesoris komputer:</p>
                    <ul>
                        <li>Keyboard, Mouse, Headset</li>
                        <li>Flashdisk, Harddisk Eksternal</li>
                        <li>Webcam, Microphone</li>
                        <li>Cooling Pad, Docking Station</li>
                    </ul>
                `;
                break;
            case 'MONITOR':
                infoHTML = `
                    <h5>MONITOR</h5>
                    <p>Berbagai jenis monitor:</p>
                    <ul>
                        <li>Monitor Gaming (144Hz, 240Hz)</li>
                        <li>Monitor Office (IPS, 4K)</li>
                        <li>Monitor Portable</li>
                        <li>Ultrawide Monitor</li>
                    </ul>
                `;
                break;
            case 'PRINTER':
                infoHTML = `
                    <h5>PRINTER</h5>
                    <p>Solusi pencetakan untuk rumah dan kantor:</p>
                    <ul>
                        <li>Printer Inkjet</li>
                        <li>Printer Laser</li>
                        <li>Printer All-in-One</li>
                        <li>Scanner & Fotocopy</li>
                    </ul>
                `;
                break;
            case 'NETWORKING':
                infoHTML = `
                    <h5>NETWORKING</h5>
                    <p>Peralatan jaringan komputer:</p>
                    <ul>
                        <li>Router, Switch, Access Point</li>
                        <li>Kabel LAN, Kabel Fiber Optic</li>
                        <li>Repeater, Range Extender</li>
                        <li>Network Adapter</li>
                    </ul>
                `;
                break;
            case 'SOFTWARE':
                infoHTML = `
                    <h5>SOFTWARE</h5>
                    <p>Berbagai software original:</p>
                    <ul>
                        <li>Sistem Operasi (Windows, Linux)</li>
                        <li>Software Office</li>
                        <li>Antivirus & Security</li>
                        <li>Software Desain & Editing</li>
                    </ul>
                `;
                break;
        }

        // Menggunakan jQuery selector untuk memperbarui konten
        $('#productInfo').html(infoHTML);
    }

    // Event listener untuk tombol Hitung Total
    $('#btnCalculate').click(function () {
        // Menggunakan jQuery selector untuk mengambil nilai dari form
        const kategori = $('#kategori').val();
        const namaBarang = $('#namaBarang').val();
        const harga = parseFloat($('#harga').val()) || 0;
        const jumlah = parseInt($('#jumlah').val()) || 0;
        let diskon = parseFloat($('#diskon').val()) || 0;

        // Validasi input
        if (!kategori || !namaBarang || harga <= 0 || jumlah <= 0) {
            alert('Mohon lengkapi semua field dengan benar!');
            return;
        }

        // Menghitung subtotal
        const subtotal = harga * jumlah;

        // Menghitung diskon otomatis berdasarkan ketentuan
        if (kategori === 'PC / LAPTOP' && jumlah >= 2) {
            diskon = Math.max(diskon, 10);
        } else if (kategori === 'AKSESORIS' && jumlah >= 5) {
            diskon = Math.max(diskon, 5);
        }

        // Menghitung nilai diskon
        const nilaiDiskon = subtotal * (diskon / 100);

        // Menghitung setelah diskon
        const setelahDiskon = subtotal - nilaiDiskon;

        // Menghitung pajak (11%)
        const pajak = setelahDiskon * 0.11;

        // Menghitung total
        const total = setelahDiskon + pajak;

        // Memperbarui nilai diskon di form
        $('#diskon').val(diskon);

        // Menampilkan hasil perhitungan
        $('#resultNamaBarang').text(namaBarang);
        $('#resultHarga').text(formatRupiah(harga));
        $('#resultJumlah').text(jumlah);
        $('#resultSubtotal').text(formatRupiah(subtotal));
        $('#resultDiskon').text(formatRupiah(nilaiDiskon) + ` (${diskon}%)`);
        $('#resultPajak').text(formatRupiah(pajak));
        $('#resultTotal').text(formatRupiah(total));

        // Menampilkan bagian hasil
        $('#resultSection').slideDown();

        // Cek gratis ongkir
        if (total > 5000000) {
            $('#resultTotal').append('<br><small class="text-success"><i class="fas fa-truck"></i> Gratis Ongkir</small>');
        }
    });

    // Event listener untuk tombol Reset
    $('#btnReset').click(function () {
        // Menggunakan jQuery selector untuk mereset form
        $('#salesForm')[0].reset();
        $('#resultSection').hide();
        $('#productInfo').html('<p class="text-muted">Pilih kategori produk untuk melihat informasi</p>');
        selectedCategory = '';
    });

    // Fungsi untuk format rupiah
    function formatRupiah(angka) {
        return 'Rp ' + angka.toLocaleString('id-ID');
    }
});