// ===============================
// SCRIPT GLOBAL (FINAL VERSION)
// ===============================



// Also ensure the badge is set when DOM is ready
document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // DARK MODE (LIGHT / DARK TOGGLE)
    // ==================================================
    const body = document.body;
    // Select all toggle elements (support legacy id and future data attribute)
    const darkModeToggles = document.querySelectorAll("#darkModeToggle, [data-dark-toggle]");

    // Helper to update all toggle icons (re-query to support dynamic elements)
    function updateToggleIcons(icon) {
        const toggles = document.querySelectorAll("#darkModeToggle, [data-dark-toggle]");
        toggles.forEach(t => {
            try {
                t.innerHTML = icon;
                t.setAttribute('aria-pressed', icon === '💡' ? 'true' : 'false');
                t.setAttribute('title', icon === '💡' ? 'Switch to light mode' : 'Switch to dark mode');
            } catch (e) { /* ignore */ }
        });
    }

    // Aktifkan dark mode
    function enableDarkMode() {
        document.documentElement.classList.add("dark-mode");
        if (document.body) document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        updateToggleIcons("💡");
    }

    // Nonaktifkan dark mode
    function disableDarkMode() {
        // Remove dark-mode class from html, body and any element that has it (defensive)
        document.documentElement.classList.remove("dark-mode");
        if (document.body) document.body.classList.remove("dark-mode");
        try {
            document.querySelectorAll('.dark-mode').forEach(el => el.classList.remove('dark-mode'));
        } catch (e) { /* ignore */ }
        localStorage.setItem("darkMode", "disabled");
        updateToggleIcons("🌙");
    }

    // Cek preferensi saat halaman dimuat
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    } else {
        // Ensure icons and classes are set to light state on load
        disableDarkMode();
    }

    // Log initial state (no debug output in production)

    // Event klik toggle on all matching elements
    if (darkModeToggles.length) {
        darkModeToggles.forEach(t => {
            t.addEventListener("click", function () {
                if (body.classList.contains("dark-mode")) {
                    disableDarkMode();
                } else {
                    enableDarkMode();
                }
            });
        });
    }

    // Event delegation fallback: catch clicks on any existing or future toggle elements
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('#darkModeToggle, [data-dark-toggle]');
        if (!btn) return;
        if (body.classList.contains("dark-mode")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Global fallback function (also used by inline onclick="toggleDarkMode()")
    window.toggleDarkMode = function () {
        try {
            if (document.documentElement.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        } catch (e) { console.error('toggleDarkMode error', e); }
    };

    // Ensure aria-pressed and titles/icons are set correctly on load
    updateToggleIcons(document.documentElement.classList.contains('dark-mode') ? '💡' : '🌙');

    // ==================================================
    // SEARCH & FILTER ROOMS (OPTIONAL / AMAN)
    // ==================================================
    // Tidak akan error meskipun elemen tidak ada
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const roomItems = document.querySelectorAll(".room-item");

    // Filter berdasarkan kategori / lokasi (jika ada tombol filter)
    if (filterButtons.length > 0 && roomItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");

                const filter = this.getAttribute("data-filter");

                roomItems.forEach(room => {
                    const roomLocation = room.getAttribute("data-location");
                    if (filter === "all" || roomLocation === filter) {
                        room.style.display = "block";
                    } else {
                        room.style.display = "none";
                    }
                });
            });
        });
    }

    // Live search (nama & deskripsi) - fallback or AJAX-driven depending on page
    const roomsContainer = document.getElementById('rooms-container');

    // If there is a `#rooms-container`, switch to AJAX-based fetching (dynamic)
    if (roomsContainer) {
        const searchForm = document.getElementById('searchForm');
        const searchInputEl = document.getElementById('searchInput');
        let debounceTimer = null;

        function buildCardHtml(room) {
            const price = new Intl.NumberFormat('id-ID').format(room.price || 0);

            const amenities = room.amenities
                ? room.amenities.split(',').map(a => `
            <div class="col-6">
                <small class="text-muted">✔ ${escapeHtml(a.trim())}</small>
            </div>
        `).join('')
                : `<small class="text-muted">Belum ada fasilitas</small>`;

            return `
                <div class="col-12 col-sm-6 col-md-4 mb-4 room-item" data-location="all">
                    <div class="card room-card shadow-sm h-100">
                        <img src="${room.photo_url}" class="card-img-top room-img img-fluid"
                            alt="${escapeHtml(room.name)}">

                        <div class="card-body d-flex flex-column p-2">
                            <small class="fw-bold d-block room-name">
                                ${escapeHtml(room.name)}
                            </small>

                            <small class="text-muted d-block room-desc mb-1">
                                ${escapeHtml(room.description || '')}
                            </small>

                            <!-- FASILITAS -->
                            <div class="mb-1">
                                <small class="fw-bold">Fasilitas:</small>
                                <div class="row g-1">
                                    ${amenities}
                                </div>
                            </div>

                            <!-- KAPASITAS -->
                            <small class="text-muted mb-2">
                                👥 Kapasitas: ${room.guests || 0} tamu
                            </small>

                            <div class="mt-auto pt-2 d-flex justify-content-between align-items-center">
                                <p class="price mb-0">Rp ${price} / malam</p>

                                <div class="d-flex flex-column align-items-end">
                                    <div class="btn-group">
                                        <a href="/room/${room.id}" class="btn btn-outline-primary btn-sm">
                                            View
                                        </a>
                                        <a href="/cart/add/${room.id}" class="btn btn-success btn-sm ms-2">
                                            Book
                                        </a>
                                    </div>
                                    ${sessionUserButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        }


        // Small helper to render edit/delete for admin - server decides on visibility (we keep it simple)
        function sessionUserButtons() {
            // Visible only when server rendered edit/delete buttons are present - for AJAX fallback we omit admin buttons
            return '';
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function renderPagination(meta) {
            let html = '<ul class="pagination justify-content-center">';
            for (let p = 1; p <= meta.total_pages; p++) {
                const active = p === meta.page ? ' active' : '';
                html += `<li class="page-item ${active}"><a href="#" class="page-link" data-page="${p}">${p}</a></li>`;
            }
            html += '</ul>';
            return html;
        }

        async function fetchRooms(page = 1, search = '') {
            const loadingEl = document.getElementById('rooms-loading');
            try {
                if (loadingEl) loadingEl.style.display = 'block';

                const params = new URLSearchParams({
                    page: page,
                    per_page: 9
                });

                if (search) {
                    params.set('search', search);
                }

                const res = await fetch('/api/rooms?' + params.toString());
                if (!res.ok) throw new Error('Network response was not ok');

                const data = await res.json();

                // Render cards
                const cols = [];
                data.rooms.forEach(r => cols.push(buildCardHtml(r)));

                roomsContainer.innerHTML = cols.length
                    ? cols.join('\n')
                    : '<div class="col-12"><p class="text-center text-muted">Belum ada homestay yang tersedia.</p></div>';

                // Render pagination
                const nav = roomsContainer.parentElement.querySelector('nav');
                if (nav) {
                    nav.innerHTML = renderPagination({
                        total_pages: data.total_pages,
                        page: data.page
                    });
                }

            } catch (e) {
                console.error('Failed to fetch rooms', e);
            } finally {
                if (loadingEl) loadingEl.style.display = 'none';
            }
        }


        // Wire pagination clicks (event delegation)
        document.addEventListener('click', function (e) {
            const a = e.target.closest('a.page-link');
            if (a && a.dataset && a.dataset.page) {
                e.preventDefault();
                const p = parseInt(a.dataset.page, 10) || 1;
                const q = (document.getElementById('searchInput') || {}).value || '';
                fetchRooms(p, q);
            }
        });

        // Handle search submit
        if (searchForm) {
            searchForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const q = (document.getElementById('searchInput') || {}).value || '';
                fetchRooms(0, q);
            });
        }

        // Debounced input
        if (searchInputEl) {
            searchInputEl.addEventListener('input', function () {
                clearTimeout(debounceTimer);
                const q = this.value || '';
                debounceTimer = setTimeout(() => fetchRooms(0, q), 300);
            });
        }

        // Load initial state from querystring (or current input)
        const params = new URLSearchParams(window.location.search);
        const initialPage = parseInt(params.get('page')) || 1;
        const initialSearch = params.get('search') || (searchInputEl && searchInputEl.value) || '';
        fetchRooms(initialPage, initialSearch);



    } else if (searchInput && roomItems.length > 0) {
        // Existing client-side live search when page uses static room items
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase();

            roomItems.forEach(room => {
                const name = room.querySelector(".room-name")?.textContent.toLowerCase() || "";
                const desc = room.querySelector(".room-desc")?.textContent.toLowerCase() || "";

                if (name.includes(keyword) || desc.includes(keyword)) {
                    room.style.display = "block";
                } else {
                    room.style.display = "none";
                }
            });
        });
    } else {
        // Search not initialized (missing elements)
    }

});
