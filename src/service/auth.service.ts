import { api } from './api';
import { UserRegister } from '../models/UserRegister';

// register
export const register = (userRegister: UserRegister) => {
  return api.post('/auth/signup', JSON.stringify(userRegister), {
    headers: {
      "Content-Type": "application/json"
    }
  }
  );
};

// login
export const login = (username: string, password: string) => {
  return api
    .post('/auth/signin', {
      username,
      password,
    },{
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response)
      }

      return response.data;
    });
};
