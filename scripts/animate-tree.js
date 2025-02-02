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

// Tập hợp để lưu tên người chơi đã hiển thị
const displayedPlayers = new Set();

// Hàm chọn vị trí ngẫu nhiên trong cột và hàng cụ thể
function getRandomPositionForColumn(column, row) {
    const columnWidth = window.innerWidth / 4; // Mỗi cột chiếm 1/4 chiều rộng
    const rowHeight = window.innerHeight / 2; // Mỗi hàng chiếm 1/2 chiều cao

    const x = Math.random() * columnWidth + columnWidth * (column - 1); // Tọa độ X trong cột
    const y = Math.random() * rowHeight + rowHeight * (row - 1); // Tọa độ Y trong hàng

    return { x, y };
}

// Hàm thêm hoa Mai hoặc Đào từ Firebase với hiệu ứng nở trước, sau đó hiện tên người chơi
function addFlowerFromFirebase(playerName, flowerType) {
    const column = flowerType === "dao" ? 2 : 3; // Hoa Đào ở cột 2, Hoa Mai ở cột 3
    const row = 1; // Hàng 1 cố định
    const { x, y } = getRandomPositionForColumn(column, row);

    // Tạo hoa
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = flowerType === "mai" ? "🌼" : "🌸"; // Mai 🌼 hoặc Đào 🌸
    flower.style.position = "absolute";
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;
    flower.style.fontSize = "36px";
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
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const playerData = childSnapshot.val();
                if (!displayedPlayers.has(playerData.name)) {
                    // Nếu người chơi chưa được hiển thị, thêm vào
                    const flowerType = Math.random() > 0.5 ? "mai" : "dao"; // Chọn loại hoa ngẫu nhiên
                    addFlowerFromFirebase(playerData.name, flowerType);
                    displayedPlayers.add(playerData.name); // Đánh dấu đã hiển thị
                }
            });
        }
    });
}

// Gọi hàm khi trang tải xong
window.onload = loadFlowers;