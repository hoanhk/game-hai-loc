function playGame() {
    const name = document.getElementById("playerName").value.trim();
    if (!name) {
        alert("Vui lòng nhập tên!");
        return;
    }

    // Chọn một câu ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    // Hiển thị kết quả
    document.getElementById("result").innerText = `🌟 ${selectedQuote} 🌟`;

    // Lưu kết quả vào localStorage
    let results = JSON.parse(localStorage.getItem("gameResults")) || [];
    results.push({ name, quote: selectedQuote });
    localStorage.setItem("gameResults", JSON.stringify(results));
}