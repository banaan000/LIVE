  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQD-kAOCg330WseDCjVjKzjSX4LZZ94WB1278dyzlqS2rLfUIhOVkAOah2JIzs90RqLilJbuiHATz4gZF1G_hk2PI45UYtJK6-mMBkI3KBpmRDu1YpN5UXMGrH5_y8rYgp2OMhphskezUgdvfv1DTGXh4oicBNXDGlzXeNliU0CKKmHRZHofdq4';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
      localStorage.setItem('player_state', JSON.stringify(state));
      //Song name
      document.getElementById("player_state_songname").innerHTML = 'Playing: ' + JSON.stringify(state['track_window']['current_track']['name']);

      if (state['track_window']['current_track']['name'][1] =! 'undefined') {
          document.getElementById("player_state_songartist").innerHTML = 'By:' + JSON.stringify(state['track_window']['current_track']['artists'][0]['name']) + JSON.stringify(state['track_window']['current_track']['artists'][1]['name']);
        } else {
          document.getElementById("player_state_songartist").innerHTML = 'By:' +JSON.stringify(state['track_window']['current_track']['artists'][0]['name']);
        }
      });
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
  };
