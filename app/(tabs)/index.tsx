import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { getMoviesList } from "@/api/movies";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import useFilterStore from "@/state/filterStore";

export default function TabOneScreen() {
  const { language, urlEnd } = useFilterStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["movies", language, urlEnd],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        getMoviesList({ page: pageParam, urlEnd: urlEnd, lng: language }),
      getNextPageParam: (lastPage, pages) => {
        const totalPages = lastPage.total_pages;
        const nextPage = pages.length + 1;
        return nextPage <= totalPages ? nextPage : undefined;
      },
    });

  const movies = data?.pages.flatMap((page) => page.results) || [];

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={6}
        data={movies}
        numColumns={2}
        renderItem={renderMovieItem}
        keyExtractor={useCallback((item: Movie) => item.id.toString(), [])}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        windowSize={10}
        maxToRenderPerBatch={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
