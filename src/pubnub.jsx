import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useCallback
} from "react";
import PubNub from "pubnub";

export const PubNubContext = createContext(null);

export const PubNubContainer = ({ children }) => {
  const [pubnub, setPubnub] = useState(null);

  const connect = useCallback(uuid => {
    setPubnub(
      new PubNub({
        subscribeKey: "sub-c-3db4039e-42a7-11ea-be28-ae0ede4a022d",
        publishKey: "pub-c-c3385e75-c2a9-440d-b6f5-50b2259ab973",
        uuid: uuid
      })
    );
  }, []);

  const context = useMemo(() => {
    return {
      pubnub: pubnub,
      connect
    };
  }, [pubnub]);

  return (
    <PubNubContext.Provider value={context}>{children}</PubNubContext.Provider>
  );
};

export const usePubNub = () => {
  const ctx = useContext(PubNubContext);

  return ctx && ctx.pubnub;
};

export const useConnect = () => {
  const ctx = useContext(PubNubContext);

  return ctx && ctx.connect;
};
