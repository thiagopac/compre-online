import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Product, ProductOption, Appearance } from "@/api/types";
import { useCart } from "@/context/CartContext";
import { getAppearanceData } from "@/api/appearanceApi";
import Loading from "@/components/Loading";

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
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOption);
    closeModal?.();
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View style={styles.modalOverlay}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: appearance.colors.productDetails.backgroundColor },
        ]}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign
            name="close"
            size={24}
            color={appearance.colors.productDetails.textColor}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.pageTitle,
            { color: appearance.colors.productDetails.pageTitleColor },
          ]}
        >
          Detalhes do Produto
        </Text>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text
          style={[
            styles.name,
            { color: appearance.colors.productDetails.textColor },
          ]}
        >
          {product.name}
        </Text>
        <Text
          style={[
            styles.price,
            { color: appearance.colors.productDetails.textColor },
          ]}
        >
          R$ {selectedOption.price}
        </Text>
        <View style={styles.optionsContainer}>
          {product.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={
                selectedOption === option
                  ? [
                      styles.optionSelected,
                      {
                        backgroundColor:
                          appearance.colors.productDetails
                            .selectedOptionBackground,
                      },
                    ]
                  : [
                      styles.option,
                      {
                        backgroundColor:
                          appearance.colors.productDetails
                            .unselectedOptionBackground,
                      },
                    ]
              }
              onPress={() => setSelectedOption(option)}
            >
              <Text
                style={
                  selectedOption === option
                    ? [
                        styles.optionTextSelected,
                        {
                          color:
                            appearance.colors.productDetails.selectedOptionText,
                        },
                      ]
                    : [
                        styles.optionText,
                        {
                          color:
                            appearance.colors.productDetails
                              .unselectedOptionText,
                        },
                      ]
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
            style={[
              styles.controlButton,
              {
                backgroundColor:
                  appearance.colors.productDetails.controlButtonBackground,
              },
            ]}
          >
            <Text
              style={{
                color: appearance.colors.productDetails.controlTextColor,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.quantityText,
              { color: appearance.colors.productDetails.textColor },
            ]}
          >
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={[
              styles.controlButton,
              {
                backgroundColor:
                  appearance.colors.productDetails.controlButtonBackground,
              },
            ]}
          >
            <Text
              style={{
                color: appearance.colors.productDetails.controlTextColor,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            {
              backgroundColor:
                appearance.colors.productDetails.buttonBackground,
            },
          ]}
          onPress={handleAddToCart}
        >
          <FontAwesome6
            name="cart-plus"
            size={18}
            color={appearance.colors.productDetails.buttonText}
            style={{ marginRight: 8 }}
          />
          <Text
            style={[
              styles.addToCartText,
              { color: appearance.colors.productDetails.buttonText },
            ]}
          >
            Adicionar à sacola
          </Text>
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
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  option: {
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 5,
    minWidth: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  optionSelected: {
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
  },
  optionTextSelected: {
    fontSize: 18,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 20,
  },
  addToCartButton: {
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProductDetails;
