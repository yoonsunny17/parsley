import React from "react";
import styled from "styled-components";

const Username = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  padding: 5px;
`;

const MessageContainer = styled.p`
  width: 200px;
`;

const Text = styled.p`
  font-size: 0.8rem;
  padding: 5px;
`;

class Message extends React.Component {
  render() {
    const { username, text, boxClass } = this.props;

    return (
      <MessageContainer>
        <Username>{username}</Username>
        <Text className={boxClass}>{text}</Text>
      </MessageContainer>
    );
  }
}

export default Message;
