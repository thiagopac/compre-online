import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Product } from "@/api/types";

interface VerticalProductListProps {
  title: string;
  data: Product[];
}

const VerticalProductList = ({ title, data }: VerticalProductListProps) => {
  return (
    <View style={styles.container}>
      {title && title.length > 0 && <Text style={styles.title}>{title}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
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
    fontSize: 20,
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
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: -10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
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
});

export default VerticalProductList;
