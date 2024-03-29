import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../components/input-field";
import { useState } from "react";
import AppButton from "../../components/app-button";
import { X } from "lucide-react-native";
import { router } from "expo-router";
import { addItem } from "../../lib/firestore";
import { useShopStore } from "../../store/shop-store";
import EmojiGrid from "../../components/emojis-grid";
import { FoodEmojis } from "../../lib/emojis";
import { useItemsStore } from "../../store/items-store";
import { Item } from "../../lib/firestore/interfaces";

const CreateItemModal = () => {
  const shop = useShopStore((state) => state.shop);
  const items = useItemsStore((state) => state.items);
  const setItems = useItemsStore((state) => state.setItems);
  const [emoji, setEmoji] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <SafeAreaView className="p-8">
      <View className="flex flex-col justify-between h-full w-full">
        <View className="flex flex-col space-y-8">
          <View className="flex flex-row justify-between">
            <Text className="font-bold text-2xl">Create new item</Text>
            <X color={"black"} className="p-4" onPress={() => router.back()} />
          </View>
          <View className="flex flex-col space-y-4">
            <EmojiGrid
              emojis={FoodEmojis}
              selected={emoji}
              setSelected={setEmoji}
            />
            <View>
              <InputField
                label="Name"
                placeholder="Coffee"
                value={name}
                inputMode="text"
                onChange={setName}
              />
            </View>
            <View>
              <InputField
                label="Price"
                inputMode="numeric"
                placeholder="5.00"
                keyboardType="decimal-pad"
                value={price}
                onChange={setPrice}
              />
            </View>
          </View>
        </View>
        <View className="flex flex-row space-x-4">
          <View className="flex-1">
            <AppButton
              variant="ghost"
              text="Cancel"
              onPress={() => {
                router.back();
              }}
            />
          </View>
          <View className="flex-1">
            <AppButton
              loading={loading}
              setLoading={setLoading}
              variant={name && price && !loading ? "primary" : "disabled"}
              text={loading ? "Creating..." : "Create"}
              onPress={async () => {
                const doc = await addItem({
                  name,
                  price: parseFloat(price),
                  emoji,
                  shopId: shop?.id!,
                });
                setItems(
                  items!.concat([
                    {
                      id: doc.id,
                      name,
                      price: parseFloat(price),
                      emoji,
                      shopId: shop?.id!,
                    },
                  ] as Item[])
                );
                router.back();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateItemModal;
