# WhatsApp Bot – ࿌࿆࿇ӦН Mⲯ RĚVAN

## 🚀 Fitur
1. `ytmp3 <link>` – Konversi YouTube ke MP3  
2. Kirim gambar + tulis `stiker` – Jadikan stiker  
3. `suit` – Main gunting-batu-kertas  
4. `menu` / `help` – Tampilan menu

## 📦 Instalasi dan Deploy

1. Clone repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/bot-revan-wa.git
   cd bot-revan-wa
   npm install
   ```

2. Jalankan lokal untuk scan QR dan generate sesi:
   ```bash
   node index.js
   ```
   Setelah muncul `temp/audio`, kirim “stiker” sekali lalu bot siap.

3. Upload folder `.wwebjs_auth/` ke repo kamu (session WA).

4. Buat project di [Railway.app](https://railway.app), deploy dari GitHub.

5. Tambahkan Var:
   ```
   NODE_ENV=production
   ```

6. Railway akan otomatis run `npm start`, bot akan aktif 24/7.

## 🔄 Update
- Push perubahan ke GitHub → Railway akan redeploy otomatis.
