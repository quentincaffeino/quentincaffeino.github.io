import SpotifyWebApi from "spotify-web-api-node";
import isResponseOk from "$lib/utils/isResponseOk";
import parseJsonResponseBody from "$lib/utils/parseJsonResponseBody";
import TopArtists from "./TopArtists.svelte";

export const component = TopArtists;

export const name = "topartists";

const URL_BASE = "https://ws.audioscrobbler.com/2.0";
const urlSearchParams = new URLSearchParams({
  method: "user.gettopartists",
  user: import.meta.env.VITE_LASTFM_USER,
  api_key: import.meta.env.VITE_LASTFM_API_KEY,
  period: "7day",
  limit: 12,
  format: "json",
});
const URL = URL_BASE + "?" + urlSearchParams.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIDY_CLIENT_SECRET,
});

export async function load({ fetch }) {
  await spotifyApi
    .clientCredentialsGrant()
    .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
    .catch((err) =>
      console.error("Something went wrong when retrieving an access token", err)
    );

  const lastfm = await fetch(URL)
    .then(isResponseOk)
    .then(parseJsonResponseBody);

  for (const artist of lastfm.topartists.artist) {
    const spArtist = await spotifyApi
      .searchArtists(artist.name, { limit: 1 })
      .then((data) => data.body.artists.items[0])
      .catch((err) => console.error(err));

    artist.spotify = {};
    artist.spotify.url = spArtist?.external_urls?.spotify || "";
    artist.spotify.images = spArtist?.images;
  }

  return lastfm;
}

export default TopArtists;
