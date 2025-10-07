// modules/lingkaran.js
import { PHI } from './math-constants.js';

// Fungsi untuk menghitung luas lingkaran
export const luasLingkaran = (radius) => PHI * radius * radius;

// Fungsi untuk menghitung keliling lingkaran
export const kelilingLingkaran = (radius) => 2 * PHI * radius;

// Fungsi untuk menghitung diameter lingkaran
export const diameterLingkaran = (radius) => 2 * radius;

// Fungsi untuk menghitung jari-jari lingkaran dari diameter
export const jariJariDariDiameter = (diameter) => diameter / 2;

// Fungsi untuk menghitung jari-jari lingkaran dari keliling
export const jariJariDariKeliling = (keliling) => keliling / (2 * PHI);

// Fungsi untuk menghitung jari-jari lingkaran dari luas
export const jariJariDariLuas = (luas) => Math.sqrt(luas / PHI);

// Fungsi untuk menghitung luas sektor lingkaran
export const luasSektorLingkaran = (radius, sudut) => (PHI * radius * radius * sudut) / 360;

// Fungsi untuk menghitung panjang busur lingkaran
export const panjangBusurLingkaran = (radius, sudut) => (2 * PHI * radius * sudut) / 360;

// Fungsi untuk menghitung luas annulus (cincin) lingkaran
export const luasAnnulus = (radiusLuar, radiusDalam) => PHI * (radiusLuar * radiusLuar - radiusDalam * radiusDalam);
