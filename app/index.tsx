import {SafeAreaView, Text, View} from "react-native";
import AppButton from "../components/app-button";

const Home = () => {
  return (
    <SafeAreaView className="flex bg-white flex-1 justify-between items-center text-center space-y-3 mx-4">
      <View className="flex flex-col my-auto space-y-16 w-[50%]">
        <View className="flex flex-col mb-8">
          <Text className="text-black  text-center font-bold text-7xl">
            Espresso ☕️
          </Text>
          <Text className="text-black font-medium text-3xl text-center">
            Sellings goods and services in crypto has never been so easy
          </Text>
        </View>
        <AppButton
          text={"Start now"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
