import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { getAppearanceData } from "@/api/appearanceApi";
import { Appearance } from "@/api/types";
import Loading from "@/components/Loading";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [appearance, setAppearance] = useState<Appearance | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const handleLogin = () => {
    router.push("(tabs)");
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appearance.colors.login.backgroundColor },
      ]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: appearance.images.logo.white }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>E-mail ou CPF</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: appearance.colors.login.inputBorderColor },
          ]}
          placeholder="Digite seu e-mail ou CPF"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: appearance.colors.login.inputBorderColor },
          ]}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text
            style={[
              styles.forgotPassword,
              { color: appearance.colors.login.linkColor },
            ]}
          >
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: appearance.colors.login.buttonBackground },
          ]}
          onPress={handleLogin}
        >
          <Text
            style={[
              styles.loginButtonText,
              { color: appearance.colors.login.textColor },
            ]}
          >
            Entrar
          </Text>
        </TouchableOpacity>
        <Text style={styles.orText}>ou</Text>
        <TouchableOpacity
          style={[
            styles.guestButton,
            { borderColor: appearance.colors.login.buttonBackground },
          ]}
          onPress={() => router.push("(tabs)")}
        >
          <Text
            style={[
              styles.guestButtonText,
              { color: appearance.colors.login.buttonBackground },
            ]}
          >
            Entrar sem conta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={[
              styles.createAccount,
              { color: appearance.colors.login.linkColor },
            ]}
          >
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 60,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 16,
  },
  loginButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  guestButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  guestButtonText: {
    fontSize: 16,
  },
  createAccount: {
    textAlign: "center",
  },
});
