import AsyncStorage from "@react-native-async-storage/async-storage";
import Variables from "@/constants/Variables";
import { AuthResponse } from "@/api/types";

export const authenticate = async (): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${Variables.BASE_URL}/erp/api/v2/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Variables.AUTH_CREDENTIALS.id,
        senha: Variables.AUTH_CREDENTIALS.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    const data: AuthResponse = await response.json();
    await AsyncStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    console.error("Error during authentication:", error);
    return null;
  }
};

export const requestAccessCode = async (email: string): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token available, please authenticate first.");
    }

    const response = await fetch(
      `${Variables.BASE_URL}/erp/api/v2/clientes/email/${email}/codigo-de-acesso-app`,
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
