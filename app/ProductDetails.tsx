import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Product, ProductOption } from "@/api/types";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: Product;
  closeModal?: () => void;
}

const ProductDetails = ({ product, closeModal }: ProductDetailsProps) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<ProductOption>(
    product.options[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    closeModal?.();
  };

  return (
    <View style={styles.modalOverlay}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Detalhes do Produto</Text>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>R$ {selectedOption.price}</Text>
        <View style={styles.optionsContainer}>
          {product.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedOption === option
                  ? styles.optionSelected
                  : styles.option
              }
              onPress={() => setSelectedOption(option)}
            >
              <Text
                style={
                  selectedOption === option
                    ? styles.optionTextSelected
                    : styles.optionText
                }
              >
                {option.weight}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <FontAwesome6
            name="cart-plus"
            size={18}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addToCartText}>Adicionar à sacola</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 30,
  },
  name: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  option: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 5,
  },
  optionSelected: {
    backgroundColor: "black",
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 20,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
  },
  optionTextSelected: {
    fontSize: 18,
    color: "white",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  controlButton: {
    backgroundColor: "#ddd",
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    fontSize: 24,
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 20,
  },
  addToCartButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProductDetails;
