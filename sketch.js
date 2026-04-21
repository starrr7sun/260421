let capture;
let pg;
let isLoaded = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 使用物件方式設定，並明確關閉音訊以減少權限請求
  capture = createCapture({
    video: { facingMode: 'user' },
    audio: false
  }, function() {
    isLoaded = true;
    // 產生一個與視訊畫面解析度一致的畫布緩衝區 (Off-screen Graphics)
    pg = createGraphics(capture.width, capture.height);
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
    image(capture, -vWidth / 2, -vHeight / 2, vWidth, vHeight); 

    // 如果 pg 已建立，則在 pg 上繪圖並顯示在視訊上方
    if (pg) {
      pg.clear(); // 清除背景，使 pg 保持透明
      pg.fill(255, 255, 0, 180); // 設定為半透明黃色
      pg.noStroke();
      // 在 pg 的中心畫一個圓，這會對應到視訊的正中央
      pg.ellipse(pg.width / 2, pg.height / 2, 50, 50);
      
      // 將繪圖層 (pg) 繪製在視訊影像之上，使用相同的座標與縮放比例
      image(pg, -vWidth / 2, -vHeight / 2, vWidth, vHeight);
    }
    pop();
  } else {
    // 提示使用者點擊畫面或檢查環境
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(100);
    text("正在啟動攝影機...\n若無畫面請確認使用 HTTPS 連線\n並點擊畫面一下", width / 2, height / 2);
  }
}
