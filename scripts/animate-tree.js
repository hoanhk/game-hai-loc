import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-xb0w9kSxkTXPLQz5HsyEgBzBhEx9c9Q",
    authDomain: "game-hai-loc.firebaseapp.com",
    databaseURL: "https://game-hai-loc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "game-hai-loc",
    storageBucket: "game-hai-loc.appspot.com",
    messagingSenderId: "986400836091",
    appId: "1:986400836091:web:92827f200f821ab507e35e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const resultsRef = ref(database, "gameResults");

// **Danh sách 100 vị trí ngẫu nhiên trên cây**
const flowerPositions = [];
for (let i = 0; i < 100; i++) {
    flowerPositions.push({
        x: Math.floor(Math.random() * 300) + 100, // Ngẫu nhiên trong khoảng trên cây
        y: Math.floor(Math.random() * 250) + 50   // Ngẫu nhiên trên nhánh
    });
}

// **Chọn emoji hoa Mai (🌼) hoặc hoa Đào (🌸)**
function getRandomFlowerEmoji() {
    return Math.random() > 0.5 ? "🌸" : "🌼"; // 50% Hoa Đào 🌸, 50% Hoa Mai 🌼
}

// **Xóa toàn bộ hoa trước khi cập nhật**
function clearFlowers() {
    const flowerContainer = document.getElementById("flower-layer");
    if (flowerContainer) {
        flowerContainer.innerHTML = ""; // Xóa tất cả hoa cũ
    }
}

// **Tạo bông hoa trên cây**
function createFlower(name) {
    const flowerContainer = document.getElementById("flower-layer");

    if (!flowerContainer) return;

    // Chọn vị trí ngẫu nhiên từ danh sách 100 điểm
    const pos = flowerPositions[Math.floor(Math.random() * flowerPositions.length)];

    // **Tạo thẻ `<div>` để hiển thị hoa**
    const flowerDiv = document.createElement("div");
    flowerDiv.classList.add("flower");
    flowerDiv.style.position = "absolute";
    flowerDiv.style.left = `${pos.x}px`;
    flowerDiv.style.top = `${pos.y}px`;
    flowerDiv.style.fontSize = "20px";
    flowerDiv.style.transition = "transform 1.5s ease-in-out";
    flowerDiv.textContent = getRandomFlowerEmoji();

    // Hiệu ứng nở hoa (scale nhỏ -> lớn)
    flowerDiv.style.transform = "scale(0)";
    setTimeout(() => {
        flowerDiv.style.transform = "scale(1)";
    }, 500);

    // **Tạo thẻ `<span>` để hiển thị tên người nhận**
    const nameTag = document.createElement("span");
    nameTag.style.position = "absolute";
    nameTag.style.left = `${pos.x + 15}px`;
    nameTag.style.top = `${pos.y - 10}px`;
    nameTag.style.fontSize = "14px";
    nameTag.style.fontWeight = "bold";
    nameTag.style.color = "#333";
    nameTag.textContent = name;

    // Thêm vào cây
    flowerContainer.appendChild(flowerDiv);
    flowerContainer.appendChild(nameTag);
}

// **Tải danh sách hoa từ Firebase**
function loadFlowers() {
    clearFlowers(); // Xóa hoa cũ trước khi cập nhật

    get(resultsRef).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                createFlower(data.name);
            });
        }
    }).catch((error) => {
        console.error("Lỗi tải dữ liệu từ Firebase:", error);
    });
}

// **Gọi `loadFlowers()` khi trang tải xong & cập nhật mỗi 5 giây**
window.onload = () => {
    loadFlowers();
    setInterval(loadFlowers, 5000); // Tự động làm mới hoa mỗi 5 giây
};