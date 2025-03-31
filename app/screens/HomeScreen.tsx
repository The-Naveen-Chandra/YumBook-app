import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

import Categories from "../components/Categories";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        // Filter out the beef category
        const filteredCategories = response.data.categories.filter(
          (category: any) => category.strCategory !== "Beef"
        );
        setCategories(filteredCategories);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error: ", error.message);
      } else {
        console.log("error: ", String(error));
      }
    }
  };

  const getRecipes = async (category = "Chicken") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      // console.log("Recipes: ", response.data);

      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error: ", error.message);
      } else {
        console.log("error: ", String(error));
      }
    }
  };

  return (
    <View className="flex-1 flex-col bg-white ">
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        className="pt-10"
      >
        {/* Avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-6">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="grey" />
        </View>

        {/* greetings and punchlines */}
        <View className="mx-4 gap-y-2 mb-6">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Naveen
          </Text>
          <View>
            <Text
              style={{
                fontSize: hp(3.8),
              }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-orange-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-6">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* categories */}
        <View className="mb-6">
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
}
