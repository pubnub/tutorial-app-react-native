import React, { useCallback } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

export const ChatView = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Lmao</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  }
});
