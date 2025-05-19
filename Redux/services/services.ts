import { axiosClient } from "../../Constants/axiosClient";

export const getTimingData = async () => {
  try {
    const response = await axiosClient.get(
      `api/sample`
    );
    return response;
  } catch (error) {
    return error;
  }
};

