import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { generatePlan } from "@earnpath/core";
import type { UserProfileInput } from "@earnpath/core";

const demoProfile: UserProfileInput = {
  city: "Istanbul",
  country: "TR",
  locale: "en",
  educationLevel: "highschool",
  deviceAccess: "phone",
  dailyTimeBudget: "2",
  workMode: "any",
  incomeUrgency: "now",
  languages: ["tr", "en"],
  skills: ["communication", "field"],
  constraints: ""
};

export default function HomeScreen() {
  const plan = generatePlan(demoProfile);
  const routes = [plan.bestRoute, ...plan.alternatives];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.mark}>
            <Text style={styles.markText}>EP</Text>
          </View>
          <View style={styles.brandCopy}>
            <Text style={styles.title}>EarnPath</Text>
            <Text style={styles.subtitle}>Your 30-day route to income</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.kicker}>Today</Text>
          <Text style={styles.summaryTitle}>{plan.bestRoute.name}</Text>
          <Text style={styles.muted}>Start with the fastest realistic path, then track every application.</Text>
        </View>

        <Text style={styles.sectionTitle}>Recommended routes</Text>
        {routes.map((route, index) => (
          <View style={index === 0 ? styles.selectedCard : styles.card} key={route.id}>
            <View style={styles.cardHeader}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.score}>{route.score}% fit</Text>
            </View>
            <Text style={styles.cardTitle}>{route.name}</Text>
            <Text style={styles.muted}>{route.shortDescription}</Text>
            <Text style={styles.window}>{route.incomeWindowLabel}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>30-day plan</Text>
        {plan.timeline.map((task) => (
          <View style={styles.task} key={task.day}>
            <Text style={styles.day}>{task.day}</Text>
            <Text style={styles.cardTitle}>{task.title}</Text>
            <Text style={styles.muted}>{task.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f5f6"
  },
  container: {
    padding: 18,
    gap: 12
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8
  },
  brandCopy: {
    flex: 1
  },
  mark: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f7a5f"
  },
  markText: {
    color: "#fff",
    fontWeight: "800"
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#162026"
  },
  subtitle: {
    color: "#5d6972"
  },
  summary: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#eef3f4",
    borderWidth: 1,
    borderColor: "#d8e0e4",
    gap: 6
  },
  kicker: {
    color: "#0a5f4a",
    fontWeight: "800",
    textTransform: "uppercase"
  },
  summaryTitle: {
    color: "#162026",
    fontSize: 21,
    fontWeight: "800"
  },
  sectionTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "800",
    color: "#162026"
  },
  card: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d8e0e4",
    gap: 7
  },
  selectedCard: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f4fbf8",
    borderWidth: 1,
    borderColor: "#91cbb9",
    gap: 7
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  rank: {
    color: "#0a5f4a",
    fontWeight: "800"
  },
  task: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d8e0e4",
    gap: 6
  },
  score: {
    color: "#2357a5",
    fontWeight: "800"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#162026"
  },
  muted: {
    color: "#5d6972",
    lineHeight: 20
  },
  window: {
    color: "#2357a5",
    fontWeight: "800"
  },
  day: {
    color: "#0a5f4a",
    fontWeight: "800"
  }
});
