function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

function perulanganFor() {
    clearOutput();
    let output = "";

    for(let i = 0; i < 10; i++){
        output += "<p>Perulangan ke- " + i + "</p>";
    }

    for(let counter = 0; counter < 50; counter += 2){
        output += "<p>Perulangan ke- " + counter + "</p>";
    }

    for(let counter = 10; counter > 0; counter--){
        output += "<p>Perulangan ke " + counter + "</p>";
    }

    document.getElementById("output").innerHTML = output;
}

function perulanganWhile() {
    clearOutput();
    let ulangi = confirm("Apakah anda mau mengulang?");
    let counter = 0;
    let output = "";

    while(ulangi){
        counter++;
        ulangi = confirm("Apakah anda mau mengulang?");
    }

    output = "Perulangan sudah dilakukan sebanyak " + counter + " kali";
    document.getElementById("output").innerHTML = output;
}

function perulanganDoWhile() {
    clearOutput();
    let counter = 0;
    let ulangi;
    let output = "";

    do {
        ulangi = confirm("Apakah anda mau mengulang?");
        if (ulangi) counter++;
    } while(ulangi);

    output = "Perulangan sudah dilakukan sebanyak " + counter + " kali";
    document.getElementById("output").innerHTML = output;
}

function perulanganRepeat() {
    clearOutput();
    let kalimat = "Ulangi kalimat ini! ".repeat(50);
    document.getElementById("output").innerHTML = kalimat;
}

function perulanganForeachTanpaIn() {
    clearOutput();
    let languages = ["Javascript", "HTML", "CSS", "Typescript"];
    let output = "";

    for(let i = 0; i < languages.length; i++){
        output += i + ". " + languages[i] + "<br/>";
    }

    document.getElementById("output").innerHTML = output;
}

function perulanganForeachDenganIn() {
    clearOutput();
    let languages = ["Javascript", "HTML", "CSS", "Typescript"];
    let output = "";

    for(let i in languages){
        output += i + ". " + languages[i] + "<br/>";
    }

    document.getElementById("output").innerHTML = output;
}

function perulanganForeachDenganArray() {
    clearOutput();
    let days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
    let output = "";

    days.forEach((day) => {
        output += "<p>" + day + "</p>";
    });

    document.getElementById("output").innerHTML = output;
}

function perulanganBersarang() {
    clearOutput();
    let output = "";

    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            output += "<p>Perulangan ke " + i + "," + j + "</p>";
        }
    }

    document.getElementById("output").innerHTML = output;
}