import Compressor from "compressorjs";

export function downloadFile(fileName, content) {
  let aLink = document.createElement('a');
  let blob = base64ToBlob(content); // new Blob([content]);

  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true);// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  aLink.dispatchEvent(evt);
  aLink.click()
  // aLink.dispatchEvent(new Event('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
}

// base64转blob
export function base64ToBlob(code) {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;

  let uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], {type: contentType});
}

// 压缩图片
export function compressorImg(image, callback) {
  if (!image) return
  const ratio = image.size / 1000 * 2000
  new Compressor(image, {
    quality: ratio >= 1 ? 1 / ratio : 0.9,
    convertSize: 2000000,
    success(result) {
      callback && callback(result)
    },
    error(err) {
      console.log(err.message);
    },
  });
}
