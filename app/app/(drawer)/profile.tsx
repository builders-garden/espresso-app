import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useState } from "react";
import AppButton from "../../../components/app-button";
import { useShopStore } from "../../../store/shop-store";
import InputField from "../../../components/input-field";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";
import { setDBShop } from "../../../lib/firestore";
import Toast from "react-native-toast-message";

const Profile = () => {
  const shop = useShopStore((state) => state.shop);
  const setShop = useShopStore((state) => state.setShop);
  const { address: walletAddress } = usePrivyWagmiProvider();
  console.log(walletAddress);
  const [name, setName] = useState<string>(shop!.name);
  const [city, setCity] = useState<string>(shop!.city);
  const [country, setCountry] = useState<string>(shop!.country);
  const [address, setAddress] = useState<string>(shop!.address);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <SafeAreaView>
      <View className="flex flex-col p-8 space-y-8">
        <View className="flex flex-row justify-between">
          <Text className="text-4xl font-bold">Shop's Profile</Text>
        </View>
        <View className="flex flex-col space-y-4">
          <View>
            <InputField
              value={name}
              onChange={setName}
              placeholder="Lemon's coffee shop"
              label="Name"
            />
          </View>
          <View className="flex flex-row justify-between space-x-4">
            <View className="flex-1">
              <InputField
                value={city}
                onChange={setCity}
                placeholder="Rome"
                label="City"
              />
            </View>
            <View className="flex-1">
              <InputField
                value={country}
                onChange={setCountry}
                placeholder="Italy"
                label="Country"
              />
            </View>
          </View>
          <View>
            <InputField
              value={address}
              onChange={setAddress}
              placeholder="via Roma 1"
              label="Address"
            />
          </View>
          <View>
            <AppButton
              text={"Update"}
              loading={loading}
              setLoading={setLoading}
              onPress={() => {
                const newShop = {
                  id: shop!.id,
                  walletAddress: walletAddress!,
                  name,
                  city,
                  country,
                  address,
                };
                setDBShop(newShop);
                setShop(newShop);
                Toast.show({
                  type: "success",
                  text1: "Success!",
                  text2: "Shop updated correctly!",
                });
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
