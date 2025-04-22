/**
 * message_filter.js
 * Filter pesan untuk memastikan hanya pesan dengan prefix yang ditangani
 */

const originalNano = require('./Nano.js');

// Fungsi untuk memfilter pesan tanpa prefix
function filterMessage(conn, m, chatUpdate, store) {
  try {
    // Cek apakah ada objek pesan
    if (!m || !m.text) {
      return originalNano(conn, m, chatUpdate, store);
    }
    
    // Ambil teks pesan
    const text = m.text.trim();
    
    // Jika pesan dimulai dengan titik, proses dengan Nano.js
    if (text.startsWith('.')) {
      return originalNano(conn, m, chatUpdate, store);
    }
    
    // Jika pesan dari owner atau grup tertentu (opsional), bisa diproses
    // Misalnya jika ingin pesan dari owner diproses tanpa prefix
    // if (m.sender === ownerId) {
    //   return originalNano(conn, m, chatUpdate, store);
    // }
    
    // Abaikan pesan lain (tanpa prefix)
    return; 
    
  } catch (error) {
    console.error('Error dalam filter pesan:', error);
    // Jika error, gunakan handler asli
    return originalNano(conn, m, chatUpdate, store);
  }
}

module.exports = filterMessage; 