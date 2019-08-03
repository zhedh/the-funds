export function convertCanvasToImage(canvas) {
  let image = new Image();
  //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
  //指定格式PNG
  image.src = canvas.toDataURL("image/png");
  return image;
}

export function chineseCapital(num) {
  const capitals = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  return capitals[num];
}
