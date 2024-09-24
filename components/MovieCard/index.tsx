import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Movie } from "@/types";
import { Link } from "expo-router";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = React.memo(({ movie }: { movie: Movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/${movie.id}`} asChild>
      <Pressable style={styles.container}>
        {/* Placeholder Background */}
        <View style={styles.imageContainer}>
          {!imageLoaded && (
            <View style={styles.placeholder}>
              <ActivityIndicator size="small" color="#888" />
            </View>
          )}

          {/* Movie Poster */}
          <Image
            source={{ uri: `${BASE_IMAGE_URL}${movie.poster_path}` }}
            style={styles.cardImg}
            onLoadStart={() => setImageLoaded(false)}
            onLoadEnd={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        </View>

        {/* Movie Title */}
        <Text style={styles.title}>{movie.title}</Text>
      </Pressable>
    </Link>
  );
});

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 3 / 5,
    borderRadius: 7,
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
  cardImg: {
    width: "100%",
    aspectRatio: 3 / 5,
    borderRadius: 7,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 1,
  },
});
