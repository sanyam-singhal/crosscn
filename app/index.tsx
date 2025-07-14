import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Badge } from "../components/Badge";
import { IconButton } from "../components/IconButton";
import { Checkbox } from "../components/Checkbox";
import { RadioGroup, RadioGroupItem } from "../components/RadioGroup";
import { Switch } from "../components/Switch";
import { Progress } from "../components/Progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/Accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/Tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/Avatar";
import { Feather } from "@expo/vector-icons";

const App = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isChecked, setIsChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("option-one");
  const [switchValue, setSwitchValue] = React.useState(false);
  const [progressValue, setProgressValue] = React.useState(10);
  // Accordion can be configured for single or multiple selection; therefore
  // the value may be `string`, an array of `string`, or `null`.
  const [accordionValue, setAccordionValue] = React.useState<string | string[] | null>(
    "item-1"
  );

  const handleAccordionChange = React.useCallback(
    (v: string | string[] | null) => {
      setAccordionValue(v);
    },
    []
  );
  const [tabsValue, setTabsValue] = React.useState("account");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 90 ? 10 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

        {/* Tabs */}
        <Section title="Tabs">
          <Tabs value={tabsValue} onValueChange={setTabsValue}>
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you&apos;re
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="gap-4">
                  <Input placeholder="Name" defaultValue="Pedro Duarte" />
                  <Input
                    placeholder="Username"
                    defaultValue="@peduarte"
                  />
                </CardContent>
                <CardFooter>
                  <Button label="Save changes" />
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="gap-4">
                  <Input placeholder="Current password" secureTextEntry />
                  <Input placeholder="New password" secureTextEntry />
                  <Input
                    placeholder="Confirm new password"
                    secureTextEntry
                  />
                </CardContent>
                <CardFooter>
                  <Button label="Save password" />
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text className="text-foreground">...</Text>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Section>

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

        {/* Accordion */}
        <Section title="Accordion">
          <Accordion
            value={accordionValue}
            onValueChange={handleAccordionChange}
            type="single"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Text className="text-foreground">Is it accessible?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="text-muted-foreground">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <Text className="text-foreground">Is it styled?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="text-muted-foreground">
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <Text className="text-foreground">Is it animated?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="text-muted-foreground">
                  Yes. It&apos; animated by default, but you can disable it if
                  you prefer.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

        {/* Icon Buttons */}
        <Section title="Icon Buttons">
          <View className="flex-row flex-wrap gap-2">
            <IconButton icon={<Feather name="home" />} />
            <IconButton icon={<Feather name="camera" />} variant="destructive" />
            <IconButton icon={<Feather name="save" />} variant="outline" />
            <IconButton icon={<Feather name="bluetooth" />} variant="secondary" />
            <IconButton icon={<Feather name="wifi" />} variant="ghost" />
            <IconButton icon={<Feather name="link" />} variant="link" />
            <IconButton icon={<Feather name="loader" />} loading />
            <IconButton icon={<Feather name="slash" />} disabled />
          </View>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <Input placeholder="Standard Input" />
          <View className="h-4" />
          <Input
            placeholder="Input with Icon"
            iconLeft={<Feather name="search" size={16} />}
          />
          <View className="h-4" />
          <Input placeholder="Error State" error="This field is required." />
        </Section>

        {/* Textareas */}
        <Section title="Textareas">
          <Textarea placeholder="Type your message here." />
          <View className="h-4" />
          <Textarea
            placeholder="This one grows as you type."
            autoGrow
            rows={2}
          />
          <View className="h-4" />
          <Textarea
            placeholder="Error State"
            error="This field is required."
          />
        </Section>

        {/* Checkboxes */}
        <Section title="Checkboxes">
          <View className="flex-col gap-4">
            <Checkbox
              label="Accept terms and conditions"
              checked={isChecked}
              onCheckedChange={setIsChecked}
            />
            <Checkbox
              label="Indeterminate"
              checked="indeterminate"
              onCheckedChange={() => {}}
            />
            <Checkbox
              label="Checked"
              checked={true}
              onCheckedChange={() => {}}
            />
            <Checkbox
              label="Disabled"
              checked={false}
              onCheckedChange={() => {}}
              disabled
            />
            <Checkbox
              label="Disabled & Checked"
              checked={true}
              onCheckedChange={() => {}}
              disabled
            />
          </View>
        </Section>

        {/* Radio Group */}
        <Section title="Radio Group">
          <RadioGroup
            value={radioValue}
            onValueChange={setRadioValue}
            className="flex-col gap-4"
          >
            <RadioGroupItem value="option-one" label="Option One" />
            <RadioGroupItem value="option-two" label="Option Two" />
            <RadioGroupItem value="option-three" label="Option Three" />
            <RadioGroupItem
              value="option-four"
              label="Disabled"
              disabled
            />
          </RadioGroup>
        </Section>

        {/* Switches */}
        <Section title="Switches">
          <View className="flex-row items-center gap-4">
            <Switch
              checked={switchValue}
              onCheckedChange={setSwitchValue}
              size="sm"
            />
            <Switch
              checked={switchValue}
              onCheckedChange={setSwitchValue}
              size="default"
            />
            <Switch
              checked={switchValue}
              onCheckedChange={setSwitchValue}
              size="lg"
            />
            <Switch
              checked={true}
              onCheckedChange={() => {}}
              disabled
            />
          </View>
        </Section>

        {/* Progress Bar */}
        <Section title="Progress Bar">
          <Progress value={progressValue} />
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
