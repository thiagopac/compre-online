import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { RebuyData, Product } from "@/api/types";
import { fetchRebuyData } from "@/api/rebuyApi";
import VerticalProductList from "@/components/VerticalProductList";
import Loading from "@/components/Loading";

export default function TabRebuyScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: RebuyData | null = await fetchRebuyData();
        if (data) {
          setProducts(data);
        } else {
          setError("No data found");
        }
      } catch (error) {
        console.error("Failed to fetch rebuy data:", error);
        setError("Failed to fetch data");
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <VerticalProductList data={products} title="" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
