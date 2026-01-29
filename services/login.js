import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "https://coupon.doctutorials.com";

export const loginApi = async (email, password) => {
  try {
    const params = new URLSearchParams();
    params.append("userID", email);
    params.append("password", password);

    const response = await axios.post(`${BASE_URL}/curl_login.php`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const data = response.data;

    if (data.status !== "Y") {
      throw new Error(data.message || "Login failed");
    }

    if (!data.admin || data.admin.length === 0) {
      throw new Error("Admin data missing in response");
    }

    const adminRaw = data.admin[0];

    // Normalize keys to avoid ReferenceErrors
    const adminData = {
      adminId: adminRaw.adminID,
      email: adminRaw.adminEmail,
      role: adminRaw.adminRole,
      name: adminRaw.name,
      collegeId: adminRaw.collegeId,
      collegeName: adminRaw.collegeName,
      collegeLogo: adminRaw.collegeLogo,
      modules: adminRaw.moduleList,
      firstTimeLoggedIn: adminRaw.firstTimeLoggedIn,
      mobileNo: adminRaw.mobileNo,
      lastSignInDateTime: adminRaw.lastSignInDateTime,
      createUser: adminRaw.createUser,
      changeUser: adminRaw.changeUser,
      serreqid: data.serreqid,

    };

    await AsyncStorage.setItem("longbowsp", JSON.stringify(adminData));
    return adminData;
  } catch (error) {
    const msg = error.response?.data?.message || error.message || "Login failed";
    throw new Error(msg);
  }
};
