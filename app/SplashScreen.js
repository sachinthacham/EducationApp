import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useRouter } from "expo-router";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo3.png")} style={styles.appLogo} />
      <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#011638",
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  loader: {
    marginTop: 20,
  },
  appLogo: {
    width: 300,
    height: 100,
  },
});

export default SplashScreen;
