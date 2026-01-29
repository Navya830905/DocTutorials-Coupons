import axios from "axios";

const BASE_URL = "https://svcp.doctutorials.com";

export const fetchSalesPartnerCoupon = async (adminId) => {
  try {
    const payload = { adminId: Number(adminId) }; // ✅ must be a number

    const response = await axios.post(`${BASE_URL}/salesPartnerCoupon`, payload, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "serreqid": "/dashBoardService",
        "X-Requested-With": "XMLHttpRequest", 
      },
    });

    const data = response.data;

    if (data.status !== "Y") {
      throw new Error(data.message || "Failed to fetch dashboard");
    }

    return data;
  } catch (err) {
    throw err;
  }
};
