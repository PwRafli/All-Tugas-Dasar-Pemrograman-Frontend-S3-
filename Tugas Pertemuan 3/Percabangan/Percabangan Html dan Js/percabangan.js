function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

function percabanganIf() {
    clearOutput();
    var totalBelanja = prompt("Total belanja?", 0);
    var output = "";

    if(totalBelanja > 100000){
        output += "<h2>Selamat Anda dapat hadiah</h2>";
    }

    output += "<p>Terimakasih sudah berbelanja di toko kami</p>";
    document.getElementById("output").innerHTML = output;
}

function percabanganIfElse() {
    clearOutput();
    var password = prompt("Password:");
    var output = "";

    if(password == "kopi"){
        output += "<h2>Selamat datang bos!</h2>";
    } else {
        output += "<p>Password salah, coba lagi</p>";
    }

    output += "<p>Terima kasih sudah menggunakan aplikasi ini!</p>";
    document.getElementById("output").innerHTML = output;
}

function percabanganIfElseIf() {
    clearOutput();
    var nilai = prompt("Inputkan nilai akhir:");
    var grade = "";

    if(nilai >= 90) grade = "A";
    else if(nilai >= 80) grade = "B+";
    else if(nilai >= 70) grade = "B";
    else if(nilai >= 60) grade = "C+";
    else if(nilai >= 50) grade = "C";
    else if(nilai >= 40) grade = "D";
    else if(nilai >= 30) grade = "E";
    else grade = "F";

    document.getElementById("output").innerHTML = `<p>Grade anda: ${grade}</p>`;
}

function percabanganSwitchCase() {
    clearOutput();
    var jawab = prompt("Kamu beruntung! Silahkan pilih hadiamu dengan memasukan angka 1 sampai 5");
    var hadiah = "";
    var output = "";

    switch(jawab){
        case "1":
            hadiah = "Tisu";
            break;
        case "2":
            hadiah = "1 Kotak Kopi";
            break;
        case "3":
            hadiah = "Sticker";
            break;
        case "4":
            hadiah = "Minyak Goreng";
            break;
        case "5":
            hadiah = "Uang Rp 50.000";
            break;
        default:
            output += "<p>Opps! anda salah pilih</p>";
    }

    if(hadiah == ""){
        output += "<p>Kamu gagal mendapat hadiah</p>";
    } else {
        output += "<h2>Selamat kamu mendapatkan " + hadiah + "</h2>";
    }

    document.getElementById("output").innerHTML = output;
}

function percabanganTernary() {
    clearOutput();
    var jwb = prompt("Apakah Jakarta ibu kota indonesia?");
    var jawaban = (jwb.toUpperCase() == "IYA") ? "Benar" : "Salah";

    document.getElementById("output").innerHTML = `Jawaban anda: <b>${jawaban}</b>`;
}

function percabanganBersarang() {
    clearOutput();
    var username = prompt("Username:");
    var password = prompt("Password:");
    var output = "";

    if(username == "stikom"){
        if(password == "mahasiswa"){
            output += "<h2>Selamat datang di Stikom Banyuwangi</h2>";
        } else {
            output += "<p>Password salah, coba lagi!</p>";
        }
    } else {
        output += "<p>Anda tidak terdaftar!</p>";
    }

    document.getElementById("output").innerHTML = output;
}