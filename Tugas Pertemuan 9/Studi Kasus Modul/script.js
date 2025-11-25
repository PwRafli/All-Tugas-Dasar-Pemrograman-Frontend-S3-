$(document).ready(function () {
    let editIndex = null;

    // load database from localStorage
    function loadData() {
        let data = JSON.parse(localStorage.getItem("users")) || [];
        let list = "";

        data.forEach((item, index) => {
            list += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.alamat}</td>
                    <td>
                        <button class="action-btn edit-btn" data-index="${index}">Edit</button>
                        <button class="action-btn delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `;
        });

        $("#tableData").html(list);
    }

    // save database to localStorage
    function saveData(data) {
        localStorage.setItem("users", JSON.stringify(data));
    }

    // tambah data
    $("#addBtn").click(function () {
        let name = $("#name").val();
        let alamat = $("#alamat").val();

        if (name === "" || alamat === "") {
            alert("Nama dan alamat tidak boleh kosong");
            return;
        }

        let data = JSON.parse(localStorage.getItem("users")) || [];

        data.push({ name, alamat });
        saveData(data);
        loadData();

        $("#name").val("");
        $("#alamat").val("");
    });

    // hapus data
    $(document).on("click", ".delete-btn", function () {
        let index = $(this).data("index");

        let data = JSON.parse(localStorage.getItem("users")) || [];
        data.splice(index, 1);

        saveData(data);
        loadData();
    });

    // fill form ketika tombol edit diklik
    $(document).on("click", ".edit-btn", function () {
        editIndex = $(this).data("index");

        let data = JSON.parse(localStorage.getItem("users")) || [];
        let item = data[editIndex];

        $("#name").val(item.name);
        $("#alamat").val(item.alamat);

        $("#addBtn").hide();
        $("#updateBtn").show();
    });

    // update data
    $("#updateBtn").click(function () {
        let name = $("#name").val();
        let alamat = $("#alamat").val();

        let data = JSON.parse(localStorage.getItem("users")) || [];

        data[editIndex] = { name, alamat };
        saveData(data);

        $("#name").val("");
        $("#alamat").val("");

        $("#addBtn").show();
        $("#updateBtn").hide();

        loadData();
    });

    // load data saat halaman dibuka
    loadData();
});
