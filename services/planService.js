import axios from "axios";

const BASE_URL = "https://svcp.doctutorials.com";

export const fetchPlans = async (adminId, courseId) => {
  try {
    if (!adminId) {
      throw new Error("Admin ID is missing. Please login again.");
    }

    const payload = {
      adminId: Number(adminId),
      courseId: String(courseId), // important: send as string
    };

    const response = await axios.post(`${BASE_URL}/salesPartnerCoupon`, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Serreqid": "/getAllPlans", // must be here
      },
    });

    const data = response.data;

    if (!data || data.status === "N") {
      throw new Error(data?.message || "Failed to fetch plans");
    }

    return data.plans || [];
  } catch (error) {
    throw error;
  }
};
