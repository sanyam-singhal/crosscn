import { useColorScheme } from "nativewind";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-background dark:bg-background-dark p-4"
      >
        {/* Header */}
        <Text className="text-3xl font-bold text-foreground dark:text-foreground-dark text-center mb-6">
          Design System Demo
        </Text>

        {/* Card Example */}
        <View className="bg-card dark:bg-card-dark rounded-lg shadow-md border border-border p-6 mb-6">
          <Text className="text-xl font-medium text-card-foreground dark:text-card-foreground-dark mb-3">
            Card Title
          </Text>
          <Text className="text-base text-foreground-subtle dark:text-foreground-subtle-dark">
            This card demonstrates background, border, rounded corners, and shadow utilities.
          </Text>
        </View>

        {/* Input Example */}
        <TextInput
          placeholder="Type here…"
          placeholderTextColor="#439A97"
          className="bg-input dark:bg-input-dark text-foreground dark:text-foreground-dark border border-border rounded-md px-4 py-2 mb-6"
        />

        {/* Button Example */}
        <Pressable
          className="bg-primary dark:bg-primary-dark rounded-lg px-5 py-3 shadow-lg mb-6"
          onPress={() => {}}
        >
          <Text className="text-primary-foreground dark:text-primary-foreground-dark text-center font-semibold">
            Primary Action
          </Text>
        </Pressable>

        {/* Activity Indicator */}
        <View className="items-center mb-6">
          <ActivityIndicator
            size="large"
            color={isDark ? "#12B28C" : "#04695C"}
          />
        </View>

        {/* Toggle Dark Mode */}
        <Pressable
          onPress={() => toggleColorScheme()}  // Toggles between light & dark :contentReference[oaicite:5]{index=5}
          className="bg-secondary dark:bg-secondary-dark rounded-full px-4 py-2 mb-6 transition duration-300 ease-in-out"
        >
          <Text className="text-secondary-foreground dark:text-secondary-foreground-dark text-center">
            Switch to {isDark ? "Light" : "Dark"} Mode
          </Text>
        </Pressable>

        {/* Footer Text */}
        <Text className="text-sm text-foreground-subtle dark:text-foreground-subtle-dark text-center opacity-50">
          © 2025 CrossCN Demo
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
