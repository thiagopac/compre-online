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
import Colors from "@/constants/Colors";

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
          <AntDesign
            name="close"
            size={24}
            color={Colors.productDetails.textColor}
          />
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
                {option.size}
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
            color={Colors.productDetails.buttonText}
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
    backgroundColor: Colors.productDetails.backgroundColor,
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
    color: Colors.productDetails.pageTitleColor,
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
    color: Colors.productDetails.textColor,
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.productDetails.textColor,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  option: {
    backgroundColor: Colors.productDetails.unselectedOptionBackground,
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 5,
    minWidth: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  optionSelected: {
    backgroundColor: Colors.productDetails.selectedOptionBackground,
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 20,
    minWidth: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 18,
    color: Colors.productDetails.unselectedOptionText,
  },
  optionTextSelected: {
    fontSize: 18,
    color: Colors.productDetails.selectedOptionText,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  controlButton: {
    backgroundColor: Colors.productDetails.controlButtonBackground,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    fontSize: 24,
    color: Colors.productDetails.controlTextColor,
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 20,
    color: Colors.productDetails.textColor,
  },
  addToCartButton: {
    backgroundColor: Colors.productDetails.buttonBackground,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: Colors.productDetails.buttonText,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProductDetails;
