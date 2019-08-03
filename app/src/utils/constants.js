// 常用数据验证规则
export const REG = {
  MOBILE: /^[0-9]{7,16}$/,
  SMSCODE: /^[0-9]{0,6}$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[a-zA-Z]+$/,
  PASSWORD: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, // 至少8 位英文和数字（英文数字都要有，忽略大小写）
  NUMBER: /^-?\d+(.\d+)?$/,
  IDCARD: /^[a-z0-9A-Z]+$/
};

export const COUNT_DOWN = 10; // 倒计时

export const TOAST_DURATION = 0.9; // 提示框出现时间0.9s
