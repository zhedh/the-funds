// 项目配置文件

// 修改样式配置文件：
// 1.styles 文件夹下 mixin.scss 修改 variable 的引用
// 2.package.json 下修改 antd-mobile 主题颜色

// XC线上访问地址：www.zbxcoin.com
// XC测试环境访问地址：http://47.75.138.157:81/

/**
 * @description 开关配置，打包前修改配置
 *
 * PROJECT String 项目名（XC|NTTC）
 * ONLINE bool 线上版本
 * */

export const SWITCH = {
  PROJECT: 'XC',
  ONLINE: false
}

const XC = {
  PROD: {
    API_BASE_URL: 'http://api.zbxcoin.com/api'
  },
  DEV: {
    API_BASE_URL: 'http://47.75.138.157/api'
  }
}

const NTTC = {
  PROD: {
    API_BASE_URL: 'http://api.naturetoken.io/api'
  },
  DEV: {
    API_BASE_URL: 'http://47.75.105.186/api'
  }
}

const CURRENT_PROJECT = SWITCH.PROJECT === 'XC' ? XC : NTTC

export const CONFIG = SWITCH.ONLINE ? CURRENT_PROJECT.PROD : CURRENT_PROJECT.DEV
