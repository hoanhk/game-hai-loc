// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD-EXAMPLE",
    authDomain: "example.firebaseapp.com",
    databaseURL: "https://example-default-rtdb.firebaseio.com",
    projectId: "example",
    storageBucket: "example.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Chọn container cho hoa
const flowerLayer = document.getElementById("flower-layer");

// Hàm chọn vị trí ngẫu nhiên cho hoa
function getRandomPosition() {
    const x = Math.floor(Math.random() * window.innerWidth); // Tọa độ X ngẫu nhiên
    const y = Math.floor(Math.random() * window.innerHeight); // Tọa độ Y ngẫu nhiên
    return { x, y };
}

// Hàm chọn loại hoa ngẫu nhiên
function getRandomFlowerType() {
    return Math.random() > 0.5 ? "mai" : "dao"; // 50% Mai (🌼), 50% Đào (🌸)
}

// Hàm thêm hoa Mai/Đào từ Firebase
function addFlowerFromFirebase(type, x, y, player) {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = type === "mai" ? "🌼" : "🌸"; // Mai (🌼) hoặc Đào (🌸)
    flower.style.left = `${x}px`;
    flower.style.top = `${y}px`;

    // Thêm tên người chơi
    const playerTag = document.createElement("span");
    playerTag.textContent = player;
    playerTag.style.position = "absolute";
    playerTag.style.fontSize = "12px";
    playerTag.style.color = "#333";
    playerTag.style.top = `${y - 20}px`; // Hiển thị trên hoa
    playerTag.style.left = `${x}px`;

    // Thêm hoa và tên vào layer
    flowerLayer.appendChild(flower);
    flowerLayer.appendChild(playerTag);
}

// Hàm thêm người chơi vào Firebase
function addPlayerFlowerToFirebase(player) {
    const position = getRandomPosition();
    const type = getRandomFlowerType();

    // Đẩy dữ liệu vào Firebase
    const flowersRef = ref(database, "flowers");
    push(flowersRef, {
        type: type,
        x: position.x,
        y: position.y,
        player: player
    });
}

// Lấy danh sách hoa từ Firebase
function loadFlowers() {
    const flowersRef = ref(database, "flowers");
    onValue(flowersRef, (snapshot) => {
        flowerLayer.innerHTML = ""; // Xóa hoa cũ
        const flowers = snapshot.val();
        if (flowers) {
            Object.values(flowers).forEach((flower) => {
                addFlowerFromFirebase(flower.type, flower.x, flower.y, flower.player);
            });
        }
    });
}

// Gọi hàm thêm người chơi khi trang tải
function simulateNewPlayer() {
    const playerName = `Người Chơi ${Math.floor(Math.random() * 1000)}`;
    addPlayerFlowerToFirebase(playerName); // Thêm vào Firebase
}

// Gọi hàm khi trang tải xong
window.onload = () => {
    loadFlowers();
    simulateNewPlayer(); // Giả lập một người chơi
};