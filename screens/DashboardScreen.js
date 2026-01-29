import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchSalesPartnerCoupon } from "../services/salesPartnerService";

export default function DashboardScreen() {
  const [username, setUsername] = useState("User");
  const [dashboard, setDashboard] = useState({
    totalSubscribers: 0,
    revenue: 0,
    incentive: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadDashboard = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);

    try {
      const storedData = await AsyncStorage.getItem("longbowsp");
      if (!storedData) throw new Error("Admin data not found");

      const adminData = JSON.parse(storedData);
      setUsername(adminData.name || "User");

      const data = await fetchSalesPartnerCoupon(adminData.adminId);

      const totalSubscribers =
        Number(data.totalSubscribedStudentsNEETPG || 0) +
        Number(data.totalSubscribedStudentsNEETSS || 0) +
        Number(data.totalSubscribedStudentsFMGE || 0);

      setDashboard({
        totalSubscribers,
        revenue: Number(data.usedFund || 0),
        incentive: Number(data.availableFund || 0),
      });

      setError(null);
    } catch (err) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDashboard(true);
  }, []);

  /* 🔄 Full screen loader */
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0F172A" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.welcome}>
        Welcome {username}, check your dashboard
      </Text>

      <View style={styles.cardsRow}>
        <View style={[styles.card, { backgroundColor: "#DFF6F8" }]}>
          <Text>Total Subscribers</Text>
          <Text style={styles.value}>{dashboard.totalSubscribers}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#E8EDFF" }]}>
          <Text>Your Incentive</Text>
          <Text style={styles.value}>
            {dashboard.incentive.toLocaleString("en-IN")}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: "#E4FAF1" }]}>
          <Text>Revenue Generated</Text>
          <Text style={styles.value}>
            {dashboard.revenue.toLocaleString("en-IN")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FBFD",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FBFD",
  },
  loadingText: {
    marginTop: 10,
    color: "#64748B",
  },
  welcome: {
    fontSize: 16,
    marginBottom: 20,
    color: "#334155",
  },
  cardsRow: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  value: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#9bb4ee",
  },
});
