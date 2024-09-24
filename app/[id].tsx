import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getMovieById } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";
import useFilterStore from "@/state/filterStore";
import MovieDetail from "@/components/MovieDetail";

const MovieDetailScreen = () => {
  const { language } = useFilterStore();
  const { id } = useLocalSearchParams();
  const numberId = Number(id);
  const navigation = useNavigation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(numberId, language),
  });

  useLayoutEffect(() => {
    if (data) {
      navigation.setOptions({
        headerTitle: data.title,
      });
    }
  }, [navigation, data]);

  if (isError) {
    return (
      <View style={styles.errorScreen}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size={50} color={"black"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MovieDetail movie={data} />
    </View>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  errorScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
