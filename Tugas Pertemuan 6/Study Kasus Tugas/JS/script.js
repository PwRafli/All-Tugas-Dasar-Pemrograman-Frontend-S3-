document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const calculateBtn = document.getElementById('calculateBtn');
    const resultBox = document.getElementById('resultBox');
    const totalBiayaElement = document.getElementById('totalBiaya');
    const shippingForm = document.getElementById('shippingForm');

    // Weight cost mapping
    const weightCosts = [
        { min: 0, max: 1, cost: 10000 },
        { min: 1, max: 2, cost: 15000 },
        { min: 2, max: 3, cost: 20000 },
        { min: 3, max: 4, cost: 25000 },
        { min: 4, max: 5, cost: 30000 },
        { min: 5, max: Infinity, cost: 35000 }
    ];

    // Distance cost mapping
    const distanceCosts = {
        'banyuwangi': 1500,
        'jember': 2500,
        'probolinggo': 3500,
        'lumajang': 2000,
        'situbondo': 1800,
        'bondowoso': 2200
    };

    // City names in Indonesian for display
    const cityNames = {
        'banyuwangi': 'Banyuwangi',
        'jember': 'Jember',
        'probolinggo': 'Probolinggo',
        'lumajang': 'Lumajang',
        'situbondo': 'Situbondo',
        'bondowoso': 'Bondowoso'
    };

    // Calculate shipping cost
    function calculateShippingCost() {
        const beratBarang = parseFloat(document.getElementById('beratBarang').value);
        const kotaAsal = document.getElementById('kotaAsal').value;
        const kotaTujuan = document.getElementById('kotaTujuan').value;

        // Validation
        if (isNaN(beratBarang) || beratBarang <= 0) {
            showNotification('Silakan masukkan berat barang yang valid', 'error');
            return;
        }

        if (!kotaAsal || !kotaTujuan) {
            showNotification('Silakan pilih kota asal dan kota tujuan', 'error');
            return;
        }

        if (kotaAsal === kotaTujuan) {
            showNotification('Kota asal dan kota tujuan tidak boleh sama', 'error');
            return;
        }

        // Calculate weight cost
        let weightCost = 0;
        for (const range of weightCosts) {
            if (beratBarang > range.min && beratBarang <= range.max) {
                weightCost = range.cost;
                break;
            }
        }

        // Calculate distance cost
        const distanceCost = distanceCosts[kotaTujuan];

        // Calculate total cost
        const totalCost = weightCost + distanceCost;

        // Display result with animation
        totalBiayaElement.textContent = `Rp ${totalCost.toLocaleString('id-ID')}`;
        resultBox.style.display = 'block';
        resultBox.classList.add('show');

        // Log calculation details (for debugging)
        console.log('Perhitungan Biaya Pengiriman:');
        console.log(`Berat: ${beratBarang} kg`);
        console.log(`Dari: ${cityNames[kotaAsal]}`);
        console.log(`Ke: ${cityNames[kotaTujuan]}`);
        console.log(`Biaya Berat: Rp ${weightCost.toLocaleString('id-ID')}`);
        console.log(`Biaya Jarak: Rp ${distanceCost.toLocaleString('id-ID')}`);
        console.log(`Total: Rp ${totalCost.toLocaleString('id-ID')}`);
    }

    // Show notification (instead of alert)
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed`;
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '1050';
        notification.style.minWidth = '300px';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add event listener to calculate button
    calculateBtn.addEventListener('click', calculateShippingCost);

    // Add event listener for Enter key on form inputs
    const inputs = shippingForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateShippingCost();
            }
        });
    });

    // Add hover effect to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s';
        });

        row.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Initialize tooltips if needed
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});