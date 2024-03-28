import { View, Text, Image, ActivityIndicator } from "react-native";
import { CheckoutItems } from "./checkout-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";
import AppButton from "../../components/app-button";
import { router } from "expo-router";

const QRCodeModal = () => {
  const { items } = useLocalSearchParams();
  const { address } = usePrivyWagmiProvider();
  const dataItems: CheckoutItems[] = JSON.parse(items as string);

  return (
    <SafeAreaView className="p-8 mx-40">
      <View className="flex flex-col justify-between h-full w-full">
        <View className="flex flex-col space-y-4 text-center justify-center">
          <View>
            <Text className="text-2xl font-bold text-center">Scan to pay</Text>
          </View>
          <View className="items-center">
            {address ? (
              <View className="shadow rounded-xl">
                <QRCode size={200} value={`https://example.com/${address}`} />
              </View>
            ) : (
              <View className="flex flex-col space-y-8">
                <ActivityIndicator animating={true} color={"#0061FF"} />
                <Text className="text-blue-600 font-medium text-center ">
                  Generating QRCode...
                </Text>
              </View>
            )}
          </View>

          <View className="flex flex-col space-y-4">
            <View className="flex flex-row justify-between">
              <Text className="text-xl font-semibold">Items</Text>
            </View>
            {dataItems.map((item, index) => (
              <View
                key={"qrcode-" + item.item.id}
                className={`flex flex-row justify-between items-center ${index % 2 === 0 ? "bg-mutedGrey/10" : "bg-white"} p-4 rounded-lg`}
              >
                <View className="flex-1 flex flex-row space-x-2 items-center">
                  <Text className="text-3xl">{item.item.emoji}</Text>
                  <Text className="flex-1 text-lg font-semibold">
                    {item.item.name}
                  </Text>
                </View>
                <View className="flex flex-row items-center">
                  <Text className="mr-4 text-grey-500">
                    {item.quantity}x ${item.item.price.toFixed(2)}
                  </Text>
                  <Text className="text-xl font-semibold">
                    ${(item.item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
            <View className="flex flex-row justify-between">
              <Text className="text-3xl font-bold">Total</Text>
              <Text className="text-3xl font-bold">
                $
                {dataItems
                  .reduce(
                    (acc, item) => acc + item.item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <AppButton
            variant="ghost"
            text="Back to checkout"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QRCodeModal;
