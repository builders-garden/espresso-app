import {
  isNotCreated,
  useEmbeddedWallet,
  useLoginWithEmail,
} from "@privy-io/expo";
import { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import AppButton from "./app-button";
import CodeInput from "./code-input";
import { router } from "expo-router";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";
import { getRequests } from "../lib/request-network";
import { useRequestsStore } from "../store/requests-store";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

enum LoginStatus {
  INITIAL = "initial",
  EMAIL_ERROR = "email-error",
  CODE_ERROR = "code-error",
  SUCCESS_EMAIL = "email-success",
  SUCCESS_CODE = "code-success",
}

const LoginForm = () => {
  const [email, setEmail] = useState<string>("test@privy.io");
  const [code, setCode] = useState(Array(6).fill("0"));
  const { address } = usePrivyWagmiProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [status, setStatus] = useState<LoginStatus>(LoginStatus.INITIAL);
  const setRequests = useRequestsStore((state) => state.setRequests);
  const wallet = useEmbeddedWallet();
  const { state, sendCode, loginWithCode } = useLoginWithEmail({
    onError: (error) => {
      console.error(error);
      const e = JSON.parse(error.message)[0];
      if (e.validation === "email") {
        setErrorMessage("Please enter a valid email address");
        setStatus(LoginStatus.EMAIL_ERROR);
      }
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
    if (state.status === "done" && address) {
      handleConnection();
    }
  }, [state, address]);

  const handleConnection = async () => {
    let isNewUser = false;
    if (isNotCreated(wallet)) {
      setLoadingMessage("Creating wallet...");
      await wallet.create!();
      isNewUser = true;
    }
    setLoadingMessage("Connecting wallet...");
    const onboarding = await SecureStore.getItemAsync(`onboarding-${address}`);
    if (!onboarding) {
      return router.push("/onboarding");
    }
    const password = await SecureStore.getItemAsync(`password-${address}`);
    const email = `${address}@ghost.app`;
    await signInWithEmailAndPassword(firebaseAuth, email, password!);
    setLoadingMessage("Fetching user data...");
    const provider = await wallet.getProvider!();
    const requests = await getRequests(provider, address!);
    console.log("Requests", requests);
    setRequests(requests);
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
    </View>
  );
};

export default LoginForm;
