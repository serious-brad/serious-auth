import axi from "../http";

export async function login(email, password) {
  try {
    const res = await axi.post('/login', {
      email, password
    });

    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

export async function register(user) {
  try {
    const res = await axi.post('/users', user);

    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

export async function refresh() {
  try {
    const res = await axi.post('/refresh');

    localStorage.setItem('token', res.data.accessToken);

    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

export async function logout() {
  try {
    const res = await axi.post('/logout');

    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

export async function getUsers() {
  try {
    const response = await axi.get('/users');

    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
}
