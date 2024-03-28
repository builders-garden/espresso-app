import {Slot} from "expo-router";
import {LogBox, View} from "react-native";
import {PaperProvider} from "react-native-paper";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
} from "react-native-toast-message";
import {useFonts} from "expo-font";
import {PrivyProvider} from "@privy-io/expo";
import {PrivyWagmiProvider} from "@buildersgarden/privy-wagmi-provider";

//@ts-ignore
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

import {QueryClient} from "@tanstack/react-query";
import {createConfig} from "wagmi";
import {http} from "viem";
import {base} from "viem/chains";
import { MyPermissiveSecureStorageAdapter } from "../lib/storage-adapter";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

LogBox.ignoreLogs([new RegExp("TypeError:.*")]);

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "#21202E",
      }}
      text1Style={{color: "white", fontWeight: "bold", fontSize: 16}}
      text2Style={{color: "white"}}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{borderLeftColor: "blue", backgroundColor: "#21202E"}}
      text1Style={{color: "white", fontWeight: "bold", fontSize: 16}}
      text2Style={{color: "white"}}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: "red", backgroundColor: "#21202E"}}
      text1Style={{color: "white", fontWeight: "bold", fontSize: 16}}
      text2Style={{color: "#8F8F91"}}
    />
  ),
};

export default function AppLayout() {
  const [fontsLoaded] = useFonts({
    "Raleway-VariableFont": require("../assets/fonts/Raleway-VariableFont.ttf"),
  });
  console.log(fontsLoaded);
  return (
    <>
      <PaperProvider
        settings={{
          icon: (props) => <Icon {...props} />,
        }}
      >
        <PrivyProvider
          appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!}
          storage={MyPermissiveSecureStorageAdapter}
          supportedChains={[base]}
        >
          <PrivyWagmiProvider queryClient={queryClient} config={wagmiConfig}>
            <View className="bg-black flex-1">
              <Slot />
            </View>
          </PrivyWagmiProvider>
        </PrivyProvider>
      </PaperProvider>
      <Toast
        config={toastConfig}
        position="top"
        topOffset={60}
        visibilityTime={2500}
      />
    </>
  );
}
