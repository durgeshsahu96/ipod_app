import React from 'react';
import Navbar from '../components/Navbar';
import Menu from '../components/Menu';
import Music from '../components/Music';
import Songs from '../components/Songs';
import Settings from '../components/Settings';
import Playing from '../components/Playing';
import "../assets/css/Display.css"
import LockScreen from './LockScreen';

// Display is the basis of what the current menu is this item will render only that component
// And also this displays the navigation bar
// Key for displaying menu
// {-2: lock screen, -1 : main menu, 0 : now playing, 1: music menu, 2,5,6 : other menu, 3: setings menu,4:songs menu, 7:music playing}

class Display extends React.Component {
    render() {
        const { active, currentMenu, menuItems, musicItems,songItems, playing, songIndex, audio, songUrl ,songImgUrl,wallpaper,wallpaperItems} = this.props;
        
        return (
            <div style={{backgroundImage:`url(${wallpaperItems[wallpaper]})`}} className="display">
                <Navbar playing={playing} />
                {currentMenu===-2&&<LockScreen/>}
                {currentMenu === -1 && <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />}
                {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}
                {currentMenu === 2 && <div className="blank-div_1"></div>}
                {currentMenu === 3 && <Settings active={active}/>}
                {currentMenu === 4 && <Songs songItems={songItems} active={active} />}
                {currentMenu === 5 && <div className="blank-div"><h1 className="empty-text">Artists</h1></div>}
                {currentMenu === 6 && <div className="blank-div"><h1 className="empty-text">Albums</h1></div>}
                {(currentMenu === 0 ||currentMenu===7) && <Playing songImgUrl={songImgUrl} audio={audio} songUrl={songUrl} playing={playing} songIndex={songIndex} songItems={songItems} />}
            </div>
        )
    }
}


export default Display;