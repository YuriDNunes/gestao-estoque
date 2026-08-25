const API_URL = "http://localhost:8080/api/allocation";

export const allocateProduct = async (allocationData) => {
  const token = localStorage.getItem("meu_token_jwt");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      targetUserId: allocationData.targetUserId,
      productId: allocationData.productId,
      quantity: allocationData.quantity,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Quantidade insuficiente no estoque");
  }
  return response;
};

export const getAllocatedProducts = async () => {
  const token = localStorage.getItem("meu_token_jwt");

  const response = await fetch(API_URL, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Erro ao buscar produtos alocados");
  return response.json();
};

export const returnAllocatedProduct = async (allocationId, quantity) => {
  const token = localStorage.getItem("meu_token_jwt");

  const response = await fetch(`${API_URL}/${allocationId}/return`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Erro ao devolver o produto");
  }

  return response;
};
