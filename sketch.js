let capture;
let pg;
let isLoaded = false;
let bubbles = [];

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
    image(capture, -vWidth / 2, -vHeight / 2, vWidth, vHeight);

    // 確保 pg 已建立且尺寸正確 (解決攝影機初始化時寬高可能為 0 的問題)
    if (!pg && capture.width > 1) {
      pg = createGraphics(capture.width, capture.height);
    }

    // 如果 pg 已建立，則在 pg 上繪圖並顯示在視訊上方
    if (pg) {
      pg.clear(); // 清除背景，使 pg 保持透明
      
      // 產生新泡泡 (調整頻率)
      if (frameCount % 10 === 0 && bubbles.length < 30) {
        bubbles.push({ x: random(pg.width), y: pg.height + 20, r: random(10, 40), speed: random(1, 3) });
      }

      // 更新並繪製泡泡
      for (let i = bubbles.length - 1; i >= 0; i--) {
        let b = bubbles[i];
        b.y -= b.speed; // 向上漂浮
        
        pg.stroke(255, 255, 255, 200); // 白色邊框
        pg.strokeWeight(2);
        pg.noFill();
        pg.circle(b.x, b.y, b.r);
        
        pg.noStroke();
        pg.fill(255, 255, 255, 180); // 加入反光點
        pg.circle(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3);

        // 移除超出畫面的泡泡
        if (b.y < -50) bubbles.splice(i, 1);
      }
      
      // 將繪圖層 (pg) 繪製在視訊影像之上，使用相同的座標與縮放比例
      image(pg, -vWidth / 2, -vHeight / 2, vWidth, vHeight);
    }
    pop();
  } else {
    // 已移除提示文字
  }
}
