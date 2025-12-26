import SpotifyWebApi from "spotify-web-api-node";
import isResponseOk from "$lib/utils/isResponseOk";
import parseJsonResponseBody from "$lib/utils/parseJsonResponseBody";
import TopArtists from "./TopArtists.svelte";

export const component = TopArtists;

export const name = "topartists";

async function getTopArtistsFromLastFm({ fetch }) {
  const user = import.meta.env.VITE_LASTFM_USER;
  if (!user) {
    throw new Error("lastfm username is not defined");
  }
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
  if (!apiKey) {
    throw new Error("lastfm api key is not defined");
  }

  const URL_BASE = "https://ws.audioscrobbler.com/2.0";
  const urlSearchParams = new URLSearchParams({
    method: "user.gettopartists",
    user,
    api_key: apiKey,
    period: "7day",
    limit: 12,
    format: "json",
  });
  const URL = URL_BASE + "?" + urlSearchParams.toString();

  return await fetch(URL)
    .then(isResponseOk)
    .then(parseJsonResponseBody);
}

async function populateArtistsWithSpotifyData({ artists }) {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  if (!clientId) {
    throw new Error("spotify client id is not defined");
  }
  const clientSecret = import.meta.env.VITE_SPOTIDY_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("spotify client secret is not defined");
  }

  const spotifyApi = new SpotifyWebApi({ clientId, clientSecret });

  await spotifyApi
    .clientCredentialsGrant()
    .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
    .catch((err) =>
      console.error("Something went wrong when retrieving an access token", err)
    );

  for (const artist of artists) {
    const spArtist = await spotifyApi
      .searchArtists(artist.name, { limit: 1 })
      .then((data) => data.body.artists.items[0])
      .catch((err) => console.error(err));

    artist.spotify = {
      url: spArtist?.external_urls?.spotify || "",
      images: spArtist?.images,
    };
  }
}

export async function load({ fetch }) {
  const data = await getTopArtistsFromLastFm({ fetch })
    .catch((error) => {
      console.warn(error);

      return {
        topartists: {
          artist: []
        },
        error: {
          message: error.message
        },
      }
    });

  if (!data.error) {
    await populateArtistsWithSpotifyData({ artists: data.topartists.artist })
      .catch(console.warn);
  }

  return data;
}

export default TopArtists;
