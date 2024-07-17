import React from "react";
import { StyleSheet, FlatList } from "react-native";
import VerticalProductList from "@/components/VerticalProductList";

export default function TabRebuyScreen() {
  const placeholderData = [{}];
  return (
    <FlatList
      data={placeholderData}
      renderItem={null}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={VerticalProductList}
      style={styles.flatList}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  flatList: {
    flex: 1,
  },
});
