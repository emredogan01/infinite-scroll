import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { MovieDetailProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovieToWatchList } from "@/api/watchList";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = ({ movie }: { movie: MovieDetailProps }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => addMovieToWatchList(movie.id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["watchList"] });
      alert("Movie added to watchlist successfully!");
    },
    onError: () => {
      alert("An error occurred while adding the movie to the watchlist.");
    },
  });

  const toggleFavorite = () => {
    mutate();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Movie Poster */}
      <View style={styles.posterContainer}>
        {!imageLoaded && (
          <View style={styles.placeholder}>
            <ActivityIndicator size="large" color="#888" />
          </View>
        )}
        <Image
          source={{ uri: `${BASE_IMAGE_URL}${movie.poster_path}` }}
          style={styles.poster}
          onLoadStart={() => setImageLoaded(false)}
          onLoadEnd={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
      </View>

      {/* Movie Title and Favorite Icon */}
      <View style={styles.header}>
        <Text style={styles.title}>{movie.title}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={"bookmark"} size={30} color={"black"} />
        </TouchableOpacity>
      </View>

      {/* Movie Overview */}
      <Text style={styles.overview}>{movie.overview}</Text>

      {/* Genres */}
      <View style={styles.genresContainer}>
        {movie.genres.map((genre) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>

      {/* Movie Details */}
      <View style={styles.detailRow}>
        <Text style={styles.detailText}>Release Date:</Text>
        <Text style={styles.detailValue}>{movie.release_date}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailText}>Runtime:</Text>
        <Text style={styles.detailValue}>{movie.runtime} min</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailText}>Vote Average:</Text>
        <Text style={styles.detailValue}>{movie.vote_average} / 10</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailText}>Vote Count:</Text>
        <Text style={styles.detailValue}>{movie.vote_count}</Text>
      </View>

      {/* Production Companies */}
      <View style={styles.productionContainer}>
        <Text style={styles.productionTitle}>Production Companies:</Text>
        {movie.production_companies.map((company) => (
          <Text key={company.id} style={styles.companyName}>
            {company.name} ({company.origin_country})
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  posterContainer: {
    aspectRatio: 6 / 9,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    aspectRatio: 6 / 9,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  overview: {
    fontSize: 16,
    color: "#333",
    marginVertical: 16,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  genre: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    color: "#555",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
    color: "#555",
  },
  productionContainer: {
    marginTop: 16,
    marginBottom: 40,
  },
  productionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  companyName: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
});
