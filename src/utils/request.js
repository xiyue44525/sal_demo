import axios from 'axios';

//AXIOS 对象的创建
const request = axios.create({
    baseURL: 'http://localhost:8085/api',
    timeout: 5000
});

//请求拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';

    const user = localStorage.getItem('user');
    if (user) {
        config.headers['token'] = JSON.parse(user).token;
    }
    // config.headers['Authorization'] = 'Bearer '// 这里可以设置请求头
    return config;
}, error => {
    return Promise.reject(error);
});

//响应拦截器
request.interceptors.response.use(response => {
    let res = response.data;
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }
        return res;
},
    error => {
    console.log('err'+ error);// for debug
    return Promise.reject(error);
});

export default request;