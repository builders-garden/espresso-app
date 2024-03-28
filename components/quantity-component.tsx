import React from "react";
import { View, Text, Pressable } from "react-native";
import { Item } from "../app/app/(drawer)/items";
import {
  MinusCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
} from "lucide-react-native";

const QuantityComponent = ({
  item,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}: {
  item: Item;
  quantity: number;
  increaseQuantity: (item: Item) => void;
  decreaseQuantity: (item: Item, quantity?: number) => void;
}) => {
  return (
    <View className="flex flex-row justify-center items-center space-x-2">
      <Pressable className="p-2" onPress={() => decreaseQuantity(item, 1)}>
        <MinusCircleIcon size={36} color={"grey"} />
      </Pressable>
      <View>
        <Text className="text-2xl font-bold">{quantity}</Text>
      </View>
      <Pressable className="p-2" onPress={() => increaseQuantity(item)}>
        <PlusCircleIcon size={36} color={"grey"} />
      </Pressable>
    </View>
  );
};

export default QuantityComponent;
