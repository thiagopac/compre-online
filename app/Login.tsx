import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { getAppearanceData } from "@/api/appearanceApi";
import { Appearance } from "@/api/types";
import Loading from "@/components/Loading";
import { AntDesign } from '@expo/vector-icons'; // Importando o ícone da biblioteca expo/vector-icons

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
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
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleValidateCode = () => {
    console.log("Código digitado:", code);
    handleCloseModal();
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
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: appearance.colors.login.inputBorderColor },
          ]}
          keyboardType="email-address"
          placeholder="Digite seu e-mail"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
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
            Enviar código para e-mail
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Botão de fechar no canto superior direito */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.label}>Digite o código recebido:</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: appearance.colors.login.inputBorderColor },
              ]}
              placeholder="Código"
              keyboardType="numeric"
              value={code}
              onChangeText={setCode}
            />

            <TouchableOpacity
              style={[
              styles.loginButton,
                { backgroundColor: appearance.colors.login.buttonBackground },
                ]}
                onPress={handleValidateCode}
              >
              <Text
              style={[
                styles.loginButtonText,
                { color: appearance.colors.login.textColor },
              ]}
              >
              Validar código
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Reenviar código")}>
              <Text style={styles.resendText}>Reenviar código para e-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  loginButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 200,
  },
  resendText: {
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});