// Fungsi untuk memodifikasi index.js
const fs = require('fs');
const path = require('path');

// Path ke file index.js
const indexPath = path.join(__dirname, 'index.js');

// Baca konten index.js
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Fungsi untuk menambahkan kode pengecek prefix
function addPrefixCheck() {
  // Cari tempat yang tepat untuk menambahkan kode kita (sebelum require('./Nano.js'))
  const requireNanoPattern = /require\s*\(['"]\.\/Nano\.js['"]\)/;
  
  // Kode yang akan ditambahkan
  const prefixCheckCode = `
// Tambahkan pengecekan prefix
const prefixHandler = require('./prefix_handler');
const originalRequireNano = require('./Nano.js');
module.exports = function(conn, m, chatUpdate, store) {
  // Jika pesan chatnya ada
  if (m.text) {
    // Cek jika pesan dimulai dengan prefix
    if (!prefixHandler.forcePrefix(m.text)) {
      return; // Abaikan pesan tanpa prefix
    }
  }
  
  // Panggil handler asli jika prefix valid
  return originalRequireNano(conn, m, chatUpdate, store);
};

// Ganti require asli
`;

  // Tambahkan kode pengecekan prefix sebelum require Nano.js
  if (requireNanoPattern.test(indexContent)) {
    indexContent = indexContent.replace(requireNanoPattern, 
      `${prefixCheckCode}${requireNanoPattern.source}`);
    
    // Tulis kembali ke file index.js
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('Berhasil menambahkan pengecekan prefix ke index.js');
  } else {
    console.log('Tidak dapat menemukan require Nano.js di index.js');
  }
}

// Jalankan modifikasi
addPrefixCheck(); 