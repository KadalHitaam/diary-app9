import { useEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { fetchDiaries } from "../../src/features/diary/diarySlice";
import { DiaryCard } from "../../src/components/DiaryCard";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { entries, loading, error } = useAppSelector((state) => state.diary);

  useEffect(() => { dispatch(fetchDiaries()); }, [dispatch]);

  if (loading && entries.length === 0) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Mengambil diary...</Text></View>;
  if (error && entries.length === 0) return <View style={styles.center}><Text style={styles.error}>{error}</Text><Pressable onPress={() => dispatch(fetchDiaries())}><Text>Coba Lagi</Text></Pressable></View>;

  return <View style={styles.container}>
    <Text style={styles.heading}>Buku Harian</Text>
    <FlatList
      data={entries}
      keyExtractor={(item) => String(item.id)}
      refreshing={loading}
      onRefresh={() => dispatch(fetchDiaries())}
      renderItem={({ item }) => <DiaryCard item={item} onPress={() => router.push({ pathname: "/detail/[id]", params: { id: String(item.id) } })} />}
      ListEmptyComponent={<Text style={styles.empty}>Belum ada diary.</Text>}
    />
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8FAFC" },
  heading: { fontSize: 26, fontWeight: "700", marginBottom: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  error: { color: "#EF4444" },
  empty: { textAlign: "center", marginTop: 40, color: "#6B7280" },
});
