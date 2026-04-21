let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 取得攝影機影像串流
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 video 元素，避免在畫布下方重疊顯示
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  let vWidth = width * 0.6;
  let vHeight = height * 0.6;
  // 將擷取的影像繪製在畫布中心，並設定寬高為畫布的 60%
  image(capture, (width - vWidth) / 2, (height - vHeight) / 2, vWidth, vHeight);
}
