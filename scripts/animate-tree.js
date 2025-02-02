import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

// Tạo danh sách vị trí trên cây
const flowerPositions = [
    { x: 140, y: 90 },
    { x: 160, y: 120 },
    { x: 180, y: 80 },
    { x: 320, y: 100 },
    { x: 340, y: 130 },
    { x: 360, y: 90 }
];

// Chọn ngẫu nhiên loại hoa (Mai hoặc Đào)
function getRandomFlowerColor() {
    return Math.random() > 0.5 ? "#FFD700" : "#FF69B4"; // Màu vàng (mai) hoặc hồng (đào)
}

// Tạo bông hoa trên cây
function createFlower(name) {
    const flowerGroup = document.getElementById("flowers");

    // Chọn vị trí ngẫu nhiên
    const pos = flowerPositions[Math.floor(Math.random() * flowerPositions.length)];

    // Tạo bông hoa
    const flower = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    flower.setAttribute("cx", pos.x);
    flower.setAttribute("cy", pos.y);
    flower.setAttribute("r", "0"); // Bắt đầu từ 0 để tạo hiệu ứng nở dần
    flower.setAttribute("fill", getRandomFlowerColor());

    // Tạo hiệu ứng nở hoa
    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeName", "r");
    animate.setAttribute("from", "0");
    animate.setAttribute("to", "12");
    animate.setAttribute("dur", "1.5s");
    animate.setAttribute("fill", "freeze");

    // Thêm hiệu ứng vào hoa
    flower.appendChild(animate);

    // Thêm bông hoa vào cây
    flowerGroup.appendChild(flower);

    // Thêm tên người nhận gần bông hoa
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", pos.x - 10);
    text.setAttribute("y", pos.y - 15);
    text.setAttribute("fill", "#000");
    text.setAttribute("font-size", "12px");
    text.setAttribute("font-weight", "bold");
    text.textContent = name;
    flowerGroup.appendChild(text);
}

// Lấy dữ liệu từ Firebase và thêm hoa
onChildAdded(resultsRef, (snapshot) => {
    const data = snapshot.val();
    createFlower(data.name);
});