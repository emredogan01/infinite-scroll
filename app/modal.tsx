import { StyleSheet, Button } from "react-native";
import { View, Text } from "@/components/Themed";
import { Picker } from "@react-native-picker/picker";
import useFilterStore from "@/state/filterStore";
import { useState, useEffect } from "react";
import { UrlEnds, Languages } from "@/types";
import { router } from "expo-router";

type PickerData = {
  language: Languages;
  urlEnd: UrlEnds;
};

export default function ModalScreen() {
  const { setLanguage, setUrlEnd, language, urlEnd } = useFilterStore(); // State'in başlangıç değerini tanımlarken tipini belirtiyoruz
  const [pickerData, setPickerData] = useState<PickerData>({
    language: "en-US",
    urlEnd: "top_rated",
  });

  const handleSetData = () => {
    setLanguage(pickerData.language);
    setUrlEnd(pickerData.urlEnd);
    router.navigate("/(tabs)");
  };

  useEffect(() => {
    setPickerData({
      language: language,
      urlEnd: urlEnd,
    });
  }, [language, urlEnd]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerWrapper}>
        {/* Language Picker */}
        <Text style={styles.label}>Select Language:</Text>
        <Picker
          selectedValue={pickerData.language}
          onValueChange={(itemValue) =>
            setPickerData((prev) => ({ ...prev, language: itemValue }))
          }
          style={styles.picker}
        >
          <Picker.Item label="English (US)" value="en-US" />
          <Picker.Item label="Turkish (TR)" value="tr-TR" />
          <Picker.Item label="Spanish (ES)" value="es-ES" />
          <Picker.Item label="French (FR)" value="fr-FR" />
          <Picker.Item label="German (DE)" value="de-DE" />
          <Picker.Item label="Italian (IT)" value="it-IT" />
          <Picker.Item label="Russian (RU)" value="ru-RU" />
          <Picker.Item label="Japanese (JP)" value="ja-JP" />
          <Picker.Item label="Korean (KR)" value="ko-KR" />
        </Picker>
      </View>
      <View style={styles.pickerWrapper}>
        {/* UrlEnd Picker */}
        <Text style={styles.label}>Select Category:</Text>
        <Picker
          selectedValue={pickerData.urlEnd}
          onValueChange={(itemValue) =>
            setPickerData((prev) => ({ ...prev, urlEnd: itemValue }))
          }
          style={styles.picker}
        >
          <Picker.Item label="Now Playing" value="now_playing" />
          <Picker.Item label="Popular" value="popular" />
          <Picker.Item label="Top Rated" value="top_rated" />
          <Picker.Item label="Upcoming" value="upcoming" />
        </Picker>
      </View>
      {/* Buton */}
      <Button title="Filter Movies" onPress={handleSetData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: 200,
    height: 200,
  },
  label: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  pickerWrapper: {
    marginVertical: 20,
  },
});
