import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, createRef } from "react";
import "./StudySession.css";
import UserVideoComponent from "./UserVideoComponent";

// chat function
import Messages from "./Chat/Messages";
// mic on/off, video on/off, screen share, chat popper, exit, group members
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsChatDots,
} from "react-icons/bs";
import { TbScreenShare } from "react-icons/tb";
import { MdExitToApp } from "react-icons/md";
import { BiGroup } from "react-icons/bi";

// atomic component
import Button from "../UI/atoms/Button";
// sweetalert
import Swal from "sweetalert2";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const btnSize = "20";

class StudySession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "SessionB",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      messages: [],
      message: "",
      sessionData: [],
      audiostate: true,
      screenstate: true,
      videostate: true,
      videoallowed: true,
      audioallowed: true,
      host: {},
      isHost: false,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // send message (chat)
    this.messageContainer = createRef(null);
    this.sendMessageByClick = this.sendMessageByClick.bind(this);
    this.sendMessageByEnter = this.sendMessageByEnter.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
  }

  // studysession function
  // handleScreenSize = () => {
  //   this.setState({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };

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

  componentDidMount() {
    // login user 정보 얻기 위한 api 요청해야 함
    //
    window.addEventListener("beforeunload", this.onbeforeunload);

    const constraints = { audio: true, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(() => {
        this.setState({
          videoallowed: true,
          audioallowed: true,
        });
      })
      .catch(() => {
        this.setState({
          videoallowed: false,
          audioallowed: false,
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    // window.removeEventListener("resize", this.handleScreenMode);
    // window.location.reload();
    // if (!this.state.leaved) {
    //   this.leaveSession();
    // }
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
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

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    // 나중에 login token도 받을 생각
    const messages = this.state.messages;
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    const sendUserInfo = () => {
      axios({
        url: "https://localhost:4443/openvidu/api/sessions/SessionB/connection",
        method: "POST",
        data: {
          userId: this.state.userId,
          nickname: this.state.myUserName,
          connectionId: this.state.connectionId,
        },
      });
    };

    return (
      <div className="bg-extra4">
        {this.state.session === undefined ? (
          <div className="container p-24">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="flex flex-col text-main font-semibold text-xl mt-2">
                  파슬리랑 공부할 사람?.. 이 페이지는 없어져야 한다 (방 참가
                  버튼 있는 페이지로 대체되어야 함.. 그럼 input 넣는것도
                  없어지것쥬)
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551772413-6c1b7dc18548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="PARSLEY"
                />
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col">
                <div id="join">
                  <div id="join-dialog" className="jumbotron vertical-center">
                    <form
                      action=""
                      className="form-group"
                      onSubmit={this.joinSession}
                    >
                      <div
                        className="flex font-semibold mr-3"
                        htmlFor="userName"
                      >
                        <label>Participant: </label>
                        <input
                          className="form-control input-border rounded-lg"
                          type="text"
                          id="userName"
                          value={myUserName}
                          onChange={this.handleChangeUserName}
                          required
                        />
                      </div>
                      <div
                        className="flex font-semibold mr-3"
                        htmlFor="sessionId"
                      >
                        <label> Session: </label>
                        <input
                          className="form-control input-border rounded-lg"
                          type="text"
                          id="sessionId"
                          value={mySessionId}
                          onChange={this.handleChangeSessionId}
                          required
                        />
                      </div>
                      <div className="my-3">
                        <Button text={"JOIN"} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="session">
            <div className="container">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div
                    id="video-container"
                    className="video-container flex flex-wrap mb-5 justify-center"
                  >
                    <div id="session-header">
                      <div id="session-title" className="text-2xl">
                        {mySessionId}
                      </div>
                      <Button
                        text={"LEAVE SESSION"}
                        onClick={this.leaveSession}
                      />
                    </div>
                    {this.state.mainStreamManager !== undefined ? (
                      <div id="main-video" className="col-md-6">
                        <UserVideoComponent
                          streamManager={this.state.mainStreamManager}
                        />
                        <input
                          className="btn btn-sm"
                          type="button"
                          id="buttonSwitchCamera"
                          onClick={this.switchCamera}
                          value="Switch Camera"
                        />
                      </div>
                    ) : null}
                    {this.state.publisher !== undefined ? (
                      <div
                        className="stream-container col-md-6 col-xs-6"
                        onClick={() =>
                          this.handleMainVideoStream(this.state.publisher)
                        }
                      >
                        <UserVideoComponent
                          streamManager={this.state.publisher}
                        />
                      </div>
                    ) : null}
                    {this.state.subscribers.map((sub, i) => (
                      <div
                        key={i}
                        className="stream-container col-md-6 col-xs-6"
                        onClick={() => this.handleMainVideoStream(sub)}
                      >
                        <UserVideoComponent streamManager={sub} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* tool bar; screen share, mic on/off, camera on/off, chat popper, exit */}
              <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div className="grid-flow-col gap-6 md:place-self-center">
                  <div className="cursor-pointer">
                    <TbScreenShare size={btnSize} />
                  </div>
                  {/* mic on/off */}
                  {/* // TODO: 마이크 음소거 기능이 먹통입니다!!!!!! */}
                  {this.state.audiostate ? (
                    <div className="cursor-pointer">
                      <BsFillMicFill
                        size={btnSize}
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate
                          );
                          this.setState({
                            audiostate: !this.state.audiostate,
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <BsFillMicMuteFill
                        size={btnSize}
                        onClick={() => {
                          this.state.publisher.publishAudio(
                            !this.state.audiostate
                          );
                          this.setState({
                            audiostate: !this.state.audiostate,
                          });
                        }}
                      />
                    </div>
                  )}
                  {/* video on/off */}
                  {this.state.videostate ? (
                    <div className="cursor-pointer">
                      <BsCameraVideoFill
                        size={btnSize}
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate
                          );
                          this.setState({
                            videostate: !this.state.videostate,
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <BsCameraVideoOffFill
                        size={btnSize}
                        onClick={() => {
                          this.state.publisher.publishVideo(
                            !this.state.videostate
                          );
                          this.setState({
                            videostate: !this.state.videostate,
                          });
                        }}
                      />
                    </div>
                  )}
                  {/* chat popper */}
                  {/* // FIXME: 새 창으로 채팅방 띄우기 */}
                  {/* 새창으로 넘어가지만 콘솔 오류가 뜸 ... signal을 못읽어서 message data가 안읽혀옴 */}
                  {/* <BsChatDots
                    className="cursor-pointer"
                    onClick={() => window.open("/room/chat", "", "_blank")}
                    size={btnSize}
                  /> */}
                  {/* 초반에 생각을 잘못 해서 모달로 구현함.. */}
                  <label htmlFor="my-modal-3" className="cursor-pointer">
                    <BsChatDots size={btnSize} />
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal-3"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative h-3/5">
                      <label
                        htmlFor="my-modal-3"
                        className="cursor-pointer absolute right-4 top-3"
                      >
                        ✕
                      </label>
                      <div className="rounded-2xl flex flex-col bg-font3 w-auto h-full ease-in-out">
                        <div className="flex text-start p-2 text-xl h-10">
                          {mySessionId} 채팅방
                          {/* <IoCopy
                        className="cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(mySessionId)
                        }
                      /> */}
                        </div>
                        <div
                          className="chatbox__messages mt-auto flex flex-col overflow-y-scroll items-end"
                          ref="chatoutput"
                        >
                          <Messages messages={messages} />
                        </div>
                        <div className="chatbox__footer">
                          <input
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
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    );
    // return (
    //   <div className="container">
    //     {/* 스터디룸 입장 전 */}
    //     {this.state.session === undefined ? (
    //       <div id="join">
    //         <div id="img-div">
    //           <img
    //             src="https://images.unsplash.com/photo-1551772413-6c1b7dc18548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //             alt="PARSLEY"
    //           />
    //         </div>
    //         <div id="join-dialog" className="jumbotron vertical-center">
    //           <h1> Study With PARSLEY! </h1>
    //           <form className="form-group" onSubmit={this.joinSession}>
    //             <div className="flex">
    //               <label>Participant: </label>
    //               <input
    //                 className="form-control ml-2"
    //                 type="text"
    //                 id="userName"
    //                 value={myUserName}
    //                 onChange={this.handleChangeUserName}
    //                 required
    //               />
    //             </div>
    //             <div className="flex">
    //               <label> Session: </label>
    //               <input
    //                 className="form-control ml-2"
    //                 type="text"
    //                 id="sessionId"
    //                 value={mySessionId}
    //                 onChange={this.handleChangeSessionId}
    //                 required
    //               />
    //             </div>
    //             <p className="text-center">
    //               {/* <input
    //                 className="btn btn-lg btn-success"
    //                 name="commit"
    //                 type="submit"
    //                 value="JOIN"
    //               /> */}
    //               <Button text={"JOIN"} />
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     ) : null}

    //     {/* 스터디룸 입장 후 */}
    //     {this.state.session !== undefined ? (
    //       <div>
    //         <div id="session">
    //           <div id="session-header">
    //             <h1 id="session-title">{mySessionId}</h1>
    //             {/* <input
    //             className="btn btn-large btn-danger"
    //             type="button"
    //             id="buttonLeaveSession"
    //             onClick={this.leaveSession}
    //             value="Leave session"
    //           /> */}
    //             <button
    //               id="buttonLeaveSession"
    //               onClick={this.leaveSession}
    //               className="bg-red-400 px-3 py-2 text-white rounded-lg"
    //             >
    //               LEAVE SESSION
    //             </button>
    //           </div>

    //           {/* 메인화면 보이는 부분 */}
    //           {this.state.mainStreamManager !== undefined ? (
    //             <div id="main-video" className="col-md-6">
    //               <UserVideoComponent
    //                 streamManager={this.state.mainStreamManager}
    //               />
    //               {/* <input
    //               className="btn btn-large btn-success"
    //               type="button"
    //               id="buttonSwitchCamera"
    //               onClick={this.switchCamera}
    //               value="Switch Camera"
    //             /> */}
    //               <button
    //                 id="buttonSwitchCamera"
    //                 onClick={this.switchCamera}
    //                 className="float-left mt-5 bg-sub1 px-3 py-2 text-white rounded-lg"
    //               >
    //                 SWITCH CAMERA
    //               </button>
    //             </div>
    //           ) : null}
    //           <div id="video-container" className="col-md-6">
    //             {this.state.publisher !== undefined ? (
    //               <div
    //                 className="stream-container col-md-6 col-xs-6"
    //                 onClick={() =>
    //                   this.handleMainVideoStream(this.state.publisher)
    //                 }
    //               >
    //                 <UserVideoComponent streamManager={this.state.publisher} />
    //               </div>
    //             ) : null}
    //             {this.state.subscribers.map((sub, i) => (
    //               <div
    //                 key={i}
    //                 className="stream-container col-md-6 col-xs-6"
    //                 onClick={() => this.handleMainVideoStream(sub)}
    //               >
    //                 <UserVideoComponent streamManager={sub} />
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //         {/* chat */}
    //         <div className="chatbox__messages" ref="chatoutput">
    //           <Messages messages={messages} />
    //         </div>
    //         <div className="chatbox__footer">
    //           <input
    //             type="text"
    //             id="chat_message"
    //             placeholder="write messages"
    //             onChange={this.handleChatMessageChange}
    //             onKeyPress={this.sendMessageByEnter}
    //             value={this.state.message}
    //           />
    //           <Button
    //             className="chatbox__send--footer"
    //             onClick={this.sendMessageByClick}
    //             text={"send"}
    //           />
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    // );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

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

export default StudySession;
