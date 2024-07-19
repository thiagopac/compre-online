import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { StoreData, ProductList } from "@/api/types";
import { fetchStoreData } from "@/api/storeApi";
import SearchInput from "@/components/SearchInput";
import CategorySquares from "@/components/CategorySquares";
import HorizontalProductScrollList from "@/components/HorizontalProductScrollList";
import VerticalProductList from "@/components/VerticalProductList";

const TabStoreScreen = () => {
  const [homeData, setHomeData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStoreData();
        setHomeData(data);
      } catch (e) {
        setError("Unable to fetch data");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const renderItem = ({ item }: { item: ProductList }) => {
    switch (item.type) {
      case "horizontal":
        return (
          <HorizontalProductScrollList
            key={item.title}
            data={item.products}
            title={item.title}
          />
        );
      case "vertical":
        return (
          <VerticalProductList
            key={item.title}
            data={item.products}
            title={item.title}
          />
        );
      default:
        return null;
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={styles.categoriesContainer}>
          <SearchInput />
          {homeData && <CategorySquares categories={homeData.categories} />}
        </View>
      )}
      data={homeData?.productLists}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    backgroundColor: "#fff",
  },
  flatList: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default TabStoreScreen;
