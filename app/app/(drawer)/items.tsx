import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react-native";
import AppButton from "../../../components/app-button";
import { router } from "expo-router";
import { useItemsStore } from "../../../store/items-store";
import { getItems, removeItem } from "../../../lib/firestore";
import { useShopStore } from "../../../store/shop-store";

const Items = () => {
  const shop = useShopStore((state) => state.shop);
  const items = useItemsStore((state) => state.items);
  const setItems = useItemsStore((state) => state.setItems);

  useEffect(() => {
    if (!items) {
      getItems(shop?.id!).then((items) => setItems(items));
    }
  }, []);
  return (
    <SafeAreaView>
      <View className="flex flex-col p-8 space-y-8">
        <View className="flex flex-row justify-between">
          <Text className="text-4xl font-bold">Items</Text>
          <AppButton
            icon={<PlusIcon color={"white"} size={24} />}
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
          {items?.map((item, index) => (
            <View
              key={"item-" + item.name.toLocaleLowerCase()}
              className={`flex flex-row space-x-8 justify-between p-2 rounded-lg ${index % 2 === 0 ? "bg-mutedGrey/10" : "bg-white"}`}
            >
              <View className="flex flex-row space-x-8">
                <View className="basis-1/3 flex flex-row space-x-2">
                  <Text className="text-lg">{item.emoji}</Text>
                  <Text className="text-lg">{item.name}</Text>
                </View>
                <Text className="basis-1/3 text-lg">
                  ${item.price.toFixed(2)}
                </Text>
              </View>
              <View className="flex flex-row space-x-4">
                <View>
                  <TrashIcon
                    color={"red"}
                    className="p-4"
                    onPress={() => {
                      removeItem(item.id);
                      setItems(items?.filter((i) => i?.id !== item?.id));
                    }}
                  />
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
