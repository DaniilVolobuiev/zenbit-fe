const api = import.meta.env.VITE_REACT_APP_SERVER_API_DEV;

export const API_URLS = {
  signUp: `${api}auth/registration`,
  checkEmail: `${api}auth/checkEmail`,
  forgotPassword: `${api}auth/forgotPassword`,
  resetPassword: `${api}auth/resetPassword`,
  createPatient: `${api}patient`,
  login: `${api}auth/login`,
  activation: (link: string) => `${api}auth/activation/${link}`,
  base: api,
};
