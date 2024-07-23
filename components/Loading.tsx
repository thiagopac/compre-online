import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import Colors from "@/constants/Colors";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.button.tint} />
      <Text style={styles.loadingText}>Carregando...</Text>
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
    color: Colors.text.primary,
  },
});

export default Loading;
