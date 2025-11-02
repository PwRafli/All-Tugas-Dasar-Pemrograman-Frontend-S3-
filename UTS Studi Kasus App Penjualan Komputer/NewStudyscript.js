$(document).ready(function () {
    let daftarBarang = [];
    let kupon = null;
    let selectedCategory = '';
    let metode = '';

    const formatRupiah = angka => 'Rp ' + angka.toLocaleString('id-ID');

    // === POPUP KATEGORI ===
    $('#btnSelectKategori').click(() => $('#popupKategori').fadeIn(200));
    $('#closePopupKategori').click(() => $('#popupKategori').fadeOut(200));
    $('#popupKategori').click(e => { if (e.target.id === 'popupKategori') $('#popupKategori').fadeOut(200); });

    $('.category-card').click(function () {
        $('.category-card').removeClass('selected');
        $(this).addClass('selected');
        selectedCategory = $(this).data('category');
    });

    $('#confirmKategori').click(() => {
        if (selectedCategory) {
            $('#kategori').val(selectedCategory);
            $('#popupKategori').fadeOut(200);
        } else alert('Silakan pilih kategori terlebih dahulu!');
    });

    // === TAMBAH BARANG ===
    $('#btnAdd').click(function () {
        const kategori = $('#kategori').val();
        const nama = $('#namaBarang').val();
        const harga = parseFloat($('#harga').val()) || 0;
        const jumlah = parseInt($('#jumlah').val()) || 0;

        if (!kategori || !nama || harga <= 0 || jumlah <= 0) {
            alert('Harap isi semua data dengan benar!');
            return;
        }

        let diskon = 0;
        if (kategori === 'PC / LAPTOP' && jumlah >= 2) diskon = 10;
        else if (kategori === 'AKSESORIS' && jumlah >= 5) diskon = 5;

        const subtotal = harga * jumlah;
        const nilaiDiskon = subtotal * (diskon / 100);
        const total = subtotal - nilaiDiskon;

        daftarBarang.push({ kategori, nama, harga, jumlah, diskon, subtotal, total });
        renderTable();
        hitungTotalKeseluruhan();
        $('#salesForm')[0].reset();
    });

    const renderTable = () => {
        const tbody = $('#tabelBarang tbody');
        tbody.empty();
        daftarBarang.forEach((item, i) => {
            tbody.append(`
        <tr>
          <td>${i + 1}</td>
          <td>${item.kategori}</td>
          <td>${item.nama}</td>
          <td>${item.jumlah}</td>
          <td>${formatRupiah(item.harga)}</td>
          <td>${item.diskon}%</td>
          <td>${formatRupiah(item.subtotal)}</td>
          <td>${formatRupiah(item.total)}</td>
          <td><button class="btn btn-sm btn-danger btnHapus" data-index="${i}">Hapus</button></td>
        </tr>`);
        });
    };

    $(document).on('click', '.btnHapus', function () {
        daftarBarang.splice($(this).data('index'), 1);
        renderTable();
        hitungTotalKeseluruhan();
    });

    const hitungTotalKeseluruhan = () => {
        let totalBelanja = daftarBarang.reduce((sum, item) => sum + item.total, 0);
        let diskonTambahan = 0;

        if (totalBelanja >= 20000000) diskonTambahan = totalBelanja * 0.1;
        else if (totalBelanja >= 10000000) diskonTambahan = totalBelanja * 0.05;
        if (kupon === 'PROMO10') diskonTambahan += totalBelanja * 0.1;
        if (kupon === 'VIP20') diskonTambahan += totalBelanja * 0.2;

        const setelahDiskon = totalBelanja - diskonTambahan;
        const pajak = setelahDiskon * 0.11;
        const totalAkhir = setelahDiskon + pajak;
        const gratisOngkir = totalAkhir > 5000000 || kupon === 'FREESHIP';

        $('#totalBelanja').text('Total Belanja: ' + formatRupiah(totalBelanja));
        $('#diskonTambahan').text('Diskon Tambahan: ' + formatRupiah(diskonTambahan));
        $('#pajak').text('Pajak (11%): ' + formatRupiah(pajak));
        $('#totalAkhir').html('<strong>Total Akhir: ' + formatRupiah(totalAkhir) + '</strong>');
        $('#ongkirInfo').html(gratisOngkir ? `<p class="text-success"><i class="fas fa-truck"></i> Gratis Ongkir!</p>` : '');
    };

    // === KUPON ===
    $('#btnApplyKupon').click(() => {
        const kode = $('#kodeKupon').val().trim().toUpperCase();
        if (['PROMO10', 'FREESHIP', 'VIP20'].includes(kode)) {
            kupon = kode;
            $('#kuponInfo').text(`Kode ${kode} berhasil diterapkan!`);
        } else {
            kupon = null;
            $('#kuponInfo').text('Kode kupon tidak valid.');
        }
        hitungTotalKeseluruhan();
    });

    // === POPUP PEMBAYARAN ===
    $('#btnMetodePembayaran').click(() => $('#popupPembayaran').fadeIn(200));
    $('#closePopupPembayaran').click(() => $('#popupPembayaran').fadeOut(200));
    $('#popupPembayaran').click(e => { if (e.target.id === 'popupPembayaran') $('#popupPembayaran').fadeOut(200); });

    $('.payment-card').click(function () {
        $('.payment-card').removeClass('selected');
        $(this).addClass('selected');
        metode = $(this).data('method');
    });

    $('#confirmPembayaran').click(() => {
        if (!metode) return alert('Pilih metode pembayaran terlebih dahulu!');
        $('#popupPembayaran').fadeOut(200);
        tampilkanMetodePembayaran();
    });

    function tampilkanMetodePembayaran() {
        const container = $('#hasilPembayaran');
        container.empty();

        if (metode === 'CASH') {
            container.html(`
        <div class="cash-box">
          <h5><i class="fas fa-money-bill-wave"></i> Pembayaran Tunai</h5>
          <label>Jumlah Uang Dibayar:</label>
          <input type="number" id="uangDibayar" class="form-control" placeholder="Masukkan nominal">
          <p id="kembalian" class="mt-2"></p>
          <button class="btn btn-success mt-2" id="hitungKembalian">Hitung Kembalian</button>
        </div>
      `);

            $('#hitungKembalian').click(() => {
                const total = parseFloat($('#totalAkhir').text().replace(/\D/g, '')) || 0;
                const bayar = parseFloat($('#uangDibayar').val()) || 0;
                const kembali = bayar - total;
                if (kembali < 0) {
                    $('#kembalian').text('Uang tidak cukup!').css('color', 'red');
                } else {
                    $('#kembalian').text('Kembalian: Rp ' + kembali.toLocaleString('id-ID')).css('color', 'green');
                }
            });

        } else if (metode === 'BARCODE') {
            container.html(`
        <div class="barcode-box text-center">
          <h5><i class="fas fa-qrcode"></i> Pembayaran QR Code</h5>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SimulasiPembayaranOnline" alt="QR Code Pembayaran">
          <p class="mt-2">Scan kode ini untuk menyelesaikan transaksi.</p>
        </div>
      `);
        }
    }

    // === RESET ===
    $('#btnReset').click(() => {
        daftarBarang = [];
        kupon = null;
        selectedCategory = '';
        metode = '';
        $('#salesForm')[0].reset();
        $('#kodeKupon').val('');
        $('#kuponInfo').text('');
        $('#hasilPembayaran').empty();
        renderTable();
        hitungTotalKeseluruhan();
    });
});