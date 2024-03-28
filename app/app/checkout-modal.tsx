import { Pressable, SafeAreaView, Text, View } from "react-native";
import { QrCode, TrashIcon, X } from "lucide-react-native";
import { useState } from "react";
import QuantityComponent from "../../components/quantity-component";
import AppButton from "../../components/app-button";
import { router } from "expo-router";
import { CheckoutItems, Item } from "../../lib/firestore/interfaces";
import { useItemsStore } from "../../store/items-store";
import { addCheckout } from "../../lib/firestore";
import { useShopStore } from "../../store/shop-store";

const CheckoutModal = () => {
  const shop = useShopStore((set) => set.shop);
  const items = useItemsStore((state) => state.items);
  const [checkOutItems, setCheckOutItems] = useState<CheckoutItems[]>([]);
  const addItem = (item: Item) => {
    // if an item is already in the checkout list, update just the quantity
    if (checkOutItems.find((i) => i.item.id === item.id)) {
      setCheckOutItems(
        checkOutItems.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCheckOutItems([...checkOutItems, { item, quantity: 1 }]);
    }
  };
  const removeItem = (item: Item, quantity?: number) => {
    // if an item is already in the checkout list, update just the quantity
    if (checkOutItems.find((i) => i.item.id === item.id)) {
      setCheckOutItems(
        checkOutItems.map((i) =>
          i.item.id === item.id
            ? { ...i, quantity: i.quantity - (quantity || 1) }
            : i
        )
      );
    }
    if (
      checkOutItems.find((i) => i.item.id === item.id)?.quantity === 1 ||
      !quantity
    ) {
      setCheckOutItems(checkOutItems.filter((i) => i.item.id !== item.id));
    }
  };
  return (
    <SafeAreaView className="p-8">
      <View className="p-8 flex flex-col h-full">
        <View className="flex flex-row justify-between">
          <Text className="font-bold text-2xl">Checkout</Text>
          <X color={"black"} onPress={() => router.back()} />
        </View>
        <View className="flex flex-row flex-1">
          <View className="flex-1 flex flex-row flex-wrap">
            {items!.map((item, index) => (
              <>
                <Pressable
                  onPress={() => {
                    console.log(item);
                    addItem(item);
                  }}
                  key={"itemp-" + item.name.toLocaleLowerCase()}
                  className="flex-1 rounded-lg flex flex-col text-center justify-between p-4 space-y-2"
                >
                  <View className="rounded-lg flex flex-col text-center justify-between p-4 space-y-2 border border-mutedGrey">
                    <Text className="text-6xl text-center">{item.emoji}</Text>
                    <Text className="text-center text-xl font-semibold">
                      {item.name}
                    </Text>
                    <Text className="text-center text-lg">
                      ${item.price.toFixed(2)}
                    </Text>
                  </View>
                </Pressable>
                {index % 2 === 1 && <View style={{ width: "100%" }} />}
              </>
            ))}
          </View>
          <View className="flex-1">
            <View className="flex-1 flex flex-col p-4 space-y-8 justify-between">
              <View className="flex flex-col">
                {checkOutItems.map((item, index) => (
                  <View
                    key={"checkout-" + item.item.id}
                    className={`flex flex-row justify-between items-center ${index % 2 === 0 ? "bg-mutedGrey/10" : "bg-white"} p-4 rounded-lg`}
                  >
                    <View className="flex-1 flex flex-row space-x-2 items-center">
                      <Text className="text-4xl">{item.item.emoji}</Text>
                      <Text className="flex-1 text-xl font-semibold">
                        {item.item.name}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <QuantityComponent
                        quantity={item.quantity}
                        item={item.item}
                        increaseQuantity={addItem}
                        decreaseQuantity={removeItem}
                      />
                    </View>
                    <View className="flex-1/3 flex flex-row space-x-4 items-center">
                      <TrashIcon
                        color={"red"}
                        onPress={() => removeItem(item.item)}
                      />
                    </View>
                  </View>
                ))}
              </View>
              <View className="flex flex-col space-y-4">
                <View className="flex flex-row justify-between">
                  <Text className="text-4xl font-bold">Total</Text>
                  <Text className="text-4xl font-bold">
                    $
                    {checkOutItems
                      .reduce(
                        (acc, item) => acc + item.item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </View>
                <View>
                  <AppButton
                    variant={
                      checkOutItems.length === 0 ? "disabled" : "primary"
                    }
                    icon={<QrCode color={"white"} size={16} />}
                    text="Generate QRCode"
                    onPress={async () => {
                      const checkout = await addCheckout({
                        shopId: shop!.id,
                        items: checkOutItems,
                        createdAt: new Date(),
                      });
                      router.push({
                        pathname: "/app/qrcode-modal",
                        params: {
                          items: JSON.stringify(checkOutItems),
                          checkoutId: checkout.id,
                        },
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutModal;
