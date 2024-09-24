import { Languages, UrlEnds } from "@/types";
const key = process.env.EXPO_PUBLIC_API_KEY;

const baseUrl = "https://api.themoviedb.org/3/movie";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${key}`,
};

type TopRatedMoviesType = {
  urlEnd?: UrlEnds;
  page: number;
  lng?: Languages;
};

export const getMoviesList = async ({
  page = 1,
  urlEnd = "top_rated",
  lng = "en-US",
}: TopRatedMoviesType) => {
  const options = {
    method: "GET",
    headers,
  };
  try {
    const res = await fetch(
      `${baseUrl}/${urlEnd}?language=${lng}&page=${page}`,
      options
    );
    if (!res.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await res.json();
  } catch (error) {
    throw new Error("Something went wrong fetching the movies!");
  }
};

export const getMovieById = async (id: number, lng: Languages) => {
  const options = {
    method: "GET",
    headers,
  };

  try {
    const res = await fetch(`${baseUrl}/${id}?language=${lng}`, options);
    if (!res.ok) {
      throw new Error("Failed to fetch movie");
    }
    return await res.json();
  } catch (error) {
    throw new Error("Something went wrong fetching the movie!");
  }
};
