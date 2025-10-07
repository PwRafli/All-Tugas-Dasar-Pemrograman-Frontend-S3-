// modules/bola.js
import { PHI } from './math-constants.js';

// Fungsi menghitung volume bola
const volume = (radius) => (4 / 3) * PHI * radius ** 3;

// Export default artinya modul ini mengekspor satu komponen utama
export default volume;

// Fungsi menghitung luas permukaan bola
export const luasPermukaan = (radius) => 4 * PHI * radius ** 2;

// Fungsi menghitung jari-jari bola dari volume
export const jariJariDariVolume = (volume) => Math.cbrt((3 * volume) / (4 * PHI));

// Fungsi menghitung jari-jari bola dari luas permukaan
export const jariJariDariLuasPermukaan = (luas) => Math.sqrt(luas / (4 * PHI));

// Fungsi menghitung jari-jari bola dari diameter
export const jariJariDariDiameter = (diameter) => diameter / 2;

// Fungsi menghitung diameter bola dari jari-jari
export const diameterDariJariJari = (radius) => 2 * radius;

// Fungsi menghitung diameter bola dari volume
export const diameterDariVolume = (volume) => 2 * Math.cbrt((3 * volume) / (4 * PHI));

// Fungsi menghitung diameter bola dari luas permukaan
export const diameterDariLuasPermukaan = (luas) => 2 * Math.sqrt(luas / (4 * PHI));

// Fungsi menghitung luas permukaan bola dari volume
export const luasPermukaanDariVolume = (volume) => 4 * PHI * Math.cbrt((3 * volume) / (4 * PHI)) ** 2;

// Fungsi menghitung volume bola dari luas permukaan
export const volumeDariLuasPermukaan = (luas) => (4 / 3) * PHI * (Math.sqrt(luas / (4 * PHI))) ** 3;

// Fungsi menghitung luas permukaan bola dari diameter
export const luasPermukaanDariDiameter = (diameter) => 4 * PHI * (diameter / 2) ** 2;

// Fungsi menghitung volume bola dari diameter
export const volumeDariDiameter = (diameter) => (4 / 3) * PHI * (diameter / 2) ** 3;