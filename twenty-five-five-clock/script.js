class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timerLabel: "Session",
      isRunning: false
    };

    this.timer = null;

    this.formatTime = this.formatTime.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.playBeep = this.playBeep.bind(this);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(remainingSeconds).padStart(2, "0")
    );
  }

  incrementBreak() {
    if (this.state.isRunning || this.state.breakLength >= 60) {
      return;
    }

    this.setState(state => ({
      breakLength: state.breakLength + 1
    }));
  }

  decrementBreak() {
    if (this.state.isRunning || this.state.breakLength <= 1) {
      return;
    }

    this.setState(state => ({
      breakLength: state.breakLength - 1
    }));
  }

  incrementSession() {
    if (this.state.isRunning || this.state.sessionLength >= 60) {
      return;
    }

    this.setState(state => ({
      sessionLength: state.sessionLength + 1,
      timeLeft:
        state.timerLabel === "Session"
          ? (state.sessionLength + 1) * 60
          : state.timeLeft
    }));
  }

  decrementSession() {
    if (this.state.isRunning || this.state.sessionLength <= 1) {
      return;
    }

    this.setState(state => ({
      sessionLength: state.sessionLength - 1,
      timeLeft:
        state.timerLabel === "Session"
          ? (state.sessionLength - 1) * 60
          : state.timeLeft
    }));
  }

  toggleTimer() {
    if (this.state.isRunning) {
      clearInterval(this.timer);
      this.timer = null;

      this.setState({
        isRunning: false
      });
    } else {
      this.timer = setInterval(this.tick, 1000);

      this.setState({
        isRunning: true
      });
    }
  }

  tick() {
    this.setState(state => {
      if (state.timeLeft > 0) {
        return {
          timeLeft: state.timeLeft - 1
        };
      }

      this.playBeep();

      if (state.timerLabel === "Session") {
        return {
          timerLabel: "Break",
          timeLeft: state.breakLength * 60
        };
      }

      return {
        timerLabel: "Session",
        timeLeft: state.sessionLength * 60
      };
    });
  }

  playBeep() {
    const beep = document.getElementById("beep");

    if (beep) {
      beep.currentTime = 0;
      beep.play();
    }
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = null;

    const beep = document.getElementById("beep");

    if (beep) {
      beep.pause();
      beep.currentTime = 0;
    }

    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 25 * 60,
      timerLabel: "Session",
      isRunning: false
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="clock">
        <h1 className="clock-title">25 + 5 Clock</h1>

        <div className="length-controls">
          <div className="length-card">
            <h2 id="break-label">Break Length</h2>

            <div className="control-row">
              <button
                id="break-decrement"
                className="length-btn"
                onClick={this.decrementBreak}
              >
                -
              </button>

              <span id="break-length" className="length-value">
                {this.state.breakLength}
              </span>

              <button
                id="break-increment"
                className="length-btn"
                onClick={this.incrementBreak}
              >
                +
              </button>
            </div>
          </div>

          <div className="length-card">
            <h2 id="session-label">Session Length</h2>

            <div className="control-row">
              <button
                id="session-decrement"
                className="length-btn"
                onClick={this.decrementSession}
              >
                -
              </button>

              <span id="session-length" className="length-value">
                {this.state.sessionLength}
              </span>

              <button
                id="session-increment"
                className="length-btn"
                onClick={this.incrementSession}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="timer-panel">
          <div id="timer-label">{this.state.timerLabel}</div>

          <div id="time-left">{this.formatTime(this.state.timeLeft)}</div>
        </div>

        <div className="main-controls">
          <button
            id="start_stop"
            className="main-btn"
            onClick={this.toggleTimer}
          >
            {this.state.isRunning ? "Pause" : "Start"}
          </button>

          <button
            id="reset"
            className="main-btn"
            onClick={this.resetTimer}
          >
            Reset
          </button>
        </div>

        <audio
          id="beep"
          preload="auto"
          src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
