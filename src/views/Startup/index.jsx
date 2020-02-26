import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Emoji, ModalPicker } from "emoji-mart-native";

export const StartupView = ({ navigation }) => {
  const [modalOpen, setModalOpenState] = useState(false);
  const [emoji, setEmoji] = useState(null);

  const handleOpenEmojiPicker = useCallback(() => {
    setEmoji(null);
    setModalOpenState(true);
  }, []);

  const handleChooseEmoji = useCallback(emoji => {
    setModalOpenState(false);
    setEmoji(emoji);
  }, []);

  const handleContinue = useCallback(() => {
    navigation.replace("Chat", { emoji: emoji });
  }, [emoji, navigation]);

  if (emoji !== null) {
    return (
      <View style={styles.container}>
        <Text>You have chosen this emoji to represent yourself:</Text>
        <Emoji emoji={emoji} size={64} native={true} />
        <Button title="Pick again" onPress={handleOpenEmojiPicker} />
        <Button title="Continue" onPress={handleContinue} />
      </View>
    );
  }

  if (modalOpen === true) {
    return (
      <ModalPicker
        isVisible={true}
        native={true}
        onSelect={handleChooseEmoji}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello world! Pick an emoji and start chatting!</Text>
      <Button title="Pick an emoji" onPress={handleOpenEmojiPicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
