export function createFirework(container, position) {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    firework.style.left = `${position}%`;
    container.appendChild(firework);

    setTimeout(() => {
        firework.remove();
        createExplosion(container, position);
    }, 3000);
}

function createExplosion(container, position) {
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");
    explosion.style.left = `${position}%`;
    explosion.style.bottom = "50%";
    container.appendChild(explosion);

    // Tạo tia sáng pháo hoa
    for (let i = 0; i < 10; i++) {
        const spark = document.createElement("div");
        spark.classList.add("spark");
        spark.style.backgroundColor = getRandomColor();
        spark.style.left = `${position}%`;
        spark.style.bottom = "50%";
        spark.style.transform = `rotate(${i * 36}deg)`;
        container.appendChild(spark);

        // Xóa tia sáng sau khi hoàn tất hiệu ứng
        setTimeout(() => spark.remove(), 1000);
    }

    // Xóa vụ nổ sau khi hoàn tất hiệu ứng
    setTimeout(() => explosion.remove(), 1000);
}

function getRandomColor() {
    const colors = ["red", "yellow", "orange", "blue", "green", "purple", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
}