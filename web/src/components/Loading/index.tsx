import React from "react";
import styled from "styled-components";
import "./index.css";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <Container>
      <div className="loadingio-spinner-spinner-s41q7c5w8">
        <div className="ldio-runt50jlz9c">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Container>
  );
};

export default Loading;
