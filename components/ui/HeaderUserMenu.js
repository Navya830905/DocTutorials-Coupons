import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import IconButton from "./IconButton";

export default function HeaderUserMenu() {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    setOpen(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="person-circle-outline"
        size={30}
        color="#0F172A"
        onPress={() => setOpen((prev) => !prev)}
      />

      {open && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={logoutHandler} style={styles.logoutRow}>
            <IconButton
              icon="log-out-outline"
              size={18}
              color="#0F172A"
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  menu: {
    position: "absolute",
    top: 42,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 6,
    width: 130,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  logoutText: {
    fontSize: 14,
    color: "#0F172A",
  },
});
