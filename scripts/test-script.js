async function runTest() {
    const playerNames = [];
    
    // Tạo danh sách 100 người chơi với tên ngẫu nhiên
    for (let i = 1; i <= 50; i++) {
        playerNames.push(`Người Chơi ${i}`);
    }

    for (let i = 0; i < playerNames.length; i++) {
        sessionStorage.setItem("playerName", playerNames[i]); // Đặt người chơi vào sessionStorage

        console.log(`🔄 Đang chạy test cho: ${playerNames[i]}`);

        // Tạo một iframe để tải result.html và lấy dữ liệu
        const iframe = document.createElement("iframe");
        iframe.src = "result.html";
        iframe.style.width = "800px";
        iframe.style.height = "600px";
        document.body.appendChild(iframe);

        // Đợi 5 giây để quá trình lấy Lộc hoàn tất
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Xóa iframe sau khi hoàn tất
        document.body.removeChild(iframe);
    }

    console.log("✅ Hoàn tất test với 100 người chơi!");
}

// Gọi function chạy test
runTest();