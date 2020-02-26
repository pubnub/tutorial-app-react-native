import React, { useState, useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Keyboard
} from "react-native";

import { Emoji } from "emoji-mart-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useConnect, usePubNub } from "../../pubnub";

export const ChatView = ({ route, navigation }) => {
  const pubnub = usePubNub();
  const connect = useConnect();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connect(route.params.emoji.id);
  }, []);

  useEffect(() => {
    if (pubnub !== null) {
      const listener = {
        message: message => {
          console.log("recv", message);
          setMessages(msgs => GiftedChat.append(msgs, message.message));
        }
      };

      pubnub.addListener(listener);
      pubnub.subscribe({ channels: ["chat"] });

      return () => {
        pubnub.removeListener(listener);
      };
    }
  }, [pubnub]);

  const handleSend = useCallback(
    msgs => {
      if (pubnub) {
        for (let msg of msgs) {
          console.log("sending", msg);
          pubnub
            .publish({
              channel: "chat",
              message: msg
            })
            .catch(err => {
              console.error(err);
            });
        }
      }
    },
    [setMessages, pubnub]
  );

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: route.params.emoji.id }}
        multiline={false}
        renderAvatar={({ currentMessage }) => (
          <Emoji native={true} emoji={currentMessage.user._id} size={32} />
        )}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={80}
      ></KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
