import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";

import Animated, { FadeInDown } from "react-native-reanimated";

interface RecipesProps {
  meals: any;
}

export default function Recipes({ meals }: RecipesProps) {
  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600 mb-3"
      >
        Recipes
      </Text>

      <View>
        <MasonryList
          data={meals}
          keyExtractor={(item): string => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
}

interface RecipeCardProps {
  item: any;
  index: number;
}

const RecipeCard = ({ item, index }: RecipeCardProps) => {
  let isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <Text
          className="font-semibold ml-2 mt-1 text-neutral-600"
          style={{ fontSize: hp(1.5) }}
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
