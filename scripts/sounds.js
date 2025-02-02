export function playFireworkSound() {
    const audio = new Audio("assets/sounds/fireworks.mp3");
    audio.play().catch(error => console.log("Không thể phát nhạc: ", error));
}