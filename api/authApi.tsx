import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthResponse } from "./types";
import Variables from "@/constants/Variables";
import MockVariables from "@/constants/MockVariables";

const variables = MockVariables;

export const authenticate = async (): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${variables.BASE_URL}/erp/api/v2/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: variables.AUTH_CREDENTIALS.id,
        senha: variables.AUTH_CREDENTIALS.password,
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
