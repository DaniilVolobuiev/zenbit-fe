const api = process.env.REACT_APP_SERVER_API_DEV;

export const API_URLS = {
  signUp: `${api}auth/registration`,
  login: `${api}auth/login`,
  base: api,
};
