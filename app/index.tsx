import React from "react";
import { View } from "react-native";
import StartScreen from "./screens/StartScreen";

import PopularProducts from "./screens/PopularProducts"; 

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StartScreen navigation={undefined} />
      <PopularProducts />
    </View>
  );
}
