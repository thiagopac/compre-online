import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const products = [
  {
    id: "1",
    name: "Ração Golden para Cães Adultos Sabor Frango",
    price: "R$ 134,99",
    priceOld: "R$ 149,99",
    image: require("@/assets/images/mock/dog-food.jpg"),
    weight: "20 kg",
  },
  {
    id: "2",
    name: "Ração Golden para Gatos Adultos Sabor Carne",
    price: "R$ 141,21",
    priceOld: "R$ 159,99",
    image: require("@/assets/images/mock/cat-food.jpg"),
    weight: "10,1 kg",
  },
  {
    id: "3",
    name: "Ração para Peixes Tropical",
    price: "R$ 25,99",
    priceOld: "R$ 29,99",
    image: require("@/assets/images/mock/fish-food.jpg"),
    weight: "5 kg",
  },
  {
    id: "4",
    name: "Ração Mega Zoo para Iguana",
    price: "R$ 102,99",
    priceOld: "R$ 119,99",
    image: require("@/assets/images/mock/iguana-food.jpg"),
    weight: "15 kg",
  },
];

const VerticalProductList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossa linha exclusiva</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.weightBadge}>{item.weight}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.prices}>
                <Text style={styles.productPriceOld}>{item.priceOld}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <FontAwesome5 name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "4%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    flexDirection: "row",
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dfdfdf",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 5,
  },
  weightBadge: {
    position: "absolute",
    left: -85,
    bottom: -10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
    borderRadius: 5,
    fontSize: 12,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: -10,
  },
  productName: {
    fontSize: 16,
  },
  prices: {
    flexDirection: "column",
  },
  productPriceOld: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#999",
  },
  productPrice: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    bottom: -10,
  },
});

export default VerticalProductList;
