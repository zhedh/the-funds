import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import config from './config';
import {optionsToHump, optionsToLine} from '../utils/common';

const axiosConfig = {
  baseURL: config.baseURL,
  transformRequest: [data => {
    if (!data) return data;
    return qs.stringify(optionsToLine(data));
  }], // 对data进行转换处理
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  timeout: 100000
};

let instance = axios.create(axiosConfig);

// 添加请求拦截器
instance.interceptors.request.use(config => {
  if (config.data && config.data.noLogin) {
    delete config.data.noLogin;
  } else {
    config.data.openId = Cookies.get('OPENID')
    config.data.token = Cookies.get('TOKEN')
  }
  console.log(config.data)
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  console.log(response);
  if (response.data.data) {
    response.data.data = optionsToHump(response.data.data);
  }
  return response.data;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
