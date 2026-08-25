const API_URL = "http://localhost:8080/api/history";

export const getHistory = async () => {
  const token = localStorage.getItem("meu_token_jwt");

  const response = await fetch(API_URL, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar histórico");
  }
  return response.json();
};
