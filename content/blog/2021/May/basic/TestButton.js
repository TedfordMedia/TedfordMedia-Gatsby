import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #2cc1ed;
  color: #fff;
  border: 1px solid #1d99bd;
  border-radius: 2px;
  padding: 10px; 
  margin:auto;
  outline: none;
  font-size: 16px;
`;

export const Test = () => (
  <div>
    <Button>Hello I'm an MDX component button</Button>
  </div>
);