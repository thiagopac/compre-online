import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import SearchInput from "@/components/SearchInput";
import CategorySquares from "@/components/CategorySquares";
import HorizontalProductScrollList from "@/components/HorizontalProductScrollList";
import VerticalProductList from "@/components/VerticalProductList";

const ListHeader = () => (
  <View style={styles.container}>
    <SearchInput />
    <CategorySquares />
    <HorizontalProductScrollList />
  </View>
);

export default function TabStoreScreen() {
  const placeholderData = [{}];
  return (
    <FlatList
      ListHeaderComponent={ListHeader}
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
