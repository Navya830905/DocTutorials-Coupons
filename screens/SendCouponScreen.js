import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import Input from "../components/User/Input";// adjust path if needed
import Button from "../components/ui/Button"; // adjust path if needed

function SendCouponScreen() {
  const [course, setCourse] = useState("");
  const [plan, setPlan] = useState("");
  const [duration, setDuration] = useState("");
  const [discount, setDiscount] = useState("");
  const [countryCode, setCountryCode] = useState("India");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  function submitHandler() {}

  function resetHandler() {
    setCourse("");
    setPlan("");
    setDuration("");
    setDiscount("");
    setCountryCode("India");
    setMobile("");
    setEmail("");
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Send Coupon Code</Text>

        {/* 1. Course */}
        <Input
          label="Course *"
          placeholder="Select course"
          value={course}
          onUpdateValue={setCourse}
        />

        {/* 2. Plan */}
        <Input
          label="Plan ID *"
          placeholder="Select plan"
          value={plan}
          onUpdateValue={setPlan}
        />

        {/* 3. Duration */}
        <Input
          label="Duration in Months *"
          placeholder="Enter duration"
          keyboardType="number-pad"
          value={duration}
          onUpdateValue={setDuration}
        />

        {/* 4. Discount */}
        <Input
          label="Discount Percent *"
          placeholder="Enter discount"
          keyboardType="number-pad"
          value={discount}
          onUpdateValue={setDiscount}
        />

        {/* 5. Country Code */}
        <Input
          label="Country Code *"
          placeholder="India"
          value={countryCode}
          onUpdateValue={setCountryCode}
        />

        {/* 6. Mobile */}
        <Input
          label="Mobile No. *"
          placeholder="Enter mobile number"
          keyboardType="phone-pad"
          value={mobile}
          onUpdateValue={setMobile}
        />

        {/* 7. Email */}
        <Input
          label="Email ID *"
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onUpdateValue={setEmail}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <Button onPress={submitHandler}>Submit</Button>
          </View>

          <View style={styles.buttonWrapper}>
            <Button onPress={resetHandler}>Reset</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SendCouponScreen;


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
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },
});
