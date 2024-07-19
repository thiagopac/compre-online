import { StoreData } from "./types";

const BASE_URL = "https://compras-online.wiremockapi.cloud";

export const fetchStoreData = async (): Promise<StoreData | null> => {
  try {
    const response = await fetch(`${BASE_URL}/store`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: StoreData = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return null;
  }
};
