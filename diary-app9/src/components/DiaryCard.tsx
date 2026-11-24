import { Pressable, StyleSheet, Text, View } from "react-native";
import type { DiaryEntry } from "../services/diaryApi";

export function DiaryCard({ item, onPress }: { item: DiaryEntry; onPress: () => void }) {
  return <Pressable style={styles.card} onPress={onPress}>
    <Text style={styles.mood}>{item.mood}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.diary_date}</Text>
      <Text numberOfLines={2}>{item.preview}</Text>
    </View>
  </Pressable>;
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 14, marginBottom: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 14 },
  mood: { fontSize: 32 },
  title: { fontSize: 17, fontWeight: "700" },
  date: { color: "#6B7280", marginVertical: 4 },
});
