import React from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import CartProductList from "@/components/CartProductList";
import { useCart } from "@/context/CartContext";

const TabCartScreen = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <CartProductList />
        <View style={styles.buttonContainer}>
          <Button title="Esvaziar Carrinho" onPress={clearCart} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default TabCartScreen;
