// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD-xb0w9kSxkTXPLQz5HsyEgBzBhEx9Q",
    authDomain: "game-hai-loc.firebaseapp.com",
    databaseURL: "https://game-hai-loc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "game-hai-loc",
    storageBucket: "game-hai-loc.appspot.com",
    messagingSenderId: "986400836091",
    appId: "1:986400836091:web:92827f200f821ab507e35e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const gameResultsRef = ref(database, "gameResults");

// Chọn container để thêm hoa
const flowerLayer = document.getElementById("flower-layer");

// Hàm chọn loại hoa ngẫu nhiên
function getRandomFlower() {
    return Math.random() > 0.5 ? "🌼" : "🌸"; // 50% Mai, 50% Đào
}

// Hàm chọn vị trí ngẫu nhiên tập trung vào nửa trên của màn hình
function getRandomPosition() {
    const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1; // X ngẫu nhiên (trung tâm ngang)
    const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.1; // Y tập trung nửa trên
    return { x, y };
}

// Hàm thêm hoa Mai hoặc Đào từ Firebase với hiệu ứng nở trước, sau đó hiển thị tên người chơi
function addFlowerFromFirebase(playerName) {
    const { x, y } = getRandomPosition();

    // Tạo hoa
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = getRandomFlower();
    flower.style.position = "absolute";
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;
    flower.style.fontSize = "24px";
    flower.style.opacity = "0"; // Ẩn hoa ban đầu
    flower.style.transition = "opacity 1.5s ease, transform 1.5s ease";
    flower.style.transform = "scale(0)"; // Nở dần từ nhỏ đến lớn

    // Hiển thị tên người chơi
    const playerTag = document.createElement("div");
    playerTag.textContent = playerName;
    playerTag.style.position = "absolute";
    playerTag.style.fontSize = "14px";
    playerTag.style.color = "rgba(255, 255, 255, 0.8)"; // Màu trắng nhẹ
    playerTag.style.textAlign = "center";
    playerTag.style.opacity = "0"; // Ẩn tên ban đầu
    playerTag.style.top = `${y + 30}px`; // Dưới hoa
    playerTag.style.left = `${x - 10}px`; // Căn giữa với hoa
    playerTag.style.transition = "opacity 1s ease 1.5s"; // Hiện tên sau hiệu ứng nở hoa

    // Thêm hoa và tên vào layer
    flowerLayer.appendChild(flower);
    flowerLayer.appendChild(playerTag);

    // Kích hoạt hiệu ứng nở hoa
    setTimeout(() => {
        flower.style.opacity = "1";
        flower.style.transform = "scale(1)";
    }, 100);

    // Kích hoạt hiệu ứng hiện tên
    setTimeout(() => {
        playerTag.style.opacity = "1";
    }, 1500);
}

// Lấy danh sách người chơi từ Firebase
function loadFlowers() {
    onValue(gameResultsRef, (snapshot) => {
        flowerLayer.innerHTML = ""; // Xóa hoa cũ
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const playerData = childSnapshot.val();
                addFlowerFromFirebase(playerData.name);
            });
        }
    });
}

// Gọi hàm khi trang tải xong
window.onload = loadFlowers;