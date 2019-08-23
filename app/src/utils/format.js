import dayjs from "dayjs"

export function formatDate(timestamp) {
  if (!timestamp) return ''
  return dayjs(timestamp * 1000).format('YYYY.MM.DD')
}

export function formatTime(timestamp) {
  if (!timestamp) return ''
  return dayjs(timestamp * 1000).format('YYYY.MM.DD HH:mm')
}

export function formatDateTime(timestamp) {
  if (!timestamp) return ''
  return dayjs(timestamp * 1000).format('YYYY.MM.DD HH:mm:ss')
}

// USDT、ZBX价格与数量都保留4位小数
export function formatCoinPrice(price) {
  if (!price) return 0
  return Number(price).toFixed(4)
}

// 特价额度数量保留2位
export function formatSpecialOffer(price) {
  if (!price) return 0
  return Number(price).toFixed(2)
}
