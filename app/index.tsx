import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import AppButton from "../components/app-button";
import { useState } from "react";
import LoginForm from "../components/login-form";
import { usePrivy } from "@privy-io/expo";

const Home = () => {
  const { isReady } = usePrivy();
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
                setIsLogin(true);
              }}
            />
          )}
          {isReady && isLogin && (
            <View className="flex flex-col space-y-4">
              <LoginForm />
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
