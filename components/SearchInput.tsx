import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearchSubmit = () => {
    router.push({
      pathname: "/SearchResults",
      params: { query: searchText },
    });
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="O que seu pet precisa?"
        placeholderTextColor={"#666"}
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
    width: "100%",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: "100%",
  },
});

export default SearchInput;
