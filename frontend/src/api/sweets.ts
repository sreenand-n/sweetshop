import api from "./axios";

export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export const getSweets = async (): Promise<Sweet[]> => {
  const res = await api.get<Sweet[]>("/sweets");
  return res.data;
};

export const searchSweets = async (params: {
  name?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
}): Promise<Sweet[]> => {
  const res = await api.get<Sweet[]>("/sweets/search", { params });
  return res.data;
};

export const createSweet = async (data: Omit<Sweet, "id">) => {
  const res = await api.post("/sweets", data);
  return res.data;
};

export const updateSweet = async (
  id: number,
  data: Partial<Sweet>
) => {
  const res = await api.put(`/sweets/${id}`, data);
  return res.data;
};

export const deleteSweet = async (id: number) => {
  await api.delete(`/sweets/${id}`);
};

export const purchaseSweet = async (id: number) => {
  const res = await api.post(`/sweets/${id}/purchase`);
  return res.data;
};

export const restockSweet = async (id: number, amount: number) => {
  const res = await api.post(`/sweets/${id}/restock`, null, {
    params: { amount },
  });
  return res.data;
};
