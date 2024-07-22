// app/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import Images from "@/constants/Images";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    router.push("(tabs)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={Images.logo.white}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>E-mail ou CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail ou CPF"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>ou</Text>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => router.push("(tabs)")}
        >
          <Text style={styles.guestButtonText}>Entrar sem conta</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.createAccount}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.login.backgroundColor,
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
    borderColor: Colors.login.inputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  forgotPassword: {
    color: Colors.login.linkColor,
    textAlign: "right",
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: Colors.login.buttonBackground,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: Colors.login.textColor,
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  guestButton: {
    borderColor: Colors.login.buttonBackground,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  guestButtonText: {
    color: Colors.login.buttonBackground,
    fontSize: 16,
  },
  createAccount: {
    color: Colors.login.linkColor,
    textAlign: "center",
  },
});
