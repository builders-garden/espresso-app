import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useState } from "react";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react-native";
import AppButton from "../../../components/app-button";
import { router } from "expo-router";
import { Item } from "../../../lib/firestore/interfaces";

const Items = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Coffee", price: 2.5 },
    { id: "2", name: "Tea", price: 2 },
    { id: "3", name: "Cake", price: 3 },
    {
      id: "4",
      name: "Sandwich",
      price: 4,
    },
  ]);

  return (
    <SafeAreaView>
      <View className="flex flex-col p-8 space-y-8">
        <View className="flex flex-row justify-between">
          <Text className="text-4xl font-bold">Items</Text>
          <AppButton
            icon={<PlusIcon color={"white"} size={20} />}
            text={"Add item"}
            onPress={() => router.push("/app/create-item-modal")}
          />
        </View>
        <View className="flex flex-col space-y-2">
          <View className="flex flex-row space-x-8 justify-between">
            <View className="flex flex-row space-x-8">
              <Text className="basis-1/3 text-lg font-semibold">Name</Text>
              <Text className="basis-1/3 text-lg font-semibold">Price</Text>
            </View>
            <View className="basis-1/3"></View>
            <View className="basis-1/3"></View>
          </View>
          {items.map((item, index) => (
            <View
              key={"item-" + item.id}
              className={`flex flex-row space-x-8 justify-between p-2 rounded-lg ${index % 2 === 0 ? "bg-mutedGrey/10" : "bg-white"}`}
            >
              <View className="flex flex-row space-x-8">
                <Text className="basis-1/3 text-lg">{item.name}</Text>
                <Text className="basis-1/3 text-lg">
                  ${item.price.toFixed(2)}
                </Text>
              </View>
              <View className="flex flex-row space-x-4">
                <View>
                  <EditIcon color={"blue"} />
                </View>
                <View>
                  <TrashIcon color={"red"} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Items;
