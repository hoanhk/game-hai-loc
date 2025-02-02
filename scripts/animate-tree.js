// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD-xb0w9kSxkTXPLQz5HsyEgBzBhEx9c9Q",
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

// Hàm chọn vị trí ngẫu nhiên trên cây
function getRandomPosition() {
    const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1; // Tọa độ X (giữ hoa trong cây)
    const y = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2; // Tọa độ Y (tập trung hoa trên cành)
    return { x, y };
}

// Hàm thêm hoa Mai hoặc Đào từ Firebase
function addFlowerFromFirebase(playerName) {
    const { x, y } = getRandomPosition();
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = getRandomFlower();
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    // Hiển thị tên người chơi bên cạnh hoa
    const playerTag = document.createElement("span");
    playerTag.textContent = playerName;
    playerTag.style.position = "absolute";
    playerTag.style.fontSize = "12px";
    playerTag.style.color = "#000";
    playerTag.style.top = `${y - 20}px`;
    playerTag.style.left = `${x}px`;

    // Thêm hoa và tên vào layer
    flowerLayer.appendChild(flower);
    flowerLayer.appendChild(playerTag);
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