function playGame() {
    const name = document.getElementById("playerName").value.trim();
    if (!name) {
        alert("Vui lòng nhập tên!");
        return;
    }

    // Kiểm tra xem người chơi đã tham gia hay chưa
    let results = JSON.parse(localStorage.getItem("gameResults")) || [];
    const playerExists = results.find((player) => player.name === name);

    if (playerExists) {
        alert(`Bạn đã tham gia và nhận được câu: "${playerExists.quote}". Mỗi người chỉ được chơi 1 lần.`);
        return;
    }

    // Chọn một câu ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    // Hiển thị kết quả
    document.getElementById("result").innerText = `🌟 ${selectedQuote} 🌟`;

    // Lưu kết quả vào localStorage
    results.push({ name, quote: selectedQuote });
    localStorage.setItem("gameResults", JSON.stringify(results));
}