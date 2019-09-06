import React, { Component } from 'react';
import ClickableTimer from './ClickableTimer';
import Status from './Status';
import EditableTimer from './EditableTimer';

import {
  tick,
  clickDecreaseWorkTime,
  clickIncreaseWorkTime,

} from './actions';
import './Pomodoro.css';

const defaultWorkTime = 15 * 60;

class Pomodoro extends Component {
  constructor() {
    super();

    this.state = {
      status: 'stoppedWork',
      workTime: defaultWorkTime,
      timeLeft: defaultWorkTime,
    };

    this.handleClickTimer = this.handleClickTimer.bind(this);
    this.handleClickDecreaseWorkTime = this.handleClickDecreaseWorkTime.bind(this);
    this.handleClickIncreaseWorkTime = this.handleClickIncreaseWorkTime.bind(this);


    setInterval(() => {
      this.setState(tick);
    }, 1000);
  }

  handleClickTimer() {
    const { status } = this.state;

    if (status === 'work') {
      this.setState({
        status: 'stoppedWork',
      });
    } else if (status === 'stoppedWork') {
      this.setState({
        status: 'work',
      });
    }
  }

  handleClickDecreaseWorkTime() {
    this.setState(clickDecreaseWorkTime);
  }

  handleClickIncreaseWorkTime() {
    this.setState(clickIncreaseWorkTime);
  }


  render() {
    const { status, workTime, timeLeft } = this.state;

    return (
      <div className="Pomodoro">
        <ClickableTimer
          timeLeft={timeLeft}
          onClick={this.handleClickTimer}
        />
        <Status status={status} />
        <div className="Pomodoro-customise">
          <EditableTimer
            label="Session length"
            time={workTime}
            onClickDecrease={this.handleClickDecreaseWorkTime}
            onClickIncrease={this.handleClickIncreaseWorkTime}
          />
        </div>
      </div>
    );
  }
}

export default Pomodoro;
