import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Product, Appearance } from "@/api/types";
import { getAppearanceData } from "@/api/appearanceApi";
import ProductDetails from "@/app/ProductDetails";
import Loading from "@/components/Loading";

interface HorizontalProductScrollListProps {
  title: string;
  data: Product[];
}

const HorizontalProductScrollList = ({
  title,
  data,
}: HorizontalProductScrollListProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appearance.colors.productList.backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: appearance.colors.text.primary }]}>
        {title}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {data.map((product: Product) => (
          <View
            key={product.id}
            style={[
              styles.productCard,
              {
                backgroundColor: appearance.colors.productList.backgroundColor,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.imageWrapper,
                { borderColor: appearance.colors.productList.borderColor },
              ]}
              onPress={() => openModal(product)}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.productName,
                { color: appearance.colors.text.primary },
              ]}
            >
              {product.name}
            </Text>
            <Text
              style={[
                styles.productPrice,
                { color: appearance.colors.productList.priceColor },
              ]}
            >
              R$ {product.options[0].price}
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
              {product.options[0].size}
            </Text>
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: appearance.colors.productList.addButtonColor,
                },
              ]}
              onPress={() => openModal(product)}
            >
              <FontAwesome5 name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
        presentationStyle="pageSheet"
      >
        {selectedProduct && (
          <ProductDetails product={selectedProduct} closeModal={closeModal} />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
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
    overflow: "hidden",
    paddingBottom: 30,
  },
  imageWrapper: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 5,
  },
  sizeBadge: {
    position: "absolute",
    left: 10,
    top: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
    borderRadius: 5,
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    right: 6,
    bottom: 80,
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productName: {
    fontSize: 12,
    textAlign: "left",
    marginTop: 5,
    width: "100%",
    marginLeft: 6,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 6,
  },
});

export default HorizontalProductScrollList;
