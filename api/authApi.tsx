import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "./types";
import Variables from "@/constants/Variables";

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
