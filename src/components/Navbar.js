import React from 'react';
import "../assets/css/Navbar.css"
import BatImg from "../assets/Images/battery.png"

// Render navbar
class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            time: this.getCurrentTime(),
        }
        this.stateId = "";
    }

    // set an interval of 60 seconds to update time
    componentDidMount() {
        this.stateId = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 1000);
    }
    componentDidUpdate() {
        setTimeout(function(){
        },60000)
    }

    //Clear the update time interval
    componentWillUnmount() {
        clearInterval(this.stateId);
    }

    //For getting current time in string
    getCurrentTime() {
        const today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        if (today.getMinutes() < 10) {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        return time;
    }

    // Render navbar to show ipod.js logo, play-pause icon, wifi icon, battery icon and time
    render() {
        const { time } = this.state;
        const { playing } = this.props;
        return (
            <div className="bar">
                {<h3 className="time">{time}</h3>}
                {<h5 className="heading">iPod.js<span><i className="fas fa-wifi"></i></span></h5>}
                {<div className="right-container-nav">
                    {playing ? <h5 className="play-pause-nav"><i className="fas fa-pause"></i></h5> : <h5 className="play-pause-nav"><i className="fas fa-play"></i> </h5>}
                    <img className="battery" src={BatImg} alt="Battery" />
                </div>}
            </div>
        )
    }
}


export default Navbar;