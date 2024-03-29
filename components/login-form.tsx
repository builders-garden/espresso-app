import {
  isNotCreated,
  useEmbeddedWallet,
  useLoginWithEmail,
  usePrivy,
} from "@privy-io/expo";
import { useState, useEffect } from "react";
import { View, TextInput, Text, ActivityIndicator } from "react-native";
import AppButton from "./app-button";
import CodeInput from "./code-input";
import { router } from "expo-router";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";
import { getRequests } from "../lib/request-network";
import { useRequestsStore } from "../store/requests-store";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";
import { getCheckout, getCheckouts, getItems, getShop } from "../lib/firestore";
import { useShopStore } from "../store/shop-store";
import { useItemsStore } from "../store/items-store";
import { Checkout, Item } from "../lib/firestore/interfaces";
import EmojiPicker, { emojiFromUtf16 } from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import { useCheckoutsStore } from "../store/checkouts-store";

enum LoginStatus {
  INITIAL = "initial",
  EMAIL_ERROR = "email-error",
  CODE_ERROR = "code-error",
  SUCCESS_EMAIL = "email-success",
  SUCCESS_CODE = "code-success",
}

const LoginForm = () => {
  const { logout } = usePrivy();
  const [email, setEmail] = useState<string>("test@privy.io");
  const [code, setCode] = useState(Array(6).fill("0"));
  const setShop = useShopStore((state) => state.setShop);
  const setItems = useItemsStore((state) => state.setItems);
  const setCheckouts = useCheckoutsStore((state) => state.setCheckouts);
  const { address } = usePrivyWagmiProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<LoginStatus>(LoginStatus.INITIAL);
  const setRequests = useRequestsStore((state) => state.setRequests);
  const wallet = useEmbeddedWallet();
  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onError: (error) => {
      try {
        const e = JSON.parse(error.message)[0];
        if (e.validation === "email") {
          setErrorMessage("Please enter a valid email address");
          setStatus(LoginStatus.EMAIL_ERROR);
        }
      } catch (e) {}
    },
    onSendCodeSuccess(args) {
      setStatus(LoginStatus.SUCCESS_EMAIL);
    },
    onLoginSuccess(user) {
      setStatus(LoginStatus.SUCCESS_CODE);
    },
  });

  useEffect(() => {
    if (code.join("").length === 6) {
      setIsLoading(true);
      setLoadingMessage("Verifying code...");
      loginWithCode({
        code: code.join(""),
        email,
      });
      setIsLoading(false);
    }
  }, [code]);

  useEffect(() => {
    console.log(state.status);
    if (state.status === "error") {
      logout();
    }
    if (state.status === "done" && address) {
      handleConnection();
    }
  }, [state, address]);

  const handleConnection = async () => {
    if (isNotCreated(wallet)) {
      setLoadingMessage("Creating wallet...");
      await wallet.create!();
    }
    setLoadingMessage("Connecting wallet...");
    const onboarding = await SecureStore.getItemAsync(`onboarding-${address}`);
    if (!onboarding) {
      return router.push("/onboarding");
    }
    const password = await SecureStore.getItemAsync(`password-${address}`);
    const email = `${address}@espresso.app`;
    await signInWithEmailAndPassword(firebaseAuth, email, password!);
    setLoadingMessage("Fetching shop data...");
    // const provider = await wallet.getProvider!();
    // const requests = await getRequests(provider, address!);
    // setRequests(requests);
    const shop = await getShop();
    if (shop.exists()) {
      const { id, name, city, country, address, walletAddress } = shop.data();
      setShop({
        id,
        name,
        city,
        country,
        address,
        walletAddress,
      });
      const [items, checkouts] = await Promise.all([
        getItems(id),
        getCheckouts(id),
      ]);
      setItems(items as Item[]);
      setCheckouts(checkouts.filter((c) => c.payerAddress));
      router.push("/app/home");
    } else {
      console.log("here");
      router.push("/onboarding");
    }
  };

  if (state.status === "initial" || status === LoginStatus.EMAIL_ERROR) {
    return (
      <View className="flex flex-col space-y-4">
        <View className="flex flex-col space-y-2">
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            inputMode="email"
            clearButtonMode="while-editing"
            placeholder="limone@example.com"
            placeholderTextColor={"#8F8F91"}
            className=" text-greyInput px-3 py-4 rounded-lg border border-mutedGrey"
          />
          <Text className="text-red-600">{errorMessage}</Text>
        </View>
        <View>
          <AppButton
            text={isLoading ? loadingMessage : "Login"}
            onPress={async () => {
              setIsLoading(true);
              setLoadingMessage("Sending code...");
              await sendCode({ email });
              setIsLoading(false);
            }}
          />
        </View>
      </View>
    );
  }

  if (
    state.status === "awaiting-code-input" ||
    status === LoginStatus.CODE_ERROR
  ) {
    return <CodeInput code={code} onChange={setCode} />;
  }

  return (
    <View className="flex flex-col space-y-8">
      <Text className="text-center">{loadingMessage}</Text>
      <ActivityIndicator animating={true} color={"#0061FF"} />
    </View>
  );
};

export default LoginForm;
