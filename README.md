# Chúc Mừng 20/10 - Romantic Gift Page

Một trang quà tặng 20/10: thư mở đầu, nhạc nền, hiệu ứng lãng mạn, mini game ghép ảnh, album khoảnh khắc, timeline kỷ niệm và quiz.

## Chạy dự án
- Cách 1: Mở trực tiếp file `index.html` trong trình duyệt.
- Cách 2: Chạy bằng server tĩnh (khuyến nghị để tránh vấn đề CORS/tải video):
  - VS Code: cài Live Server, bấm "Go Live".
  - Node: `npx serve .` rồi mở đường dẫn hiển thị.

## Cấu trúc
- `index.html`: markup chính và các section.
- `styles.css`: giao diện theo chủ đề romantic luxury.
- `script.js`: điều hướng section, thư, nhạc nền, quiz, countdown.
- `effects.js`: hiệu ứng sparkle/particle đơn giản, trái tim bay.
- `three-background.js`: nền 3D Three.js (desktop, tối ưu máy yếu).
- `puzzle.js`: logic mini game ghép ảnh.
- `images/`, `moment/`, `kiniem/`, `puzzle_pieces_9/`: tài nguyên media.

## Tối ưu đã thiết lập
- Thêm SEO/OG meta, favicon, `manifest.webmanifest`, `theme-color`.
- Tối ưu tải: `defer` cho script CDN, `preconnect` Google Fonts.
- Video thêm `playsinline` để phát mượt trên mobile.
- Vô hiệu hóa hiệu ứng nặng trên thiết bị yếu/màn nhỏ.

## Deploy
Có thể deploy lên bất kỳ static hosting nào:
- GitHub Pages: trỏ root làm site (Project Pages).
- Netlify/Vercel: kéo thả thư mục hoặc connect repo, build command rỗng.
- Cloudflare Pages: tạo project và chọn thư mục.

## Ghi chú
- Tên file media có dấu và phân biệt hoa/thường. Khi deploy trên host phân biệt case, giữ nguyên đúng tên file.
- Nhạc nền có cơ chế fallback khi bị chặn autoplay; cần tương tác để bật tiếng trên một số trình duyệt.

## Bản quyền
Dùng cho mục đích cá nhân/tặng quà.
