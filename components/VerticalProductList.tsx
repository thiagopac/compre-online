import React, { useState } from "react";
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
import { Product } from "@/api/types";
import ProductDetails from "@/app/ProductDetails";
import Colors from "@/constants/Colors";

interface VerticalProductListProps {
  title: string;
  data: Product[];
}

const VerticalProductList = ({ title, data }: VerticalProductListProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <TouchableOpacity
              onPress={() => openModal(item)}
              style={{ flexDirection: "row", flex: 1 }}
            >
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  R$ {item.options[0].price}
                </Text>
                <Text style={styles.sizeBadge}>{item.options[0].size}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
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
    backgroundColor: Colors.productList.backgroundColor,
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
    backgroundColor: Colors.productList.backgroundColor,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.productList.borderColor,
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
    color: Colors.productList.priceColor,
  },
  sizeBadge: {
    backgroundColor: Colors.productList.badgeBackgroundColor,
    color: Colors.productList.badgeTextColor,
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
    backgroundColor: Colors.productList.addButtonColor,
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VerticalProductList;
