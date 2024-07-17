import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const categories = [
  { id: "1", name: "Cachorro", icon: "dog" },
  { id: "2", name: "Gato", icon: "cat" },
  { id: "3", name: "Pássaros", icon: "crow" },
  { id: "4", name: "Peixes", icon: "fish" },
  { id: "5", name: "Outros Pets", icon: "spider" },
  { id: "6", name: "Casa e Jardim", icon: "sun-plant-wilt" },
];

const CategorySquares = () => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {categories.map((item) => (
          <TouchableOpacity key={item.id} style={styles.categoryItem}>
            <FontAwesome6
              name={item.icon}
              size={30}
              color={Colors["light"].tint}
            />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#fff",
    width: "96%",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
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
    fontWeight: "bold",
  },
});

export default CategorySquares;
