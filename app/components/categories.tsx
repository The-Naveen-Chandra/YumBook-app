import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CachedImage } from "../helper/Image";

interface CategoriesProps {
  categories: any[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}: CategoriesProps) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? "bg-orange-400" : "bg-black/10";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center mr-4"
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                {/* <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                /> */}

                <CachedImage
                  uri={cat.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
