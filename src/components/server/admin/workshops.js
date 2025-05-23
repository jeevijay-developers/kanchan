import apiClient from "../config";

// Add a new workshop
export const addNewWorkshop = async (workshop) => {
  try {
    const response = await apiClient.post(
      `/api/v1/workshops/add/workshop`,
      workshop,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateWorkshopCategoryName = async (id, name) => {
  try {
    const response = await apiClient.put(
      `/api/v1/workshops/update/category/${id}`,
      name
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteWorkshopCategory = async (id) => {
  try {
    const response = await apiClient.delete(
      `/api/v1/workshops/delete/category/${id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllWorkshopCategories = async () => {
  try {
    const response = await apiClient.get(`/api/v1/workshops/get/category`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createnewCategory = async (name) => {
  try {
    const response = await apiClient.post(
      `/api/v1/workshops/add/category`,
      name
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// export const addWor

// Get all workshops
export const getAllWorkshops = async () => {
  try {
    const response = await apiClient.get(`/api/v1/workshops/get/workshops`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Get workshop by ID
export const getWorkshopById = async (id) => {
  try {
    const response = await apiClient.get(`/api/v1/workshops/get/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getWorkshopsByCateById = async (id) => {
  try {
    const response = await apiClient.get(
      `/api/v1/workshops/get-by-category/${id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Update workshop
export const updateWorkshop = async (id, formData) => {
  try {
    const response = await apiClient.put(
      `/api/v1/workshops/update/${id}`,
      formData
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateWorkshopImage = async (id, formData) => {
  try {
    const response = await apiClient.put(
      `/api/v1/workshops/update-image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

// Delete workshop
export const deleteWorkshopById = async (id) => {
  try {
    const response = await apiClient.delete(`/api/v1/workshops/delete/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
