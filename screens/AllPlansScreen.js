import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Input from "../components/User/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPlans } from "../services/planService";
import { COURSES } from "../constants/courses";

export default function AllPlansScreen() {
  const [plansData, setPlansData] = useState([]);
  const [activeCourse, setActiveCourse] = useState(COURSES[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  /* FETCH PLANS WHEN COURSE CHANGES */
  useEffect(() => {
  async function loadPlans() {
    setLoading(true);
    try {
      const adminDataStr = await AsyncStorage.getItem("longbowsp");
      const admin = JSON.parse(adminDataStr);

      const response = await fetchPlans(admin.adminId, activeCourse.id);

      const plans =
        Array.isArray(response)
          ? response
          : Array.isArray(response?.plans)
          ? response.plans
          : [];

      setPlansData(plans);
    } catch (err) {
      setPlansData([]);
    } finally {
      setLoading(false);
    }
  }

  loadPlans();
}, [activeCourse]);

  const filteredPlans = plansData.filter((p) =>
    p.planName.toLowerCase().includes(search.toLowerCase())
  );

  /* LOADING */
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading {activeCourse.name} Plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ================= COURSE TABS ================= */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsWrapper}
      >
        {COURSES.map((course) => {
          const isActive = course.id === activeCourse.id;

          return (
            <Pressable
              key={course.id}
              onPress={() => setActiveCourse(course)}
              style={[
                styles.tab,
                isActive ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {course.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ================= SEARCH ================= */}
      <View style={styles.searchBar}>
        <Text style={styles.searchLabel}>Search:</Text>
        <Input
          value={search}
          onUpdateValue={setSearch}
          placeholder="Type"
          style={styles.searchInput}
        />
      </View>

      {/* ================= TABLE ================= */}
      {filteredPlans.length === 0 ? (
        <View style={styles.centered}>
          <Text>No plans available</Text>
        </View>
      ) : (
        <ScrollView horizontal>
          <View style={styles.tableContainer}>
            {/* HEADER */}
            <View style={styles.headerRow}>
              <Text style={[styles.cell, styles.course]}>Course</Text>
              <Text style={[styles.cell, styles.plan]}>Plan Name</Text>
              <Text style={[styles.cell, styles.duration]}>Details</Text>

            </View>

            {/* ROWS */}
             <ScrollView style={{ maxHeight: 400 }}>
            {filteredPlans.map((plan) => (
              <View key={plan.planID} style={styles.dataRow}>
  {/* COURSE */}
  <Text style={[styles.cell, styles.course]}>
    {activeCourse.name}
  </Text>

  {/* PLAN NAME */}
  <Text style={[styles.cell, styles.plan]}>
    {plan.planName}
  </Text>

  {/* DETAILS */}
  <View style={[styles.cell, styles.duration]}>
    {plan.planDetails?.length > 0 ? (
      plan.planDetails.map((d, i) => (
        <Text key={i} style={styles.durationText}>
          {d.durationInMonths} months — ₹{d.totalPrice}
        </Text>
      ))
    ) : (
      <Text style={styles.durationText}>No details</Text>
    )}
  </View>
</View>

            ))}
             </ScrollView>
          </View>
         
        </ScrollView>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4fbff",
    // justifyContent: 'space-between',
    padding: 12,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* TABS */
  tabsWrapper: {
    // paddingVertical: 3,
    // paddingHorizontal: 5,
    alignItems: "center",
  },

  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },

  activeTab: {
    backgroundColor: "#54d1f3",
  },

  activeTabText: {
    color: "#fff",
  },

  inactiveTab: {
    backgroundColor: "#EAF4FF",
  },

  inactiveTabText: {
    color: "#29e2fe",
  },

  /* SEARCH */
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9beaff",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },

  searchLabel: {
    fontWeight: "600",
    marginRight: 8,
    color: "#000",
    fontSize: 13,
  },

  searchInput: {
    width: 160,
    height: 30,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 13,
  },

  /* TABLE */
  tableContainer: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    overflow: "hidden",
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#e6f9ff",
    borderBottomWidth: 1,
    borderColor: "#bdefff",
  },

  dataRow: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderColor: "#ccefff",
  },

  cell: {
  padding: 12,
  },

  plan: {
  width: 240,
  },

  duration: {
  width: 290,
  },

  durationText: {
  marginBottom: 6,
  color: "#7b7b7b",
  fontSize: 13,
  },
  course: {
  width: 100,
},
});
