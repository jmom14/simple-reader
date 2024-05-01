import React from 'react';
import styled from 'styled-components';

const Loader = styled.div<{ color?: string}>`
  margin: 5px auto;
  text-align: center;

  & > div {
    width: 15px;
    height: 15px;
    background-color: ${props => props.color || 'white'};
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  & > .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  & > .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }`;

interface LoadingProps {
  color?: string,
}

function Loading(props: LoadingProps) {
  const { color } = props;
  return (
    <Loader color={color}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </Loader>
  )
}

export default Loading
