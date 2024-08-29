import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { getAppearanceData } from "@/api/appearanceApi";
import { Appearance } from "@/api/types";

const Loading = () => {
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  if (!appearance) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appearance.colors.login.backgroundColor },
      ]}
    >
      <ActivityIndicator size="large" color={appearance.colors.button.tint} />
      <Text
        style={[styles.loadingText, { color: appearance.colors.text.primary }]}
      >
        Carregando...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
});

export default Loading;
