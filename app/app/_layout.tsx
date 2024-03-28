import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-item-modal"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="checkout-modal"
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
      <Stack.Screen
        name="qrcode-modal"
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
    </Stack>
  );
}
