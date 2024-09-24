const key = process.env.EXPO_PUBLIC_API_KEY;
import { Languages } from "@/types";

export const addMovieToWatchList = async (movieId: number) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    }),
  };

  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/account/20848113/watchlist",
      options
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    throw new Error("Something is wrong adding to movies, try later!");
  }
};

export const getWatchListMovies = async (lng: Languages) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${key}`,
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/account/20848113/watchlist/movies?language=${lng}&page=1&sort_by=created_at.desc`,
      options
    );
    if (res.ok) {
      const data = await res.json();
      return data.results;
    }
  } catch (error) {
    throw new Error("Something is wrong adding to movies, try later!");
  }
};
