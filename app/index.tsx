import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Badge } from "../components/Badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/Avatar";
import { Feather } from "@expo/vector-icons";

const App = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        className="p-4"
      >
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-foreground dark:text-foreground-dark">
            Component Library
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onPress={toggleColorScheme}
            label={isDark ? "Light Mode" : "Dark Mode"}
          />
        </View>

        {/* Card */}
        <Section title="Card">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                This is a description for the card.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-foreground dark:text-foreground-dark">
                Card content goes here. You can put any React Native components
                inside.
              </Text>
            </CardContent>
            <CardFooter>
              <Button label="Action" />
            </CardFooter>
          </Card>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <View className="flex-row flex-wrap gap-2">
            <Button label="Default" />
            <Button label="Destructive" variant="destructive" />
            <Button label="Outline" variant="outline" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Ghost" variant="ghost" />
            <Button label="Link" variant="link" />
            <Button label="Loading" loading />
            <Button label="Disabled" disabled />
          </View>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <Input placeholder="Standard Input" />
          <View className="h-4" />
          <Input placeholder="Input with Icon" iconLeft={<Feather name="search" size={16} />} />
          <View className="h-4" />
          <Input placeholder="Error State" error="This field is required." />
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Default" />
            <Badge label="Secondary" variant="secondary" />
            <Badge label="Destructive" variant="destructive" />
            <Badge label="Outline" variant="outline" />
          </View>
        </Section>

        {/* Avatars */}
        <Section title="Avatars">
          <View className="flex-row items-center gap-4">
            <Avatar>
              <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
              <AvatarFallback>
                <Text>CN</Text>
              </AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>
                <Text>JD</Text>
              </AvatarFallback>
            </Avatar>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="mb-8">
    <Text className="text-xl font-semibold text-foreground dark:text-foreground-dark mb-4">
      {title}
    </Text>
    {children}
  </View>
);

export default App;
