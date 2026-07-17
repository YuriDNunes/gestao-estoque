const API_URL = "http://localhost:8080/api/user";

export const fetchUsers = async () => {
  const token = localStorage.getItem("meu_token_jwt");
  const response = await fetch(`${API_URL}?role=Usuário`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar usuários");
  return response.json();
};

export const createUser = async (userData) => {
  const token = localStorage.getItem("meu_token_jwt");
  const response = await fetch(API_URL, {
    method: "POST",

    body: JSON.stringify({
      register: userData.register,
      name: userData.name,
      email: userData.email,
      password: "mock",
      access: true,
      role: "Usuário",
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao criar usuário");
  return response.json();
};

export const updateUser = async (id, userData) => {
  const token = localStorage.getItem("meu_token_jwt");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    body: JSON.stringify({
      register: userData.register,
      name: userData.name,
      email: userData.email,
      password: "mock",
      access: true,
      role: "Usuário",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao atualizar usuário");
  return response;
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("meu_token_jwt");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao deletar usuário");
  return response;
};
