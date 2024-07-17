import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import SearchInput from "@/components/SearchInput";
import React from "react";
import CategorySquares from "@/components/CategorySquares";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <SearchInput />
      <CategorySquares />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
