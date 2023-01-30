import React from 'react';

const Login = () => {
    return (
        <div>
            <h3>Please Sign In</h3>
            <p>In order to search for artists, tracks, or songs <br /> you must login to your Spotify account</p>
            <a href="http://localhost:3001/spotify/v1/login" >Sign In</a>
      </div>
    );
}

export default Login;

