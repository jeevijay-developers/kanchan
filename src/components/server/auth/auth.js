import axios from "axios";
// import apiClient from "../axiosConfig";

export const registerUser = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
      user
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const loginHandler = async (login) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
      login
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const otpGenerator = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/send-otp`,
      email
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const verifyOtp = async (verify) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verify-otp`,
      verify
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const addNewUserPassword = async (reset) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/reset-password`,
      reset
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
