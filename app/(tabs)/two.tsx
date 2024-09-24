import { ActivityIndicator, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import { getWatchListMovies } from "@/api/watchList";
import useFilterStore from "@/state/filterStore";
import { FlatList } from "react-native";
import { Movie } from "@/types";

export default function TabTwoScreen() {
  const { language } = useFilterStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["watchList"],
    queryFn: () => getWatchListMovies(language),
  });

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} color={"black"} />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        initialNumToRender={6}
        data={data}
        numColumns={2}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item: Movie) => item.id.toString()}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
  },
});
