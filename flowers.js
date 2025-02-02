document.addEventListener("DOMContentLoaded", () => {
    const flowerContainer = document.getElementById("falling-flowers");

    function createFlower() {
        const flower = document.createElement("div");
        flower.classList.add("flower");
        flower.innerHTML = Math.random() > 0.5 ? "🌸" : "🌼"; // Hoa đào hoặc hoa mai
       
        const size = Math.random() * 20 + 10; // Kích thước ngẫu nhiên
        flower.style.fontSize = `${size}px`;

        // Vị trí ngẫu nhiên theo chiều ngang
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.top = `-30px`; // Xuất phát từ phía trên màn hình
        flower.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`; // Hiệu ứng rơi

        flowerContainer.appendChild(flower);

        // Xóa hoa sau khi rơi xong
        setTimeout(() => flower.remove(), 5000);
    }

    // Tạo hoa rơi liên tục
    setInterval(createFlower, 300);
});