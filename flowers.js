document.addEventListener("DOMContentLoaded", () => {
    const flowerContainer = document.getElementById("falling-flowers");

    function createFlower() {
        const flower = document.createElement("div");
        flower.classList.add("flower");
        flower.innerHTML = "🌸"; // Biểu tượng hoa đào 🌸 hoặc hoa mai 🌼
        
        const size = Math.random() * 20 + 10; 
        flower.style.fontSize = `${size}px`;

        flower.style.position = "fixed";
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.top = `-30px`;
        flower.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
        
        flowerContainer.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 5000);
    }

    setInterval(createFlower, 200);
});