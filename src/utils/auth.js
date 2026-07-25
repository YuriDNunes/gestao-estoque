import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
  const token = localStorage.getItem("meu_token_jwt");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.roles ? decoded.roles[0] : null;
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem("meu_token_jwt");
  window.location.href = "/";
};
