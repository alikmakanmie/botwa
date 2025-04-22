
// Script untuk mengembalikan Nano.js asli
const fs = require('fs');

try {
  if (fs.existsSync('./Nano.js.original')) {
    fs.copyFileSync('./Nano.js.original', './Nano.js');
    console.log('Berhasil mengembalikan Nano.js asli!');
    console.log('Restart bot Anda untuk menerapkan perubahan.');
  } else {
    console.error('File backup Nano.js.original tidak ditemukan!');
  }
} catch (error) {
  console.error('Error saat restore:', error);
}
