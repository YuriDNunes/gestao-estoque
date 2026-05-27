const API_URL = "http://localhost:8080/api/user";

export const fetchManagers = async () => {
  const response = await fetch(`${API_URL}?role=Gestor`);
  if (!response.ok) throw new Error("Erro ao buscar gestores");
  return response.json();
};

export const createManagers = async (managerData) => {
  const response = await fetch(API_URL, {
    method: "POST",

    body: JSON.stringify({
      register: managerData.register,
      name: managerData.name,
      email: managerData.email,
      password: "mock",
      access: true,
      role: "Gestor",
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!response.ok) throw new Error("Erro ao criar gestor");
  return response.json();
};

export const updateManager = async (id, managerData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    body: JSON.stringify({
      register: managerData.register,
      name: managerData.name,
      email: managerData.email,
      password: "mock",
      access: true,
      role: "Gestor",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!response.ok) throw new Error("Erro ao atualizar gestor");
  return response;
};

export const deleteManager = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Erro ao deletar gestor");
  return response;
};

export const toggleManagerAccess = async (id, access) => {
  const response = await fetch(`${API_URL}/${id}/access`, {
    method: "PATCH",
    body: JSON.stringify({ access }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Erro ao atualizar acesso do gestor");
  return response.json();
};
