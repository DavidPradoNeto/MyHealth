import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#419ED7" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  }
});

export default Loader;