// Fungsi untuk memaksa prefix
module.exports = {
  forcePrefix: function(message) {
    // Cek jika pesan dimulai dengan prefix '.'
    if (!message.startsWith('.')) {
      return false; // Abaikan pesan tanpa prefix
    }
    return true; // Proses pesan dengan prefix
  }
}; 