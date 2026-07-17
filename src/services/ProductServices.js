const API_URL = "http://localhost:8080/api/product";

export const fetchProducts = async () => {
  const token = localStorage.getItem("meu_token_jwt");

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return response.json();
};

export const createProduct = async (productData) => {
  const token = localStorage.getItem("meu_token_jwt");

  const response = await fetch(API_URL, {
    method: "POST",

    body: JSON.stringify({
      code: productData.code,
      name: productData.name,
      quantity: productData.quantity,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }
  return response.json();
};

export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("meu_token_jwt");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",

    body: JSON.stringify({
      code: productData.code,
      name: productData.name,
      quantity: productData.quantity,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }
  return response;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("meu_token_jwt");
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao deletar produto");
  return response;
};
