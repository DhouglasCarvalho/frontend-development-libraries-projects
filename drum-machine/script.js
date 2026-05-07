const drumPads = [
  {
    keyTrigger: "Q",
    id: "Heater-1",
    display: "Heater 1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyTrigger: "W",
    id: "Heater-2",
    display: "Heater 2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyTrigger: "E",
    id: "Heater-3",
    display: "Heater 3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyTrigger: "A",
    id: "Heater-4",
    display: "Heater 4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyTrigger: "S",
    id: "Clap",
    display: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyTrigger: "D",
    id: "Open-HH",
    display: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyTrigger: "Z",
    id: "Kick-n-Hat",
    display: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyTrigger: "X",
    id: "Kick",
    display: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyTrigger: "C",
    id: "Closed-HH",
    display: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "READY"
    };

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    const key = event.key.toUpperCase();
    const pad = drumPads.find(item => item.keyTrigger === key);

    if (pad) {
      this.playSound(pad.keyTrigger, pad.display);
    }
  }

  playSound(key, displayText) {
    const audio = document.getElementById(key);

    if (audio) {
      audio.currentTime = 0;
      audio.play();

      this.setState({
        display: displayText
      });

      const parentPad = audio.parentElement;
      parentPad.classList.add("active");

      setTimeout(() => {
        parentPad.classList.remove("active");
      }, 120);
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <h1 className="machine-title">Drum Machine</h1>
        <p className="machine-subtitle">Click a pad or press Q W E A S D Z X C</p>

        <div id="display">{this.state.display}</div>

        <div className="pad-grid">
          {drumPads.map(pad => (
            <button
              key={pad.keyTrigger}
              className="drum-pad"
              id={pad.id}
              onClick={() => this.playSound(pad.keyTrigger, pad.display)}
            >
              <span className="key">{pad.keyTrigger}</span>
              <span className="sound-name">{pad.display}</span>

              <audio
                className="clip"
                id={pad.keyTrigger}
                src={pad.url}
              />
            </button>
          ))}
        </div>

        <p className="footer-note">MPC-style pad controller · freeCodeCamp project</p>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
