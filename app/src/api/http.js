import axios from 'axios';
import qs from 'qs';
import config from './config';
import {optionsToHump, optionsToLine} from '../utils/common';

const axiosConfig = {
  baseURL: config.baseURL,
  transformRequest: [data => {
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
  // 在发送请求之前做些什么
  console.log(config.data)
  if (config.data && config.data.noLogin) {
    delete config.data.noLogin;
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  response.data = optionsToHump(response.data);
  return response.data;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
