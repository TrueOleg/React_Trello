import axios from 'axios';

export function authenticate () {
      const token = localStorage.getItem('token');
      if (token) {
        this.get('/api/auth')
        .then(res=>{
  
        }).catch(res=>{
          document.location.replace('/');
        })
      } else {
        document.location.replace('/');
      }
    };

    export function headers (options, method) {
      options.headers =  options.headers || {};
      options.headers.Authorization = localStorage.getItem('token');
      options.method = method;
      return options;
    };

    export function get (url, options = {}) {
      this.headers(options, 'GET');
      return axios.get(url, options);
    };

    export function post (url, data, options = {}) {
      this.headers(options, 'POST');
      return axios.post(url, data, options);
    };
    
    export function del (url, options = {}) {
      this.headers(options, 'DELETE');
      return axios.delete(url, options);
    };
      
    export function put(url, data, options = {}) {
      this.headers(options, 'PUT');
      return axios.put(url, data, options);
    };
  

