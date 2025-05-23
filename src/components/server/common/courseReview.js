import apiClient from "../config";

export const addCourseReview = async (courseId, review) => {
  try {
    const response = await apiClient.post(
      `/api/v1/review/course/post/course-reviews/${courseId}`,
      review
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const addQueryFromUser = async (object) => {
  try {
    const response = await apiClient.post(`/api/v1/query/query-user`, object);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getQueryById = async (id) => {
  try {
    const response = await apiClient.get(`/api/v1/query/query-user/${id}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAllQueries = async () => {
  try {
    const response = await apiClient.get(`/api/v1/query/query-users`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const createBookingRequest = async (formData) => {
  try {
    const response = await apiClient.post(
      `/api/v1/booking/book-event`,
      formData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAllBookings = async (formData) => {
  try {
    const response = await apiClient.get(`/api/v1/booking/all-bookings`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
