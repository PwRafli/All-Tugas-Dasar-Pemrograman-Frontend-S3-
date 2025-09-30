function contohBitwise(x, y) {
    console.log("x & y : " + (x & y));   // AND
    console.log("x | y : " + (x | y));   // OR
    console.log("x ^ y : " + (x ^ y));   // XOR
    console.log("~x : " + (~x));         // NOT
    console.log("x << 1 : " + (x << 1)); // Left shift
    console.log("y >> 1 : " + (y >> 1)); // Right shift
}

contohBitwise(5, 3);