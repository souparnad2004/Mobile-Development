import axios from "axios";

export const api = axios.create({
  baseURL: "https://dummyjson.com/recipes",
  timeout: 5000,
});

export const getRecipes = async (limit = 10, skip = 0) => {
  const res = await api.get(`?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const searchRecipes = async (query: string) => {
  const res = await api.get(`/search?q=${query}`);
  return res.data;
};

export const getRecipeById = async (id: number | string) => {
  const res = await api.get(`/${id}`);
  return res.data;
};

export const getTags = async () => {
  const res = await api.get(`/tags`);
  return res.data;
};

export const getRecipesByTag = async (tag: string) => {
  const res = await api.get(`/tag/${tag}`);
  return res.data;
};

export const getRecipesByMeal = async (meal: string) => {
  const res = await api.get(`/meal-type/${meal}`);
  return res.data;
};

export const getSortedRecipes = async (
  sortBy: string,
  order: "asc" | "desc" = "asc"
) => {
  const res = await api.get(`?sortBy=${sortBy}&order=${order}`);
  return res.data;
};