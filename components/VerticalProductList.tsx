import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Product, Appearance } from "@/api/types";
import { getAppearanceData } from "@/api/appearanceApi";
import ProductDetails from "@/app/ProductDetails";
import Loading from "@/components/Loading";

interface VerticalProductListProps {
  title: string;
  data: Product[];
}

const VerticalProductList = ({ title, data }: VerticalProductListProps) => {
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
      {title && (
        <Text style={[styles.title, { color: appearance.colors.text.primary }]}>
          {title}
        </Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.productCard,
              {
                backgroundColor: appearance.colors.productList.backgroundColor,
                borderColor: appearance.colors.productList.borderColor,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => openModal(item)}
              style={{ flexDirection: "row", flex: 1 }}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text
                  style={[
                    styles.productName,
                    { color: appearance.colors.text.primary },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.productPrice,
                    { color: appearance.colors.productList.priceColor },
                  ]}
                >
                  R$ {item.options[0].price}
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
                  {item.options[0].size}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.addButton,
                {
                  backgroundColor: appearance.colors.productList.addButtonColor,
                },
              ]}
              onPress={() => openModal(item)}
            >
              <FontAwesome5 name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
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
    flex: 1,
    padding: "4%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-around",
  },
  productName: {
    fontSize: 14,
    fontWeight: "regular",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeBadge: {
    paddingVertical: 5,
    width: 50,
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden",
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VerticalProductList;
