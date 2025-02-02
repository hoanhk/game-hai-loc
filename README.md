# 🌿 Hái Lộc Đầu Xuân 🎉

✨ **Website trò chơi hái lộc cho nhân viên công ty** ✨

## 🚀 Giới thiệu

**“Hái Lộc Đầu Xuân”** là một trò chơi trực tuyến được thiết kế để mang lại niềm vui đầu năm cho nhân viên công ty.  
Người chơi sẽ quét mã QR, nhập tên, và nhận một **câu lộc đầu năm** đầy ý nghĩa.

> ✨ Trò chơi **miễn phí**, chạy trên **GitHub Pages**, dễ dàng truy cập từ **điện thoại hoặc máy tính**.

---

## 🎮 Cách chơi

1. **Quét mã QR** để truy cập vào website.
2. **Nhập tên** của bạn để tham gia.
3. **Nhấn "Hái Lộc Ngay!"** để nhận câu lộc.
4. **Xem câu lộc hiển thị cùng hiệu ứng pháo hoa.**
5. **Xem danh sách các câu lộc của mọi người** trên trang tổng hợp.

### 📌 **Lưu ý**
- Mỗi người chỉ nhận được **một câu lộc duy nhất**. Nếu nhập lại tên cũ, bạn sẽ nhận đúng câu lộc đã lấy trước đó.
- **Dữ liệu được lưu trên Firebase**, đảm bảo đồng bộ giữa các thiết bị.

---

## 🛠 Công nghệ sử dụng

### ✅ **Frontend**
- HTML, CSS, JavaScript
- Hiệu ứng động với **CSS Animation**
- Hiệu ứng **pháo hoa**, **hoa mai rơi**

### ✅ **Backend & Database**
- **Firebase Realtime Database** để lưu danh sách người chơi và câu lộc  
- **GitHub Pages** để triển khai website

---

## 📂 Cấu trúc thư mục
```
game-hai-loc/
│── index.html         # Trang chính của trò chơi
│── result.html        # Trang hiển thị câu lộc
│── all-results.html   # Trang tổng hợp danh sách lộc đã hái
│── styles/styles.css         # Tệp CSS chứa giao diện và hiệu ứng
│── data.js            # Danh sách 100 câu lộc
│── firebase-config.js # Cấu hình Firebase
│── favicon.ico        # Biểu tượng website
│── assets/            # Thư mục chứa hình ảnh và nhạc nền
│── scripts/
│   ├── main.js        # Code xử lý logic chính
│   ├── fireworks.js   # Hiệu ứng pháo hoa
│   ├── scripts/flowers.js     # Hiệu ứng hoa mai rơi
│── README.md          # Hướng dẫn sử dụng
```

---

## 🔥 Tính năng nổi bật

✅ **Giao diện đậm chất Tết** với nền **đêm giao thừa**, hiệu ứng **hoa mai rơi** và **pháo hoa rực rỡ**.  
✅ **Hỗ trợ đa thiết bị**, tối ưu hiển thị cho **điện thoại di động**.  
✅ **Lưu dữ liệu trên Firebase**, đảm bảo người chơi không nhận lại câu lộc mới.  
✅ **Hiển thị danh sách người chơi và câu lộc** theo thời gian thực.  
✅ **Triển khai trên GitHub Pages**, không cần server riêng.  

---

## 📖 Hướng dẫn cài đặt và chạy dự án

### **1️⃣ Chạy trên máy tính cá nhân**
```sh
# Clone project về máy
git clone https://github.com/username/game-hai-loc.git
cd game-hai-loc

# Mở trực tiếp index.html trên trình duyệt
```

### **2️⃣ Chạy trên GitHub Pages**
	1.	Fork repo và tải lên GitHub.
	2.	Vào Settings → Pages → Chọn branch để kích hoạt GitHub Pages.
	3.	Truy cập link website để chơi.

