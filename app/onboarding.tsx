import { View, Text } from "react-native";
import AppButton from "../components/app-button";
import { usePrivy } from "@privy-io/expo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/input-field";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";
import { useShopStore } from "../store/shop-store";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";
import { generatePassword } from "../lib/utils";
import { setDBShop } from "../lib/firestore";

const Onboarding = () => {
  const { logout } = usePrivy();
  const [name, setName] = useState<string>("Lemon & frens coffee shop");
  const [city, setCity] = useState<string>("Rome");
  const [country, setCountry] = useState<string>("Italy");
  const [address, setAddress] = useState<string>("Via Roma 1");
  const setShop = useShopStore((state) => state.setShop);
  const [loading, setLoading] = useState<boolean>(false);
  const { address: walletAddress } = usePrivyWagmiProvider();

  const createAccount = async () => {
    let password = await SecureStore.getItemAsync(`password-${walletAddress}`);
    if (!password) {
      password = generatePassword();
    }
    await SecureStore.setItemAsync(`password-${walletAddress}`, password);

    if (!firebaseAuth.currentUser) {
      try {
        await createUserWithEmailAndPassword(
          firebaseAuth,
          `${walletAddress}@espresso.app`,
          password
        );
      } catch (error) {
        await signInWithEmailAndPassword(
          firebaseAuth,
          `${walletAddress}@espresso.app`,
          password
        );
      }
    }
  };

  const setFirebaseShop = async () => {
    if (!address || loading) return;
    setLoading(true);
    try {
      const shop = {
        id: firebaseAuth.currentUser!.uid,
        name,
        city,
        country,
        address,
        walletAddress: walletAddress as `0x${string}`,
      };
      await setDBShop(shop);
      setShop(shop);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const finishOnboarding = async () => {
    await createAccount();
    await setFirebaseShop();
    await SecureStore.setItemAsync(`onboarding-${walletAddress}`, "true");
    router.push("/app/home");
  };

  return (
    <SafeAreaView>
      <View className="flex flex-row h-full">
        <View className="flex-1 bg-amber-500 justify-center">
          <View className="mx-6">
            <AppButton
              text={"Logout"}
              onPress={() => {
                logout();
                signOut(firebaseAuth);
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
                onPress={() => finishOnboarding()}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
