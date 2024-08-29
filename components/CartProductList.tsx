import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Product } from "@/api/types";
import { useCart } from "@/context/CartContext";
import { getAppearanceData } from "@/api/appearanceApi";
import { Appearance } from "@/api/types";
import Loading from "@/components/Loading";

const CartProductList = () => {
  const { cart, removeFromCart } = useCart();
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {cart.map((item, index) => (
        <View key={index} style={styles.productCard}>
          <Image
            source={{ uri: item.product.image }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text
              style={[
                styles.productName,
                { color: appearance.colors.text.primary },
              ]}
            >
              {item.product.name}
            </Text>
            <Text
              style={[
                styles.sizeBadge,
                {
                  backgroundColor:
                    appearance.colors.productList.badgeBackgroundColor,
                  color: appearance.colors.productList.badgeTextColor,
                },
              ]}
            >
              {item.selectedOption.size}
            </Text>
            <Text
              style={[
                styles.productPrice,
                { color: appearance.colors.productList.priceColor },
              ]}
            >
              R$ {item.selectedOption.price}
            </Text>
            <Text style={{ color: appearance.colors.text.primary }}>
              Quantidade: {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => removeFromCart(item.product.id)}
              style={[
                styles.removeButton,
                {
                  backgroundColor:
                    appearance.colors.cart.removeProductButtonBackgroundColor,
                },
              ]}
            >
              <FontAwesome5 name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "4%",
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
    marginTop: 10,
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
    fontWeight: "regular",
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
  },
  removeButton: {
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
  sizeBadge: {
    position: "absolute",
    left: -85,
    bottom: -10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
    borderRadius: 5,
    fontSize: 12,
  },
});

export default CartProductList;
