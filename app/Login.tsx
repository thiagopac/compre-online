import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { getAppearanceData } from "@/api/appearanceApi";
import { requestAccessCode, validateCode } from "@/api/clientApi";
import { Appearance } from "@/api/types";
import Loading from "@/components/Loading";
import { AntDesign } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [appearance, setAppearance] = useState<Appearance | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const handleLogin = async () => {
    setIsRequesting(true);
    try {
      await requestAccessCode(email);
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao solicitar o código de acesso:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleValidateCode = async () => {
    setIsValidating(true);
    try {
      const isValid = await validateCode(email, code);
      if (isValid) {
        console.log("Código validado com sucesso!");
        setModalVisible(false);
        router.push("(tabs)");
      } else {
        console.error("Código inválido.");
      }
    } catch (error) {
      console.error("Erro ao validar o código:", error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleResendCode = async () => {
    setIsRequesting(true);
    try {
      await requestAccessCode(email);
      console.log("Código reenviado com sucesso.");
    } catch (error) {
      console.error("Erro ao reenviar o código:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            styles.innerContainer,
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
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: appearance.colors.login.buttonBackground },
              ]}
              onPress={handleLogin}
              disabled={isRequesting}
            >
              <Text
                style={[
                  styles.loginButtonText,
                  { color: appearance.colors.login.textColor },
                ]}
              >
                {isRequesting
                  ? "Enviando código..."
                  : "Enviar código para e-mail"}
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseModal}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
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
                      {
                        backgroundColor:
                          appearance.colors.login.buttonBackground,
                      },
                    ]}
                    onPress={handleValidateCode}
                    disabled={isValidating}
                  >
                    <Text
                      style={[
                        styles.loginButtonText,
                        { color: appearance.colors.login.textColor },
                      ]}
                    >
                      {isValidating ? "Validando..." : "Validar código"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.resendText}>
                      Reenviar código para e-mail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
    color: "#007BFF",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
