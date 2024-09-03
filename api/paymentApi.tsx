import { PaymentMode } from "./types";

const BASE_URL = "https://compras-online.wiremockapi.cloud";

export const fetchRebuyData = async (): Promise<PaymentMode | null> => {
    try {
      const response = await fetch(`${BASE_URL}/payment-mode`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: PaymentMode = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch home data:", error);
      return null;
    }
  };
  