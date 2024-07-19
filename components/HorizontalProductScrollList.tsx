import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Product } from "@/api/types";

interface HorizontalProductScrollListProps {
  title: string;
  data: Product[];
}

const HorizontalProductScrollList = ({
  title,
  data,
}: HorizontalProductScrollListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
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
    backgroundColor: "#fff",
    paddingLeft: "4%",
  },
  title: {
    fontSize: 20,
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
    borderColor: "#dfdfdf",
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
    overflow: "hidden",
    borderRadius: 5,
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
