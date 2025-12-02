$(function () {
    // Inisialisasi Slider Filter Harga
    $("#priceSlider").slider({
        range: true,
        min: 50000,
        max: 500000,
        values: [50000, 300000],
        slide: function (event, ui) {
            $("#priceLabel").text("Rp " + ui.values[0].toLocaleString() + " - Rp " + ui.values[1].toLocaleString());
            filterProducts(ui.values[0], ui.values[1]);
        }
    });

    // Nilai Awal Price Label
    $("#priceLabel").text("Rp 50.000 - Rp 300.000");

    // Fungsi Filter Produk
    function filterProducts(min, max) {
        $(".product-card").each(function () {
            let price = parseInt($(this).data("price"));
            if (price >= min && price <= max) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Inisialisasi Cart Dialog
    $("#cartDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 400
    });

    $("#openCart").click(function () {
        $("#cartDialog").dialog("open");
    });

    let cart = [];

    // Tombol 'Tambah ke Keranjang'
    $(".addToCart").click(function () {
        let name = $(this).siblings("h4").text();
        let price = parseInt($(this).parent().data("price"));

        cart.push({ name: name, price: price });
        updateCart();

        $("#cartDialog").dialog("open");
    });

    // Update Keranjang Belanja
    function updateCart() {
        $("#cartItems").empty();
        let total = 0;

        cart.forEach(item => {
            $("#cartItems").append(`<li>${item.name} - Rp ${item.price.toLocaleString()}</li>`);
            total += item.price;
        });

        $("#cartTotal").text(total.toLocaleString());
    }

    // Terapkan filter awal saat halaman dimuat
    filterProducts(50000, 300000);
});