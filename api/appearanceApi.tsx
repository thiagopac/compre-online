import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://compras-online.wiremockapi.cloud";

export const fetchAppearanceData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/appearance`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    await AsyncStorage.setItem("appearanceData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to fetch appearance data:", error);
    return null;
  }
};

export const getAppearanceData = async () => {
  const storedData = await AsyncStorage.getItem("appearanceData");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return fetchAppearanceData();
  }
};
