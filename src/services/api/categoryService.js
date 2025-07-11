import categoriesData from "@/services/mockData/categories.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(300);
    return [...categoriesData];
  },

  async getById(id) {
    await delay(200);
    const category = categoriesData.find((cat) => cat.Id === parseInt(id));
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(400);
    const newCategory = {
      Id: Math.max(...categoriesData.map((cat) => cat.Id)) + 1,
      ...categoryData,
    };
    categoriesData.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(400);
    const index = categoriesData.findIndex((cat) => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    categoriesData[index] = { ...categoriesData[index], ...categoryData };
    return { ...categoriesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = categoriesData.findIndex((cat) => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Category with ID ${id} not found`);
    }
    const deletedCategory = categoriesData.splice(index, 1)[0];
    return { ...deletedCategory };
  },
};