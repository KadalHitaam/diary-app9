import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { editDiary } from "../../src/features/diary/diarySlice";

export default function EditScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = useLocalSearchParams<{ id: string }>();
  const entry = useAppSelector((state) => state.diary.entries.find((item) => item.id === Number(id)));
  const [title, setTitle] = useState(entry?.title || "");
  const [body, setBody] = useState(entry?.body || "");
  const [mood, setMood] = useState(entry?.mood || " ");
  if (!entry) return <Text style={{ padding: 16 }}>Diary tidak ditemukan.</Text>;

  const save = async () => {
    try { await dispatch(editDiary({ id: entry.id, data: { title: title.trim(), body: body.trim(), mood } })).unwrap(); router.replace({ pathname: "/detail/[id]", params: { id: String(entry.id) } }); }
    catch { Alert.alert("Error", "Gagal memperbarui diary"); }
  };

  return <View style={styles.container}><Text style={styles.heading}>Edit Diary</Text><TextInput value={title} onChangeText={setTitle} style={styles.input} /><TextInput value={body} onChangeText={setBody} multiline style={[styles.input, styles.body]} /><TextInput value={mood} onChangeText={setMood} style={styles.input} /><Pressable onPress={save} style={styles.button}><Text style={styles.white}>Simpan Perubahan</Text></Pressable></View>;
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, gap: 12, backgroundColor: "#F8FAFC" }, heading: { fontSize: 24, fontWeight: "700" }, input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 14, padding: 12, backgroundColor: "#fff" }, body: { minHeight: 140, textAlignVertical: "top" }, button: { padding: 14, alignItems: "center", borderRadius: 14, backgroundColor: "#2563EB" }, white: { color: "#fff", fontWeight: "700" } });
