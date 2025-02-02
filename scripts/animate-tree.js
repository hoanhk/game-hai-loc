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

// Hiển thị các câu quote trên cây
function loadQuotesOnTree() {
    const quotesContainer = document.querySelector("#quotes-container");
    quotesContainer.innerHTML = ""; // Xóa nội dung cũ

    onChildAdded(resultsRef, (snapshot) => {
        const data = snapshot.val();

        // Tạo một div cho mỗi câu quote
        const quoteDiv = document.createElement("div");
        quoteDiv.classList.add("quote");
        quoteDiv.textContent = `"${data.quote}" — ${data.name}`;

        // Đặt vị trí ngẫu nhiên trong cây
        const randomX = Math.random() * 80 + 10; // Từ 10% đến 90%
        const randomY = Math.random() * 80 + 10; // Từ 10% đến 90%
        quoteDiv.style.left = `${randomX}%`;
        quoteDiv.style.top = `${randomY}%`;

        // Thêm vào container
        quotesContainer.appendChild(quoteDiv);
    });
}

// Gọi hàm loadQuotesOnTree khi trang tải
window.onload = loadQuotesOnTree;