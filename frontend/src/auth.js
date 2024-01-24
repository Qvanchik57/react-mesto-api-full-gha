const checkResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res}`)
}

export const BASE_URL = 'https://api.sergey.nomoredomainsmonster.ru/';

export const register = (password, email) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
  .then((data) => {
    if (data){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((response) => {
        checkResponse(response)
      })
      .then(data => data)
      .catch(err => console.log(err))
}