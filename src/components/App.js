import React from 'react';
// Import css file
import '../assets/css/App.css';
// Import ipod_app body file
import Case from './Case.js';

// Import songs
import song1 from "../assets/Music/song_1.mp3"
import song2 from "../assets/Music/song_2.mp3"
import song3 from "../assets/Music/song_3.mp3"
import song4 from "../assets/Music/song_4.mp3"
import song5 from "../assets/Music/song_5.mp3"

// Import song cover images
import song1_Img from "../assets/Images/song_1.jpg";
import song2_Img from "../assets/Images/song_2.png";
import song3_Img from "../assets/Images/song_3.jpg";
import song4_Img from "../assets/Images/song_4.jpg";
import song5_Img from "../assets/Images/song_5.jpg";

// Import wallpaper
import Wallpaper from "../assets/Images/wallpaper.jpg"


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0,  //Active list item
      menuItems: ["Now Playing", "Music", "Games", "Settings"], //Menu Items
      musicItems: ["All Songs", "Artists", "Albums"], //Items in music menu
      songItemsUrl: [song1, song2, song3,song4,song5,],  //Songs list
      songImgItemsUrl: [song1_Img, song2_Img, song3_Img,song4_Img,song5_Img,],  //Song images list
      wallpaperItems: [Wallpaper], //Wallpaper
      songItems: ["1.Raataan Lambiyan","2.Lehra Do","3.Baliye Re","4.Baarish Ban Jaana","5.Dil Galti Kar Baitha Hai"], //Song names
      songIndex: 0, //Current song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4,3:2}, //Length of a particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6],3:[-1]}, //Which menu can be rendered by key menu
      currentMenu: -2, //Current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //Current song url
      playing: false, //Playing or not
      theme: "rgb(210, 210, 210)", //Current body theme
      audio: new Audio(song1), //Current audio file
      songImgUrl: song1_Img, //Current song img for now playing
      wheelColor: "white", //Current wheel color
      wallpaper: 0, //Current wallpaper
    }
  }

  // FUNCTION FOR :- ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState)=>{
        prevState.audio.currentTime += interval; 
        return prevState;
      })
    }
  }

  // FUNCTION FOR :- ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState)=>{
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
  }

  // FUNCTION FOR :- TOGGLE SONG PLAY AND PAUSE
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    }
    else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  }

  // FUNCTION FOR :- UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  updateActiveMenu = (direction, menu) => {

    if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 3) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min })
      } else {
        this.setState({ active: this.state.active + 1 })
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max })
      } else {
        this.setState({ active: this.state.active - 1 })
      }
    }
  }

  // FUNCTION FOR :- CHANGE PLAYING MUSIC
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState({ currentMenu: 7, songUrl: songUrl, navigationStack: navigationStack, active: 0, playing: true, songIndex: id, audio: new Audio(songUrl), songImgUrl: songImgUrl }, () => {
      this.state.audio.play();
    });
    return;
  }

  // FUNCTION FOR :- CHANGE MENU BACKWARDS ON PRESS OF CENTER BUTTON
  changeMenuBackward = () => {

    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    }
    else {
      const prevId = navigationStack.pop();
      this.setState({ currentMenu: prevId, navigationStack: navigationStack, active: 0 });
      return;
    }

  }

  // FUNCTION FOR :- CHANGE MENU FORWARD ON PRESS OF CENTER BUTTON USING NAVIGATION STACK
  changeMenuForward = (id, fromMenu) => {

    const navigationStack = this.state.navigationStack.slice();

    if (fromMenu !== -2 && fromMenu !== -1 && fromMenu !== 1 && fromMenu !== 4 && fromMenu !== 3 && fromMenu !== 0 && fromMenu !== 7) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: -1, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: id, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({ currentMenu: currentMenuID, navigationStack: navigationStack, active: 0 });

  }

  // FUNCTION FOR :- RENDERING APP
  render() {
    const { audio, active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, theme, songUrl, songImgUrl, wheelColor, wallpaper, wallpaperItems } = this.state;
    return (
      <div className="App">
        <Case songIndex={songIndex} active={active} menuItems={menuItems} musicItems={musicItems} currentMenu={currentMenu} changeMenuForward={this.changeMenuForward} changeMenuBackward={this.changeMenuBackward} updateActiveMenu={this.updateActiveMenu} togglePlayPause={this.togglePlayPause} songItems={songItems} playing={playing} theme={theme} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} seekSongForward={this.seekSongForward} seekSongReverse={this.seekSongReverse} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems}/>
      </div>
    );
  }
}

export default App;

