import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { ClickProvider } from "./context/ClickContext";

export default function Layout() {
  return (
    <AuthProvider>
      <ClickProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ClickProvider>
    </AuthProvider>
  );
}
