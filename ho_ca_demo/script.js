// Lấy các phần tử cần điều khiển từ HTML
const aquarium = document.getElementById("aquarium");
const waterBtn = document.getElementById("waterBtn");
const foodBtn = document.getElementById("foodBtn");
const bubbleBtn = document.getElementById("bubbleBtn");
const pauseBtn = document.getElementById("pauseBtn");
const homeBtn = document.getElementById("homeBtn");

// Danh sách màu nước: mỗi lần bấm sẽ chuyển sang màu tiếp theo
const waterColors = [
  ["#31b8e8", "#0564a8"],
  ["#39c6bd", "#087c91"],
  ["#6598dc", "#263f91"],
  ["#53b7a0", "#176c68"]
];
let currentWater = 0;
let isPaused = false;

// Đổi màu nền hồ cá
waterBtn.addEventListener("click", () => {
  currentWater = (currentWater + 1) % waterColors.length;
  aquarium.style.setProperty("--water-top", waterColors[currentWater][0]);
  aquarium.style.setProperty("--water-bottom", waterColors[currentWater][1]);
});

// Tạo bong bóng tại vị trí ngẫu nhiên
function createBubble() {
  const bubble = document.createElement("span");
  bubble.className = "bubble";
  bubble.style.left = Math.random() * 95 + "%";
  bubble.style.animationDuration = (3 + Math.random() * 3) + "s";
  aquarium.appendChild(bubble);

  // Xóa phần tử sau khi hiệu ứng kết thúc để tránh làm nặng trang
  setTimeout(() => bubble.remove(), 6500);
}

bubbleBtn.addEventListener("click", () => {
  // Mỗi lần bấm tạo một cụm bong bóng
  for (let i = 0; i < 8; i++) {
    setTimeout(createBubble, i * 130);
  }
});

// Thả thức ăn từ phía trên hồ xuống
foodBtn.addEventListener("click", () => {
  for (let i = 0; i < 12; i++) {
    const food = document.createElement("span");
    food.className = "food";
    food.style.left = (15 + Math.random() * 70) + "%";
    food.style.animationDelay = (Math.random() * 0.8) + "s";
    aquarium.appendChild(food);

    setTimeout(() => food.remove(), 5000);
  }
});

// Tạm dừng hoặc tiếp tục toàn bộ hoạt ảnh trong hồ
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  aquarium.classList.toggle("paused", isPaused);
  pauseBtn.textContent = isPaused ? "Tiếp tục" : "Tạm dừng";
});

// Nút trang chủ minh họa: đưa hồ về trạng thái ban đầu
homeBtn.addEventListener("click", () => {
  currentWater = 0;
  aquarium.style.setProperty("--water-top", waterColors[0][0]);
  aquarium.style.setProperty("--water-bottom", waterColors[0][1]);

  if (isPaused) {
    isPaused = false;
    aquarium.classList.remove("paused");
    pauseBtn.textContent = "Tạm dừng";
  }
});

// Tự động tạo một vài bong bóng để hồ không bị tĩnh
setInterval(() => {
  if (!isPaused) createBubble();
}, 1800);
