import { create } from "zustand";
import { Request } from "@requestnetwork/request-client.js";
import { IRequestDataWithEvents } from "@requestnetwork/request-client.js/dist/types";

type RequestsStore = {
  requests: IRequestDataWithEvents[];
  setRequests: (requests: IRequestDataWithEvents[]) => void;
};

export const useRequestsStore = create<RequestsStore>((set) => ({
  requests: [],
  setRequests: (requests) => set({ requests }),
}));
