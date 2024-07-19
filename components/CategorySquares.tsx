import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Category } from "@/api/types";
import Colors from "@/constants/Colors";

interface CategorySquaresProps {
  categories: Category[];
}

const CategorySquares = ({ categories }: CategorySquaresProps) => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryItem}>
          <FontAwesome6
            name={category.icon}
            size={30}
            color={Colors["light"].tint}
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
    backgroundColor: "#f0f0f0",
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
