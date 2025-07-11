import templatesData from "@/services/mockData/templates.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const templateService = {
  async getAll() {
    await delay(300);
    return [...templatesData];
  },

  async getById(id) {
    await delay(200);
    const template = templatesData.find((temp) => temp.Id === parseInt(id));
    if (!template) {
      throw new Error(`Template with ID ${id} not found`);
    }
    return { ...template };
  },

  async getByCategoryId(categoryId) {
    await delay(300);
    return templatesData
      .filter((template) => template.categoryId === parseInt(categoryId))
      .map((template) => ({ ...template }));
  },

  async create(templateData) {
    await delay(400);
    const newTemplate = {
      Id: Math.max(...templatesData.map((temp) => temp.Id)) + 1,
      ...templateData,
    };
    templatesData.push(newTemplate);
    return { ...newTemplate };
  },

  async update(id, templateData) {
    await delay(400);
    const index = templatesData.findIndex((temp) => temp.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Template with ID ${id} not found`);
    }
    templatesData[index] = { ...templatesData[index], ...templateData };
    return { ...templatesData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = templatesData.findIndex((temp) => temp.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Template with ID ${id} not found`);
    }
    const deletedTemplate = templatesData.splice(index, 1)[0];
    return { ...deletedTemplate };
  },
};