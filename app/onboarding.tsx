import { View, Text } from "react-native";
import AppButton from "../components/app-button";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/input-field";
import { useState } from "react";

const Onboarding = () => {
  const { logout } = usePrivy();
  const [name, setName] = useState<string>("Lemon & frens coffee shop");
  const [city, setCity] = useState<string>("Rome");
  const [country, setCountry] = useState<string>("Italy");
  const [address, setAddress] = useState<string>("Via Roma 1");
  return (
    <SafeAreaView>
      <View className="flex flex-row h-full">
        <View className="flex-1 bg-amber-500 justify-center">
          <View className="mx-6">
            <AppButton
              text={"Logout"}
              onPress={() => {
                logout();
                router.push("/");
              }}
            />
          </View>
        </View>
        <View className="flex-1 bg-white">
          <View className="flex flex-col space-y-4 p-12 h-full">
            <Text className="text-black font-semibold text-4xl">
              Create your shop's profile
            </Text>
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
                text={"Create shop"}
                onPress={() => router.push("/app/home")}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
