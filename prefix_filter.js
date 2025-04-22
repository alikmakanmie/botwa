// File filter prefix untuk Nano.js
const fs = require('fs');

// Backup Nano.js jika belum ada
try {
  if (!fs.existsSync('./Nano.js.original')) {
    fs.copyFileSync('./Nano.js', './Nano.js.original');
    console.log('Backup Nano.js berhasil dibuat.');
  }
} catch (error) {
  console.error('Error saat backup Nano.js:', error);
}

// Load handler asli
const originalNanoHandler = require('./Nano.js.original');

// Fungsi wrapper untuk memfilter pesan berdasarkan prefix
function filteredHandler(conn, m, chatUpdate, store) {
  try {
    // Periksa jika pesan valid
    if (!m) {
      return originalNanoHandler(conn, m, chatUpdate, store);
    }
    
    // Cek jika ada body pesan atau text
    let messageText = '';
    
    // Cek berbagai properti yang mungkin berisi pesan
    if (m.body) {
      messageText = m.body.toString().trim();
    } else if (m.text) {
      messageText = m.text.toString().trim();
    } else if (m.message && typeof m.message === 'string') {
      messageText = m.message.toString().trim();
    } else if (m.msg && m.msg.text) {
      messageText = m.msg.text.toString().trim();
    }
    
    // Jika tidak ada teks pesan, gunakan handler asli
    if (!messageText) {
      return originalNanoHandler(conn, m, chatUpdate, store);
    }
    
    // Hanya proses pesan dengan prefix '.'
    if (messageText.startsWith('.')) {
      console.log('Pesan dengan prefix valid:', messageText);
      return originalNanoHandler(conn, m, chatUpdate, store);
    } else {
      // Abaikan pesan tanpa prefix
      console.log('Pesan tanpa prefix diabaikan:', messageText);
      return;
    }
  } catch (error) {
    console.error('Error dalam filter prefix:', error);
    // Jika terjadi error, gunakan handler asli
    return originalNanoHandler(conn, m, chatUpdate, store);
  }
}

// Export handler yang sudah difilter
module.exports = filteredHandler; 