document.addEventListener('DOMContentLoaded', function () {
    const motorBrand = document.getElementById('motorBrand');
    const accessories = document.querySelectorAll('input[type="checkbox"]');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const hargaInput = document.getElementById('harga');
    const bungaDiskonInput = document.getElementById('bungaDiskon');
    const totalInput = document.getElementById('total');
    const prosesBtn = document.getElementById('prosesBtn');
    const resetBtn = document.getElementById('resetBtn');

    function calculateTotal() {
        let motorPrice = 0;
        let accessoriesPrice = 0;
        let totalPrice = 0;
        let discountOrInterest = 0;

        // Harga motor
        if (motorBrand.value) {
            motorPrice = parseInt(motorBrand.options[motorBrand.selectedIndex].getAttribute('data-price'));
        }

        // Harga aksesoris
        accessories.forEach(accessory => {
            if (accessory.checked) {
                accessoriesPrice += parseInt(accessory.getAttribute('data-price'));
            }
        });

        const basePrice = motorPrice + accessoriesPrice;

        // Diskon atau bunga
        paymentMethods.forEach(method => {
            if (method.checked) {
                if (method.value === 'tunai') {
                    discountOrInterest = -Math.round(basePrice * 0.1); // Diskon 10%
                } else if (method.value === 'kredit') {
                    discountOrInterest = Math.round(basePrice * 0.15); // Bunga 15%
                }
            }
        });

        totalPrice = basePrice + discountOrInterest;

        hargaInput.value = formatCurrency(basePrice);

        if (discountOrInterest !== 0) {
            const label = discountOrInterest < 0 ? 'Diskon' : 'Bunga';
            bungaDiskonInput.value = `${label}: ${formatCurrency(Math.abs(discountOrInterest))}`;
        } else {
            bungaDiskonInput.value = '-';
        }

        totalInput.value = formatCurrency(totalPrice);
    }

    function formatCurrency(amount) {
        return 'Rp ' + amount.toLocaleString('id-ID');
    }

    motorBrand.addEventListener('change', calculateTotal);
    accessories.forEach(accessory => {
        accessory.addEventListener('change', calculateTotal);
    });
    paymentMethods.forEach(method => {
        method.addEventListener('change', calculateTotal);
    });

    prosesBtn.addEventListener('click', function () {
        if (!motorBrand.value) {
            alert('Silakan pilih merk motor terlebih dahulu!');
            return;
        }

        if (!document.querySelector('input[name="paymentMethod"]:checked')) {
            alert('Silakan pilih metode pembayaran!');
            return;
        }

        const motorName = motorBrand.options[motorBrand.selectedIndex].text.split(' - ')[0];
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value === 'tunai' ? 'Tunai' : 'Kredit';

        let selectedAccessories = [];
        accessories.forEach(accessory => {
            if (accessory.checked) {
                selectedAccessories.push(accessory.nextElementSibling.textContent.split(' - ')[0]);
            }
        });

        let accessoriesText = selectedAccessories.length > 0 ? ` dengan aksesoris: ${selectedAccessories.join(', ')}` : '';

        alert(`Terima kasih telah melakukan pembelian motor ${motorName}${accessoriesText} dengan metode pembayaran ${paymentMethod}.\n\nTotal pembayaran: ${totalInput.value}`);
    });

    resetBtn.addEventListener('click', function () {
        document.getElementById('motorForm').reset();
        hargaInput.value = '';
        bungaDiskonInput.value = '';
        totalInput.value = '';
    });
});
