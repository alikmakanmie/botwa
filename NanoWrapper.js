// File wrapper untuk Nano.js
const originalNano = require('./Nano.js');

// Fungsi wrapper untuk memeriksa prefix
module.exports = function(conn, m, chatUpdate, store) {
  // Jika tidak ada objek message, gunakan handler asli
  if (!m || !m.body) {
    return originalNano(conn, m, chatUpdate, store);
  }
  
  // Periksa jika pesan dimulai dengan prefix (titik)
  const messageText = m.body.trim();
  if (!messageText.startsWith('.')) {
    // Abaikan pesan tanpa prefix
    return;
  }
  
  // Lanjutkan ke handler asli jika prefix valid
  return originalNano(conn, m, chatUpdate, store);
}; 