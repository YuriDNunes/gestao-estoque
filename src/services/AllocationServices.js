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
      userId: allocationData.userId,
      productId: allocationData.productId,
      quantity: allocationData.quantity,
    }),
  });

  if (!response.ok) throw new Error("Erro ao alocar produto");
  return response;
};
