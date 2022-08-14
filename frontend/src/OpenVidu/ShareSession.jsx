import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, createRef } from "react";
import "./StudySession.css";
import UserVideoComponent from "./UserVideoComponent";
import UserModel from "./models/user-model";

// chat function
import Messages from "./Chat/Messages";
// mic on/off, video on/off, screen share, chat popper, exit, group members
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsChatDots,
  BsThreeDots,
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

const footerBtn = "30";

let localUser = new UserModel();
class ShareSession extends Component {
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
      screenstate: false, // 화면
      videostate: true, // 웹캠
      videoallowed: true,
      audioallowed: true,
      host: {},
      isHost: false, // host인 경우만 가능한 권한 부여 (수정, 삭제)
      width: window.innerWidth,
      height: window.innerHeight,
      connectionUser: [],
      connections: [],
      connectionId: "",
      leaved: false,
      mode: "", // 손꾸락모드: finger, 얼구리모드: face FIXME: frontend branch의 CreateStudyRoom 의 mode 이름 바꾸기
      isDivided: false,
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
    // screen share (화면공유)
    this.screenShare = this.screenShare.bind(this);
    // 4분할 화면 전환
    this.changeDividedMainScreen = this.changeDividedMainScreen.bind(this);
  }

  // Exit button 눌렀을 때; 정말 나가시겠습니까? alert 띄워주기
  exitSessionAlert = () => {
    Swal.fire({
      title: "스터디룸을 떠나실건가요?",
      showCancelButton: true,
      confirmButtonText: "더 공부하자!",
      cancelButtonText: "그만할래",
    }).then((result) => {
      if (result.isDismissed) {
        Swal.fire({
          icon: "success",
          title: "파슬리가 응원할게요!",
          text: "오늘도 화이팅 :)",
        });
        this.leaveSession();
      }
    });
  };

  // 채팅 길어지면 자동으로 내려가게 ... 스크롤 기능이용
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

  // screen share onclick mode
  screenShare(e) {
    navigator.mediaDevices
      .getDisplayMedia({ audio: true, video: true })
      .then(function (stream) {
        //success
        console.log(stream);
        // this.changeScreen(); // 화면 전환
        this.startScreenShare(); // 화면 공유 시작
      })
      .catch(function (e) {
        //error;
      });
  }

  changeScreen(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
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

  changeDividedMainScreen() {
    // if (this.state.isDivided) {
    //   this.setState({ isDivided: !this.state.isDivided });
    //   console.log(this.state.isDivided);
    // }
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
    this.OVScreen = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
        sessionScreen: this.OVScreen.initSession(),
      },
      () => {
        var mySession = this.state.session;
        var sessionScreen = this.state.sessionScreen;

        // --- 3) Specify the actions when events take place in the session ---

        mySession.on("connectionCreated", (event) => {
          console.log("========= connection =========");
          console.log(event.connection);
          var connection = event.connection;
          var connections = this.state.connections;
          var connectionUser = this.state.connectionUser;
          connections.push(connection);

          var userId = connection.connectionId;
          var userName = JSON.parse(connection.data).clientData;
          connectionUser.push({ userId, userName });

          // 방장 확인
          var host = this.state.connections[0];
          console.log(host);

          this.setState({
            connections: connections,
            connectionUser: connectionUser,
            host: host,
          });

          if (this.state.connectionId === this.state.host.connectionId) {
            this.setState({ isHost: true });
          } else {
            this.setState({ isHost: false });
          }
        });

        // On every new Stream received...
        // mySession.on("streamCreated", (event) => {
        //   // Subscribe to the Stream to receive it. Second parameter is undefined
        //   // so OpenVidu doesn't create an HTML video by its own
        //   var subscriber = mySession.subscribe(event.stream, undefined);
        //   var subscribers = this.state.subscribers;
        //   subscribers.push(subscriber);

        //   // Update the state with the new subscribers
        //   this.setState({
        //     subscribers: subscribers,
        //   });
        // });

        // FIXME: OV/ OVScreen 나눈 경우

        // case 1. OV (webcam 공유하는 상태)
        mySession.on("streamCreated", (event) => {
          if (event.stream.typeOfVideo === undefined) {
            var subscriber = mySession.subscribe(event.stream, undefined);
            var subscribers = this.state.subscribers;
            subscribers.push(subscriber);

            this.setState({
              subscribers: subscribers,
            });
          }
        });

        // case 2. OVScreen (화면 공유하는 상태)
        sessionScreen.on("streamCreated", (event) => {
          if (event.stream.typeOfVideo === "SCREEN") {
            var subscriberScreen = sessionScreen.subscribe(
              event.stream,
              "container-screens"
            );
            var subscriberScreens = this.state.subscriberScreens;
            subscriberScreens.push(subscriberScreen);

            this.setState({
              subscriberScreens: subscriberScreens,
            });
          }
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
                // audioSource: "container-cameras", // The source of audio. If undefined default microphone
                audioSource: undefined, // The source of audio. If undefined default microphone
                // videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                videoSource: undefined, // The source of video. If undefined default webcam
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

        this.getToken().then((tokenScreen) => {
          // Create a token for screen share
          sessionScreen
            .connect(tokenScreen, {
              clientData: this.state.myUserName,
            })
            .then(async () => {
              console.log("session screen connected");
            })
            .catch((error) => {
              console.warn(
                "There was an error connecting to the session for screen share:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  // screen share 버튼 눌렀을 때 화면공유 기능 활성화 되는 함수!!!!!!
  // startScreenShare() {
  //   // --- 9.1) To create a publisherScreen it is very important that the property 'videoSource' is set to 'screen'
  //   var publisherScreen = this.OVScreen.initPublisher("container-screens", {
  //     videoSource: "screen",
  //   });

  //   // --- 9.2) If the user grants access to the screen share function, publish the screen stream
  //   publisherScreen.once("accessAllowed", (event) => {
  //     this.setState({
  //       screenstate: true,
  //     });
  //     console.log("-------plz!!!!!!!!-------");
  //     publisherScreen.stream
  //       .getMediaStream()
  //       .getVideoTracks()[0]
  //       .addEventListener("ended", () => {
  //         console.log('User pressed the "Stop sharing" button');
  //         this.sessionScreen.unpublish(publisherScreen);
  //         this.setState({
  //           screenstate: false,
  //         });
  //       });
  //     this.sessionScreen.publish(publisherScreen);
  //   });

  //   publisherScreen.once("accessDenied", (event) => {
  //     console.error("screen share: access denied");
  //   });
  // }
  // stopScreenShare() {
  //   publisherScreen.once("accessDenied", (event) => {
  //     this.setState({
  //       screenstate: false,
  //     });
  //   });
  // }

  // FIXME: 화면공유 문제를 고쳐주세요!!
  // 화면공유 시작 (react code ref)
  startScreenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    this.OV = new OpenVidu();

    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: true,
        publishVideo: true,
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.changeConnectedUser({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
  }

  changeConnectedUser(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;
    const sessionScreen = this.state.sessionScreen;

    if (mySession) {
      mySession.disconnect();
    }
    if (sessionScreen) {
      sessionScreen.disconnect();
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
      subscribers: [],
      messages: [],
      message: "",
      sessionData: [],
      audiostate: true,
      screenstate: false, // 화면
      videostate: true, // 웹캠
      videoallowed: true,
      audioallowed: true,
      host: {},
      isHost: false, // host인 경우만 가능한 권한 부여 (수정, 삭제)
      connectionUser: [],
      connections: [],
      connectionId: "",
      leaved: false,
      mode: "", // 손꾸락모드: finger, 얼구리모드: face FIXME: frontend branch의 CreateStudyRoom 의 mode 이름 바꾸기
      isDivided: false,
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
                <div className="flex flex-col text-main font-semibold text-2xl mt-2">
                  파슬리랑 공부할 사람?
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
                  {/* // FIXME: navbar 일단 제외 */}
                  {/* <div className="navbar bg-base-100">
                    <div className="flex-1 text-xl font-bold">PARSLEY</div>
                    <div className="flex-none cursor-pointer">
                      <BsThreeDots />
                    </div>
                  </div> */}
                  {/* 손꾸락 모드인 경우 vs 얼구리 모드인 경우 */}

                  {this.state.mode === "finger" ? (
                    <div id="video-container" className="video-container">
                      {/* // TODO: 화면 넘어가는것을 carousel?? pagination?? 구현해야 할 것 같음 */}
                      {/* 잇츠 미,, 작게보이는 나,,, 가장 왼쪽에 배치했어*/}
                      {this.state.publisher !== undefined ? (
                        <div
                          // className="stream-container col-md-6 col-xs-6"
                          className="w-[calc-96% / 2] m-[1%] col-md-6 col-xs-6"
                          onClick={() =>
                            this.handleMainVideoStream(this.state.publisher)
                          }
                        >
                          <UserVideoComponent
                            streamManager={this.state.publisher}
                          />
                        </div>
                      ) : null}
                      {/* 제 3자; subscribers */}
                      {this.state.subscribers.map((sub, i) => (
                        <div
                          key={i}
                          // className="stream-container col-md-6 col-xs-6"
                          className="w-[calc-96% / 2] m-[1%] col-md-6 col-xs-6"
                          onClick={() => this.handleMainVideoStream(sub)}
                        >
                          <UserVideoComponent streamManager={sub} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 얼구리 모드
                    <div id="video-container" className="video-container">
                      {/* 상단의 작은 화면들 */}
                      {/* 잇츠 미,, 작게보이는 나,,, 가장 왼쪽에 배치했어*/}
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
                      {/* 제 3자; subscribers */}
                      {this.state.subscribers.map((sub, i) => (
                        <div
                          key={i}
                          className="stream-container col-md-6 col-xs-6"
                          onClick={() => this.handleMainVideoStream(sub)}
                        >
                          <UserVideoComponent streamManager={sub} />
                        </div>
                      ))}
                      {/* 하단의 메인 화면; 화면 공유 되어지고있는 사람 */}
                      {/* 화면 4분할 기능 추가 */}
                      {/* 4분할 되어 4개의 화면이 공유되어지는 경우 */}
                      {/* <div id="main-video-divided">
                        <div
                          className="w-[45%]"
                          onClick={() => {
                            this.handleMainVideoStream(this.state.publisher);
                          }}
                        >
                          <UserVideoComponent
                            streamManager={this.state.publisher}
                          />
                        </div>
                        {this.state.subscribers.map((sub, i) => (
                          <div
                            className="w-[45%]"
                            key={i}
                            onClick={() => {
                              this.handleMainVideoStream(sub);
                            }}
                          >
                            <UserVideoComponent streamManager={sub} />
                          </div>
                        ))}
                      </div>{" "} */}
                      {/* 4분할 되지 않고 하나의 화면만 공유되는 경우 */}
                      {/* 클릭했을 때 다시 4분할로 돌아가도록 */}
                      <div id="main-video-onescreen">
                        {/* // TODO: isDivided ? (4분할인 경우) : (분할되지 않은 경우, onclick으로 되돌아가게) */}
                        {this.state.isDivided === false ? (
                          <UserVideoComponent
                            streamManager={this.state.mainStreamManager}
                          />
                        ) : (
                          <div id="main-video-divided">
                            <div
                              className="w-[45%]"
                              onClick={() => {
                                this.handleMainVideoStream(
                                  this.state.publisher
                                );
                              }}
                            >
                              <UserVideoComponent
                                streamManager={this.state.publisher}
                              />
                            </div>
                            {this.state.subscribers.map((sub, i) => (
                              <div
                                className="w-[45%]"
                                key={i}
                                onClick={() => {
                                  this.handleMainVideoStream(sub);
                                }}
                              >
                                <UserVideoComponent streamManager={sub} />
                              </div>
                            ))}
                          </div>
                        )}
                        {/* <div
                        // onClick={() => {
                        //   this.setState({ isDivided: !this.state.isDivided });
                        //   console.log(this.state.isDivided);
                        // }}
                        >
                          <UserVideoComponent
                            streamManager={this.state.mainStreamManager}
                          />
                        </div> */}
                      </div>{" "}
                      ,
                      {/* {this.state.mainStreamManager !== undefined ? (
                        <div id="main-video" className="">
                          <UserVideoComponent
                            streamManager={this.state.mainStreamManager}
                          />
                        </div>
                      ) : null} */}
                    </div>
                  )}
                </div>
              </div>

              {/* tool bar; screen share, mic on/off, camera on/off, chat popper, exit */}
              <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div className="grid-flow-col gap-6 md:place-self-center">
                  {/* divided test */}
                  <button
                    onClick={() => {
                      this.setState({ isDivided: !this.state.isDivided });
                      console.log(this.state.isDivided);
                    }}
                  >
                    divide
                  </button>
                  <div className="cursor-pointer" onClick={this.screenShare}>
                    <TbScreenShare size={footerBtn} />
                  </div>
                  {/* mic on/off */}

                  {this.state.audiostate ? (
                    <div className="cursor-pointer">
                      <BsFillMicFill
                        size={footerBtn}
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
                    <div className="cursor-pointer">
                      <BsFillMicMuteFill
                        size={footerBtn}
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
                        size={footerBtn}
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
                    <div className="cursor-pointer">
                      <BsCameraVideoOffFill
                        size={footerBtn}
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
                    size={footerBtn}
                  /> */}
                  {/* 초반에 생각을 잘못 해서 모달로 구현함.. */}
                  <label htmlFor="my-modal-3" className="cursor-pointer">
                    <BsChatDots size={footerBtn} />
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
                  {/* exit */}
                  <div className="cursor-pointer md:place-self-end">
                    <MdExitToApp
                      size={footerBtn}
                      onClick={this.exitSessionAlert}
                    />
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </div>
    );
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

export default ShareSession;
