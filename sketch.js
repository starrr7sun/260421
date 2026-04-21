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
    
    // 修正左右顛倒問題：使用鏡像翻轉
    push();
    // 先將原點移至影像預計顯示區域的右側邊界，然後水平縮放為 -1
    translate((width + vWidth) / 2, (height - vHeight) / 2);
    scale(-1, 1);
    image(capture, 0, 0, vWidth, vHeight);
    pop();
  } else {
    // 提示使用者點擊畫面或檢查環境
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(100);
    text("正在啟動攝影機...\n若無畫面請確認使用 HTTPS 連線\n並點擊畫面一下", width / 2, height / 2);
  }
}
