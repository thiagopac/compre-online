import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Product, StoreData, Appearance } from "@/api/types";
import { fetchStoreData } from "@/api/storeApi";
import { getAppearanceData } from "@/api/appearanceApi";
import ProductDetails from "@/app/ProductDetails";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import Loading from "@/components/Loading";

const normalizeString = (str: string) => {
  return str
    .normalize("NFD") // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remover marcas diacríticas
    .replace(/\s+/g, " ") // Substituir múltiplos espaços por um único espaço
    .trim() // Remover espaços em branco nas extremidades
    .toLowerCase(); // Converter para minúsculas
};

const SearchResultsScreen = () => {
  const { query } = useLocalSearchParams();
  const searchQuery = Array.isArray(query) ? query[0] : query || "";
  const normalizedQuery = normalizeString(searchQuery);
  const queryWords = normalizedQuery.split(" ");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const appearanceData = await getAppearanceData();
      setAppearance(appearanceData);

      const data: StoreData | null = await fetchStoreData();
      if (data) {
        const filteredProducts = data.productLists.flatMap((list) =>
          list.products.filter((product) =>
            queryWords.some((word) =>
              normalizeString(product.name).includes(word)
            )
          )
        );
        setProducts(filteredProducts);
      }
      setLoading(false);
    };
    loadProducts();
  }, [normalizedQuery]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  if (loading || !appearance) return <Loading />;
  if (products.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={[
            styles.noResultsText,
            { color: appearance.colors.text.primary },
          ]}
        >
          Nenhum produto encontrado
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#fff",
    padding: "4%",
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
  noResultsText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default SearchResultsScreen;
