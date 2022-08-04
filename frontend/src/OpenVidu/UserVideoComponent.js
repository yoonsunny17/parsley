import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";

class UserVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // mic, video status
      audioState: false,
      videoState: false,
      isSpeaking: false,
    };
  }
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  forceMicControl(connection) {
    let remoteUsers = this.props.subscribers;
    remoteUsers.forEach((user) => {
      if (user.stream.connection.connectionId === connection.connectionId) {
        user.stream.audioActive = !user.stream.audioActive;

        this.props.storeSession.signal({
          data: user.stream.audioActive,
          to: [connection],
          type: "audio",
        });
      }
    });
    this.props.doUpdateSubscriber(remoteUsers);
  }

  forceVideoControl(connection) {
    let remoteUsers = this.props.subscribers;
    remoteUsers.forEach((user) => {
      if (user.stream.connection.connectionId === connection.connectionId) {
        user.stream.videoActive = !user.stream.videoActive;

        this.props.storeSession.signal({
          data: user.stream.videoActive,
          to: [connection],
          type: "video",
        });
      }
    });
    this.props.doUpdateSubscriber(remoteUsers);
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="w-full h-auto">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div className="absolute bg-font4 px-[5px] text-font1 font-bold rounded-br-[4px]">
              {this.getNicknameTag()}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default UserVideoComponent;
