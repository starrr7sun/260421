let capture;
let isLoaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 使用物件方式設定，並明確關閉音訊以減少權限請求
  capture = createCapture({
    video: { facingMode: 'user' },
    audio: false
  }, function() {
    isLoaded = true;
  });
  
  capture.elt.setAttribute('playsinline', '');
  capture.hide();
}

function windowResized() {
  // 當手機轉向或視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 部分行動瀏覽器需要使用者互動（點擊）後才允許啟動影像
  if (capture) {
    capture.play();
  }
}

function draw() {
  background('#e7c6ff');

  if (isLoaded) {
    let vWidth = width * 0.6;
    let vHeight = height * 0.6;

    // 實作水平鏡面翻轉（鏡像效果）
    push();
    translate(width / 2, height / 2); // 將座標原點移至畫布中心
    scale(-1, 1); // 水平縮放 -1 倍，達成鏡像翻轉
    image(capture, -vWidth / 2, -vHeight / 2, vWidth, vHeight); // 以中心對齊繪製影像
    pop();
  } else {
    // 提示使用者點擊畫面或檢查環境
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(100);
    text("正在啟動攝影機...\n若無畫面請確認使用 HTTPS 連線\n並點擊畫面一下", width / 2, height / 2);
  }
}
