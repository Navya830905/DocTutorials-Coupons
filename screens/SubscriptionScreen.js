import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";

import Input from "../components/User/Input";
import Button from "../components/ui/Button";

const COURSES = [
  "NEET PG",
  "NEET SS",
  "FMGE",
  "MBBS Curriculum",
  "PG Residency",
];

function SubscriptionScreen() {
  const [course, setCourse] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  function selectCourseHandler(value) {
    setCourse(value);
    setShowDropdown(false);
    Keyboard.dismiss();
  }

  function submitHandler() {}

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        setShowDropdown(false);
        Keyboard.dismiss();
      }}
    >
      <ScrollView
        contentContainerStyle={styles.screen}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Get Active Subscriptions</Text>

          {/* ⬇️ Input + Dropdown wrapper */}
          <View style={styles.selectWrapper}>
            <Pressable onPress={() => setShowDropdown(true)}>
              <Input
                label="Course *"
                placeholder="Select course"
                value={course}
                editable={false}
                onUpdateValue={() => {}}
                style={styles.inputOverride}
              />
            </Pressable>

            {/* 🔥 Floating Dropdown */}
            {showDropdown && (
              <View style={styles.dropdown}>
                {COURSES.map((item) => (
                  <Pressable
                    key={item}
                    style={({ pressed }) => [
                      styles.option,
                      pressed && styles.optionPressed,
                    ]}
                    onPress={() => selectCourseHandler(item)}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Submit stays FIXED */}
          <View style={styles.buttonContainer}>
            <Button onPress={submitHandler}>Submit</Button>
          </View>
        </View>
      </ScrollView>
    </Pressable>
  );
}

export default SubscriptionScreen;


const styles = StyleSheet.create({
  screen: {
    padding: 16,
    backgroundColor: "#F3F4F6",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },

  /* 🔑 wrapper for absolute dropdown */
  selectWrapper: {
    position: "relative",
    zIndex: 10,
  },

  inputOverride: {
    paddingRight: 40,
  },

  /* 🔥 FLOATING dropdown */
  dropdown: {
    position: "absolute",
    top: 78,               // below label + input
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    zIndex: 1000,
    elevation: 5,
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  optionPressed: {
    backgroundColor: "#2563EB", // blue highlight like web
  },
  optionText: {
    fontSize: 15,
    color: "#111827",
  },

  buttonContainer: {
    marginTop: 16,
  },
});
