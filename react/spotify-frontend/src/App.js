import './App.css';
import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
  const CLIENT_ID = "350dd1e6e0d044d1997eabe8c0108c22"
  const REDIRECT_URI = "http://localhost:3001/spotify/v1/auth"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])

  const [token, setToken] = useState("")

  useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)

  }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    setArtists(data.artists.items)
}
const renderArtists = () => {
  return artists.map(artist => (
      <div key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
      </div>
  ))
}

const searchAlbums = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "album"
      }
  })

  setAlbums(data.albums.items)
}
const renderAlbums = () => {
return albums.map(album => (
    <div key={album.id}>
        {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
        {album.name}
    </div>
))
}

const searchSongs = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "track"
      }
  })

  setSongs(data.tracks.items)
}
const renderSongs = () => {
return songs.map(song => (
    <div key={song.id}>
        {song.name}
    </div>
))
}



  return (
      <div className="App">
          <header className="App-header">
              <h1>Spotify React</h1>
              {!token ?
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                  : <button onClick={logout}>Logout</button>}
                  <h2>Scroll down to access search bars</h2>
          </header>
          <form onSubmit={searchArtists}>
            <h3>Search Artists</h3>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search Artists</button>
          </form>

          <form onSubmit={searchAlbums}>
            <h3>Search Albums</h3>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search Albums</button>
          </form>

          <form onSubmit={searchSongs}>
            <h3>Search Songs</h3>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search Songs</button>
          </form>
{renderArtists()}
{renderAlbums()}
{renderSongs()}
      </div>
  );
}

export default App;