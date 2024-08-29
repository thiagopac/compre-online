import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Category, Appearance } from "@/api/types";
import { getAppearanceData } from "@/api/appearanceApi";
import { useRouter } from "expo-router";
import Loading from "@/components/Loading";

interface CategorySquaresProps {
  categories: Category[];
}

const CategorySquares = ({ categories }: CategorySquaresProps) => {
  const router = useRouter();
  const [appearance, setAppearance] = useState<Appearance | null>(null);

  useEffect(() => {
    const loadAppearance = async () => {
      const data = await getAppearanceData();
      setAppearance(data);
    };
    loadAppearance();
  }, []);

  const handleCategoryPress = (categoryKey: string) => {
    console.log("Category key:", categoryKey);

    router.push({
      pathname: "/CategoryProducts",
      params: { categoryKey },
    });
  };

  if (!appearance) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            { backgroundColor: appearance.colors.category.itemBackground },
          ]}
          onPress={() => handleCategoryPress(category.key)}
        >
          <FontAwesome6
            name={category.icon}
            size={30}
            color={appearance.colors.category.textColor}
          />
          <Text
            style={[
              styles.categoryText,
              { color: appearance.colors.category.textColor },
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    borderRadius: 10,
    padding: 10,
    width: 116,
    height: 80,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },
});

export default CategorySquares;
