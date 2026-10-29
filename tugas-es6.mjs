const transaksi = [
  { id: 1, barang: "Beras", harga: 15000, qty: 5, kategori: "kebutuhan" },
  { id: 2, barang: "Minyak Goreng", harga: 18000, qty: 3, kategori: "kebutuhan" },
  { id: 3, barang: "Gula", harga: 16000, qty: 2, kategori: "kebutuhan" },
  { id: 4, barang: "Telur", harga: 24000, qty: 1, kategori: "kebutuhan" },
  { id: 5, barang: "Sabun", harga: 5000, qty: 2, kategori: "kebutuhan" },
  { id: 6, barang: "Sampoo", harga: 6000, qty:3, kategori: "kebutuhan" },
];

const hasilfilter = transaksi.filter((item) => item.kategori === "kebutuhan");

const hasilmap = hasilfilter.map((item) => {
  return {
    id: item.id,
    barang: item.barang,
    harga: item.harga,
    qty: item.qty,
    kategori: item.kategori
  };
});

const totalHarga = hasilmap.reduce((total, item) => total + (item.harga * item.qty), 0);

console.log("Hasil Filter:", hasilfilter);
console.log("Hasil Map:", hasilmap);
console.log("Total Harga:", totalHarga);