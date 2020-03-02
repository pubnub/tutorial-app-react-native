import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { usePubNub } from "pubnub-react";

export const ChatView = ({ route }) => {
  const pubnub = usePubNub();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (pubnub) {
      pubnub.setUUID(route.params.emoji);

      const listener = {
        message: envelope => {
          setMessages(msgs => [
            ...msgs,
            {
              id: envelope.message.id,
              author: envelope.publisher,
              content: envelope.message.content,
              timetoken: envelope.timetoken
            }
          ]);
        }
      };

      pubnub.addListener(listener);
      pubnub.subscribe({ channels: ["chat"] });

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  const handleSubmit = () => {
    setInput("");

    const message = {
      content: input,
      id: Math.random()
        .toString(16)
        .substr(2)
    };
    Keyboard.dismiss();

    pubnub.publish({ channel: "chat", message });
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior="height"
        keyboardVerticalOffset={Platform.select({
          ios: 78,
          android: 0
        })}
      >
        <View style={styles.topContainer}>
          {messages.map(message => (
            <View key={message.timetoken} style={styles.messageContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarContent}>{message.author}</Text>
              </View>
              <View style={styles.messageContent}>
                <Text>{message.content}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            placeholder="Type your message here..."
          />
          <View style={styles.submitButton}>
            {input !== "" && <Button title="Send" onPress={handleSubmit} />}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%"
  },
  innerContainer: {
    width: "100%",
    height: "100%"
  },
  topContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 16
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16
  },
  avatarContent: {
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center"
  },
  messageContent: {
    flex: 1
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 16,
    elevation: 2
  },
  submitButton: {
    position: "absolute",
    right: 32
  }
});
