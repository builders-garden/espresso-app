import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import {
  EditIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react-native";
import { useRequestsStore } from "../../../store/requests-store";
import { useEmbeddedWallet } from "@privy-io/expo";
import { usePrivyWagmiProvider } from "@buildersgarden/privy-wagmi-provider";
import { getRequests } from "../../../lib/request-network";
import AppButton from "../../../components/app-button";

const Transactions = () => {
  const requests = useRequestsStore((state) => state.requests);
  const setRequests = useRequestsStore((state) => state.setRequests);
  const wallet = useEmbeddedWallet();
  const { address } = usePrivyWagmiProvider();
  const refetchRequests = async () => {
    const provider = await wallet.getProvider!();
    const requests = await getRequests(provider, address!);
    console.log(requests);
    setRequests(requests);
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
              onPress={refetchRequests}
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
          {requests.map((request, index) => (
            <View
              key={"item-" + request.requestId}
              className={`flex flex-row space-x-8 justify-between p-2 rounded-lg ${index % 2 === 0 ? "bg-mutedGrey/10" : "bg-white"}`}
            >
              <View className="flex flex-row space-x-8">
                <Text className="basis-1/4 text-lg">
                  {request.payer?.value}
                </Text>
                <Text className="basis-1/4 text-lg">
                  ${request.expectedAmount}
                </Text>
                <Text className="basis-1/4 text-lg">{request.state}</Text>
                <Text className="basis-1/4 text-lg">
                  <SearchIcon
                    onPress={() =>
                      console.log(`https://basescan.org/tx/${request}`)
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
