// Script untuk menerapkan filter prefix
const fs = require('fs');

// Backup Nano.js jika belum dilakukan
try {
  if (!fs.existsSync('./Nano.js.original')) {
    fs.copyFileSync('./Nano.js', './Nano.js.original');
    console.log('Backup Nano.js berhasil dibuat.');
  }
} catch (error) {
  console.error('Error saat backup Nano.js:', error);
  process.exit(1);
}

// Buat file wrapper baru (menggunakan file prefix_filter.js yang sudah dibuat)
const wrapperCode = fs.readFileSync('./prefix_filter.js', 'utf8');

// Timpa Nano.js dengan wrapper kita
try {
  // Buat wrapper module
  fs.writeFileSync('./Nano.js', wrapperCode);
  console.log('Berhasil menerapkan filter prefix!');
  console.log('Restart bot Anda untuk menerapkan perubahan.');
} catch (error) {
  console.error('Error saat menerapkan filter:', error);
  process.exit(1);
}

// Menambahkan instruksi untuk restore
console.log('\nJika ingin mengembalikan file asli, jalankan perintah:');
console.log('node restore_filter.js');

// Buat file untuk restore
const restoreCode = `
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
`;

// Buat file restore
fs.writeFileSync('./restore_filter.js', restoreCode);
console.log('File restore_filter.js berhasil dibuat.'); 