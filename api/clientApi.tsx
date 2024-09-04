import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "@/api/types";
import Variables from "@/constants/Variables";
import MockVariables from "@/constants/MockVariables";

const variables = MockVariables;

export const requestAccessCode = async (email: string): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token available, please authenticate first.");
    }

    const response = await fetch(
      `${variables.BASE_URL}/erp/api/v2/clientes/email/${email}/codigo-de-acesso-app`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to request access code");
    }

    console.log("Access code requested successfully");
  } catch (error) {
    console.error("Error requesting access code:", error);
  }
};

export const validateCode = async (
  email: string,
  codigoDeAcesso: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${variables.BASE_URL}/erp/api/v2/clientes/auth-app`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigoDeAcesso,
          email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to validate access code");
    }

    const data: AuthResponse = await response.json();
    await AsyncStorage.setItem("clientToken", data.token);
    console.log("Client token saved:", data.token);

    return true;
  } catch (error) {
    console.error("Error validating access code:", error);
    return false;
  }
};
