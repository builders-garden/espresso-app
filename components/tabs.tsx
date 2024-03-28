import { View, Text, Pressable } from "react-native";
import { TabSelection } from "../app/app/(drawer)/home";

const OverviewTabs = ({
  selectedTabId,
  tabs,
  onChange,
}: {
  selectedTabId: TabSelection;
  tabs: { id: TabSelection; name: string }[];
  onChange: (id: TabSelection) => void;
}) => {
  return (
    <View className="flex flex-row space-x-2 items-center">
      {tabs.map((tab) => (
        <Pressable
          key={tab.id}
          className={`flex-1/4 border-solid rounded-lg ${tab.id === selectedTabId ? "border-primary bg-primary/10 border-2" : "border-transparent border-mutedGrey border"}`}
          onPress={() => onChange(tab.id)}
        >
          <Text
            className={`p-4 text-center ${tab.id === selectedTabId ? "font-medium" : ""}`}
          >
            {tab.name}
          </Text>
        </Pressable>
      ))}
      <View className="ml-8">
        <Text className="text-lg text-mutedGrey">
          {new Date().toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default OverviewTabs;
