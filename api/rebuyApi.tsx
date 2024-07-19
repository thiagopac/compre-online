import { RebuyData } from "./types";

const BASE_URL = "https://compras-online.wiremockapi.cloud";

export const fetchRebuyData = async (): Promise<RebuyData | null> => {
  try {
    const response = await fetch(`${BASE_URL}/rebuy`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: RebuyData = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return null;
  }
};
