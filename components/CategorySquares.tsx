import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Category } from "@/api/types";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

interface CategorySquaresProps {
  categories: Category[];
}

const CategorySquares = ({ categories }: CategorySquaresProps) => {
  const router = useRouter();

  const handleCategoryPress = (categoryKey: string) => {
    console.log("Category key:", categoryKey);

    router.push({
      pathname: "/CategoryProducts",
      params: { categoryKey },
    });
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(category.key)}
        >
          <FontAwesome6
            name={category.icon}
            size={30}
            color={Colors.category.textColor}
          />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    backgroundColor: Colors.category.itemBackground,
    borderRadius: 10,
    padding: 10,
    width: 116,
    height: 80,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
});

export default CategorySquares;
