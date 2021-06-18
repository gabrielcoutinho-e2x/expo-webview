import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const runFirst = `
  document.body.style.backgroundColor = 'red';
  setTimeout(function() { window.alert('hi') }, 2000);
  true; // note: this is required, or you'll sometimes get silent failures
`;
  const webView = useRef(null);

  const injectedJs = `
  window.postMessage("Your message");
`;
  const sendPostMessage = () => {
    console.log("Sending post message");
    webView.current.postMessage("Post message from react native!");
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webView}
        source={{
          uri: "https://nextjs-blog-six-amber-27.vercel.app/",
        }}
        // onMessage={(event) => {}}
        // injectedJavaScript={runFirst}
        onMessage={(event) => {
          const { data } = event.nativeEvent;
          console.log("data: ", data);
          setMessage(data);
        }}
      />
      <TouchableHighlight
        style={{
          padding: 10,
          backgroundColor: "blue",
          margin: 40,
          borderRadius: 10,
        }}
        onPress={sendPostMessage}
      >
        <Text style={{ color: "white" }}>
          Send post message from react native
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
