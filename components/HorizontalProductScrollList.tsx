import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Ração Golden para Cães Adultos Sabor Frango",
    price: "R$ 134,99",
    image: require("@/assets/images/mock/dog-food.jpg"),
    weight: "20 kg",
  },
  {
    id: "2",
    name: "Ração Golden para Gatos Adultos Sabor Carne",
    price: "R$ 141,21",
    image: require("@/assets/images/mock/cat-food.jpg"),
    weight: "10,1 kg",
  },
  {
    id: "3",
    name: "Ração para Peixes Tropical",
    price: "R$ 25,99",
    image: require("@/assets/images/mock/fish-food.jpg"),
    weight: "5 kg",
  },
  {
    id: "4",
    name: "Ração Mega Zoo para Iguana",
    price: "R$ 102,99",
    image: require("@/assets/images/mock/iguana-food.jpg"),
    weight: "15 kg",
  },
];

const HorizontalProductScrollList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comprados ou vistos recentemente</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.imageWrapper}>
              <Image source={product.image} style={styles.productImage} />
            </View>
            <TouchableOpacity style={styles.addButton}>
              <FontAwesome5 name="plus" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.weightBadge}>{product.weight}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    flexDirection: "row",
  },
  productCard: {
    width: 160,
    height: 270,
    marginRight: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingBottom: 30,
  },
  imageWrapper: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 5,
  },
  addButton: {
    position: "absolute",
    right: 6,
    bottom: 80,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  weightBadge: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
  productName: {
    fontSize: 12,
    textAlign: "left",
    marginTop: 5,
    width: "100%",
    marginLeft: 6,
  },
  productPrice: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
    marginLeft: 6,
  },
});

export default HorizontalProductScrollList;
