import React, { Component, createRef } from "react";
import axios from "axios";
// chat function
import Messages from "./Messages";
import { OpenVidu } from "openvidu-browser";
// import "../StudySession.css"
const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

class SessionChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      sessionData: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.messageContainer = createRef(null);
    this.sendMessageByClick = this.sendMessageByClick.bind(this);
    this.sendMessageByEnter = this.sendMessageByEnter.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
  }

  // 채팅 자동 하단 스크롤
  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
    this.showVideoControls();
  }

  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }

  sendMessageByClick() {
    if (this.state.message !== "") {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: "messagesChatClass",
            entireChatClass: "messagesEntireChatClass",
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: "chat",
      });
    }

    this.setState({
      message: "",
    });
  }

  sendMessageByEnter(e) {
    if (e.key === "Enter") {
      if (this.state.message !== "") {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              userName: this.state.myUserName,
              text: this.state.message,
              chatClass: "messagesChatClass",
              entireChatClass: "messagesEntireChatClass",
            },
          ],
        });
        const mySession = this.state.session;

        mySession.signal({
          data: `${this.state.myUserName},${this.state.message}`,
          to: [],
          type: "chat",
        });

        this.setState({
          message: "",
        });
      }
    }
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on("signal:chat", (event) => {
          let chatdata = event.data.split(",");
          if (chatdata[0] !== this.state.myUserName) {
            this.setState({
              messages: [
                ...this.state.messages,
                {
                  userName: chatdata[0],
                  text: chatdata[1],
                  chatClass: "messagesChatClassOpp",
                  entireChatClass: "messagesEntireChatClassOpp",
                },
              ],
            });
          }
        });
      }
    );
  }

  render() {
    const messages = this.state.messages;
    const mySessionId = this.state.mySessionId;

    return (
      <div className="rounded-2xl flex flex-col bg-font3 w-auto h-full ease-in-out">
        <div className="flex text-start p-2 text-xl h-10">
          {mySessionId} 채팅방
        </div>
        <div
          className="chatbox__messages mt-auto flex flex-col overflow-y-scroll items-end"
          ref="chatoutput"
        >
          <Messages messages={messages} />
        </div>
        <div className="chatbox__footer">
          <input
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="outline-hidden box-border w-52 h-8 input-border"
            id="chat_message"
            type="text"
            placeholder="Write a message..."
            onChange={this.handleChatMessageChange}
            onKeyPress={this.sendMessageByEnter}
            value={this.state.message}
          />
          <button
            className="chatbox__send--footer mt-3 rounded-tr-lg rounded-br-lg"
            onClick={this.sendMessageByClick}
          >
            SEND
          </button>
        </div>
      </div>
    );
  }
  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }
  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  showVideoControls() {
    var video = document.getElementsByTagName("video");
    for (var i = 0; i < video.length; i++) {
      video[i].controls = true;
    }
  }
}

export default SessionChat;
