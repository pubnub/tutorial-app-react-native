import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StartupView } from "./src/views/Startup";
import { ChatView } from "./src/views/Chat";
import { PubNubContainer } from "./src/pubnub";

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PubNubContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log in" component={StartupView} />
          <Stack.Screen name="Chat" component={ChatView} />
        </Stack.Navigator>
      </PubNubContainer>
    </NavigationContainer>
  );
}
