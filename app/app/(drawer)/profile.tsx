import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useState } from "react";
import AppButton from "../../../components/app-button";
import { router } from "expo-router";
import { useShopStore } from "../../../store/shop-store";
import InputField from "../../../components/input-field";

const Profile = () => {
  const shop = useShopStore((state) => state.shop);
  const setShop = useShopStore((state) => state.setShop);
  const [name, setName] = useState<string>(shop!.name);
  const [city, setCity] = useState<string>(shop!.city);
  const [country, setCountry] = useState<string>(shop!.country);
  const [address, setAddress] = useState<string>(shop!.address);
  return (
    <SafeAreaView>
      <View className="flex flex-col p-8 space-y-8">
        <View className="flex flex-row justify-between">
          <Text className="text-4xl font-bold">Shop's Profile</Text>
        </View>
        <View>
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
              onPress={() => console.log("Update shop")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
