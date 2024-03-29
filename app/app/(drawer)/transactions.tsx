import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import {
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react-native";
import AppButton from "../../../components/app-button";
import { useCheckoutsStore } from "../../../store/checkouts-store";
import { useShopStore } from "../../../store/shop-store";
import { getCheckouts } from "../../../lib/firestore";
import { Checkout } from "../../../lib/firestore/interfaces";
import { shortenAddress } from "../../../lib/utils";

const Transactions = () => {
  // const requests = useRequestsStore((state) => state.requests);
  // const setRequests = useRequestsStore((state) => state.setRequests);
  const shop = useShopStore((state) => state.shop);
  const checkouts = useCheckoutsStore((state) => state.checkouts);
  const setCheckouts = useCheckoutsStore((state) => state.setCheckouts);
  const refetchCheckouts = async () => {
    /*const provider = await wallet.getProvider!();
    const requests = await getRequests(provider, address!);
    console.log(requests);
    setRequests(requests);*/
    const checkouts = await getCheckouts(shop!.id);
    setCheckouts(checkouts.filter((c) => c.payerAddress) as Checkout[]);
  };
  return (
    <SafeAreaView>
      <View className="flex flex-col p-8 space-y-8">
        <View className="flex flex-row space-x-4 items-center">
          <Text className="text-4xl font-bold">Transactions</Text>
          <View>
            <AppButton
              size="small"
              variant="secondary"
              text="Refresh"
              icon={<RefreshCwIcon size={16} />}
              onPress={refetchCheckouts}
            />
          </View>
        </View>
        <View className="flex flex-col space-y-2">
          <View className="flex flex-row space-x-8 justify-between">
            <View className="flex flex-row space-x-8">
              <Text className="basis-1/4 text-lg font-semibold">Payer</Text>
              <Text className="basis-1/4 text-lg font-semibold">Amount</Text>
              <Text className="basis-1/4 text-lg font-semibold">Status</Text>
              <Text className="basis-1/4 text-lg font-semibold">Link</Text>
            </View>
          </View>
          {checkouts?.map((checkout, index) => (
            <View
              key={"check-" + checkout.id}
              className={`flex flex-row space-x-8 justify-between p-2 rounded-lg ${index % 2 === 0 ? "bg-mutedGrey/10" : "bg-white"}`}
            >
              <View className="flex flex-row space-x-8 items-center">
                <Text className="basis-1/4 text-lg">
                  {shortenAddress(checkout.payerAddress!)}
                </Text>
                <Text className="basis-1/4 text-lg">${checkout.amount}</Text>
                <Text className="basis-1/4 text-lg">
                  <View>
                    {checkout.payerAddress ? (
                      <Text className="text-lg font-semibold text-green-600">
                        Paid
                      </Text>
                    ) : (
                      <Text className="text-lg font-semibold text-red-600">
                        Unpaid
                      </Text>
                    )}
                  </View>
                </Text>
                <Text className="basis-1/4 text-lg">
                  <SearchIcon
                    onPress={() =>
                      console.log(`https://basescan.org/tx/${checkout.amount}`)
                    }
                  />
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transactions;
