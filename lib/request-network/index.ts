import { PrivyEmbeddedWalletProvider } from "@privy-io/expo";
import { RequestNetwork, Types } from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";

export const getRequestClient = (provider: PrivyEmbeddedWalletProvider) => {
  const web3SignatureProvider = new Web3SignatureProvider(provider);
  return new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: "https://gnosis.gateway.request.network", //all the requests are stored on gnosis chain and can be retrieved using this public Request node gateway
    },
    signatureProvider: web3SignatureProvider,
  });
};

export const getRequests = async (
  provider: PrivyEmbeddedWalletProvider,
  address: string
) => {
  const client = getRequestClient(provider);
  console.log({
    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: address,
  });
  const requests = await client.fromIdentity({
    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: address,
  });
  console.log(JSON.stringify(requests));
  const unwrappedRequests = requests.map((request) => {
    return request.getData();
  });
  return unwrappedRequests.filter(
    (request) =>
      request.payee?.value.toLowerCase() === address.toLowerCase() &&
      request.currencyInfo.network === "base"
  );
};
