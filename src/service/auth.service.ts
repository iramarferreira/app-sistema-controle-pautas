import {api} from './api';

// register
export const register = (username: string, email: string, role: [], password: string) => {
    return api.post('/auth/signup', {
      username,
      email,
      role,
      password,
    });
  };

// login
export const login = (username: string, password: string) => {
    return api
      .post('/auth/signin', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          console.log(response)
        }
  
        return response.data;
      });
  };
  