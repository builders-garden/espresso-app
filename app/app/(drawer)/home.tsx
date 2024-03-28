import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import OverviewTabs from "../../../components/tabs";
import {
  PlusCircle,
  RefreshCwIcon,
  ShoppingBagIcon,
} from "lucide-react-native";
import { router } from "expo-router";
import AppButton from "../../../components/app-button";
import { useRequestsStore } from "../../../store/requests-store";
import { useEmbeddedWallet } from "@privy-io/expo";
import { getRequests } from "../../../lib/request-network";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";

export enum TabSelection {
  TODAY = "today",
  YESTERDAY = "yesterday",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
}

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<TabSelection>(
    TabSelection.TODAY
  );
  const [revenue, setRevenue] = useState<number>(0);
  const [purchases, setPurchases] = useState<number>(0);
  const requests = useRequestsStore((state) => state.requests);
  const setRequests = useRequestsStore((state) => state.setRequests);
  const wallet = useEmbeddedWallet();
  const { address } = usePrivyWagmiProvider();

  useEffect(() => {
    let diffTime = 0;
    switch (selectedTab) {
      case TabSelection.TODAY:
        diffTime = 24 * 60 * 60 * 1000;
        break;
      case TabSelection.THIS_WEEK:
        diffTime = 7 * 24 * 60 * 60 * 1000;
        break;
      case TabSelection.THIS_MONTH:
        diffTime = 30 * 24 * 60 * 60 * 1000;
        break;
    }
    const filteredRequests = requests.filter(
      (r) => r.timestamp > Date.now() - 24 * 60 * 60 * 1000
    );
    setRevenue(
      filteredRequests.reduce(
        (acc, request) => acc + parseFloat(request.expectedAmount.toString()),
        0
      )
    );
    setPurchases(filteredRequests.length);
  }, [selectedTab]);

  const refetchRequests = async () => {
    const provider = await wallet.getProvider!();
    const requests = await getRequests(provider, address!);
    setRequests(requests);
  };

  return (
    <SafeAreaView>
      <View className="flex flex-col p-8 space-y-8">
        <View>
          <Text className="text-4xl font-bold">Overview</Text>
        </View>
        <View className="flex flex-col space-y-4">
          <View className="flex flex-row space-x-4 items-center">
            <Text className="text-lg font-semibold">Latest purchases</Text>
            <View>
              <AppButton
                size="small"
                text="See all"
                onPress={() => router.push("/app/transactions")}
              />
            </View>
            <View>
              <AppButton
                size="small"
                variant="secondary"
                text="Refresh"
                icon={<RefreshCwIcon size={16} />}
                onPress={refetchRequests}
              />
            </View>
          </View>
          <View className="flex flex-row space-y-8">
            <OverviewTabs
              tabs={[
                { id: TabSelection.TODAY, name: "Today" },
                { id: TabSelection.THIS_WEEK, name: "This week" },
                {
                  id: TabSelection.THIS_MONTH,
                  name: "This month",
                },
              ]}
              selectedTabId={selectedTab}
              onChange={setSelectedTab}
            />
          </View>
          <View className="border border-mutedGrey flex flex-row rounded-lg w-1/2 justify-evenly p-8">
            <View className="flex flex-col justify-center py-4">
              <Text className="text-xl text-mutedGrey font-medium">
                Total revenue
              </Text>
              <Text className="text-3xl font-semibold">${revenue}</Text>
            </View>
            <View className="h-full bg-mutedGrey/70 w-0.5" />
            <View className="flex flex-col py-4">
              <Text className="text-xl text-mutedGrey font-medium">
                Purchases
              </Text>
              <Text className="text-3xl font-semibold">{purchases}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col space-y-4">
          <Text className="text-lg font-semibold">Quick actions</Text>
          <View className="flex flex-row rounded-lg w-1/2 justify-start space-x-4">
            <Pressable
              className="flex flex-1 flex-col justify-center items-center p-8 border border-mutedGrey rounded-lg space-y-4"
              onPress={() => router.push("/app/checkout-modal")}
            >
              <ShoppingBagIcon />
              <Text className="text-xl  font-medium">New checkout</Text>
            </Pressable>
            <Pressable
              className="flex flex-1 flex-col items-center justify-center p-8 border border-mutedGrey rounded-lg space-y-4"
              onPress={() => router.push("/app/create-item-modal")}
            >
              <PlusCircle />
              <Text className="text-xl  font-medium">Add item</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
