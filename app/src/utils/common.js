import { CAPTCHA_ID } from './constants'

export function convertCanvasToImage(canvas) {
  let image = new Image()
  //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
  //指定格式PNG
  image.src = canvas.toDataURL('image/png')
  return image
}

export function chineseCapital(num) {
  const capitals = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十'
  ]
  return capitals[num]
}

/**
 * @description 初始化网易验证码
 * @param {object} config 验证码配置对象
 */
export const initNECaptcha = (config = {}) => {
  if (!window.initNECaptcha) return
  window.initNECaptcha(
    {
      captchaId: config.captchaId || CAPTCHA_ID,
      element: config.element || '',
      mode: config.mode || 'popup',
      width: config.width || 280,
      // lang: config.lang === 'zh-CN' ? 'zh-CN' : 'en',
      onReady: instance => {
        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
        if (config.debug) {
          console.log('[NECaptcha] onReady')
        }
        config.onReady &&
          typeof config.onReady === 'function' &&
          config.onReady(instance)
      },
      onVerify: (err, data) => {
        // 验证结果
        if (config.debug) {
          console.log('[NECaptcha] onVerify', data.validate)
        }
        if (err && config.debug) {
          console.error(err)
          return
        }

        config.onVerify &&
          typeof config.onVerify === 'function' &&
          config.onVerify(data)
      }
    },
    instance => {
      // 初始化成功
      if (config.debug) {
        console.log('[NECaptcha] Initialized')
        console.log('[NECaptcha] instance', instance)
      }
      instance.popUp()

      config.onLoad &&
        typeof config.onLoad === 'function' &&
        config.onLoad(instance)
    },
    err => {
      // 初始化失败
      if (config.debug) {
        console.error('[NECaptcha] Fail to initialize', err)
      }
      config.onError && typeof config.onError === 'function' && config.onError()
    }
  )
}

// 下划线转驼峰
export function optionsToHump(options) {
  const result = {}
  Object.keys(options).forEach(key => {
    const newKey = key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase())
    result[newKey] = options[key]
  })
  return result
}

// 驼峰转换下划线
export function optionsToLine(options) {
  const result = {}
  Object.keys(options).forEach(key => {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    result[newKey] = options[key]
  })
  return result
}

/**
 * @description 把时间戳转为 JS 时间戳（毫秒，13位）
 * @param {number} [num=0] 待转换的时间戳
 * @returns {number} 13 位时间戳
 */
export const ensureMilliseconds = (num = 0) => {
  return Number(
    String(num)
      .padEnd(13, 0)
      .substr(0, 13)
  )
}
