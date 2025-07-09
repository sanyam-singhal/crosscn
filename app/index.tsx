import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-blue-600 dark:text-blue-400 font-bold text-3xl ">
        Creating app with <Text className="text-green-600 dark:text-green-400">Expo</Text> and <Text className="text-red-600 dark:text-red-400">Nativewind</Text>
      </Text>

    </SafeAreaView>
  );
};

export default App;