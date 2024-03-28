import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import AppButton from "../components/app-button";
import { useEffect, useState } from "react";
import LoginForm from "../components/login-form";
import { isNotCreated, useEmbeddedWallet, usePrivy } from "@privy-io/expo";
import { router } from "expo-router";

const Home = () => {
  const { isReady, user } = usePrivy();
  const wallet = useEmbeddedWallet();
  const [isLogin, setIsLogin] = useState(false);

  return (
    <SafeAreaView className="flex bg-white flex-1 justify-between items-center text-center space-y-3 mx-4">
      <View className="flex flex-col my-16 space-y-16 w-[50%]">
        <KeyboardAvoidingView className="w-full" behavior="height">
          <View className="flex flex-col mb-8">
            <Text className="text-black  text-center font-bold text-7xl">
              Espresso ☕️
            </Text>
            <Text className="text-black font-semibold text-3xl text-center">
              Sellings goods in crypto has never been so easy
            </Text>
          </View>
          {!isReady && <ActivityIndicator animating={true} color={"#0061FF"} />}
          {isReady && !isLogin && (
            <AppButton
              text={"Start now"}
              onPress={() => {
                if (user) {
                  if (isNotCreated(wallet)) {
                    router.push("/app/onboarding");
                  } else {
                    router.push("/app/home");
                  }
                } else {
                  setIsLogin(true);
                }
              }}
            />
          )}
          {isReady && isLogin && (
            <View className="flex flex-col space-y-4">
              <LoginForm />
              <Text
                className="text-center font-semibold"
                onPress={() => setIsLogin(false)}
              >
                Back
              </Text>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
