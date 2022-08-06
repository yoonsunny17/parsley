import React, { Component } from "react";
import styled from "styled-components";
import Message from "./Message";

const ChatContainer = styled.div``;

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return messages.map((message, idx) => (
      <ChatContainer
        className={`messages__item ${message.bigBoxClass}`}
        key={idx}
      >
        <Message
          text={message.text}
          username={message.userName}
          boxClass={`messages__box ${message.boxClass}`}
        />
      </ChatContainer>
    ));
  }
}

export default Messages;
