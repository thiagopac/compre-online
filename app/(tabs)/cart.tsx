import React from "react";
import { StyleSheet, FlatList, View, Text, Button } from "react-native";
import CartProductList from "@/components/CartProductList";
import { useCart } from "@/context/CartContext";

export default function TabCartScreen() {
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
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartProductList title="" data={[item]} />}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
      <View style={styles.buttonContainer}>
        <Button title="Esvaziar Carrinho" onPress={clearCart} />
      </View>
    </View>
  );
}

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
  flatList: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#dfdfdf",
  },
});
