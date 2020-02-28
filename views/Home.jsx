import React, { useCallback } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { Emoji } from "emoji-mart-native";

export const HomeView = ({ navigation }) => {
  const handlePress = () => {
    navigation.replace("EmojiPicker");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.item, marginBottom: 32, marginTop: -32 }}>
        <Emoji native={true} size={64} emoji="globe_with_meridians" />
        <Emoji native={true} size={64} emoji="speech_balloon" />
      </View>

      <View style={{ ...styles.item, marginBottom: 128 }}>
        <Text style={styles.body}>
          This should contain some introduction text.
        </Text>
      </View>

      <View style={styles.item}>
        <Button title="Get started" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  item: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  body: {
    fontSize: 22,
    maxWidth: "75%",
    textAlign: "center"
  }
});
