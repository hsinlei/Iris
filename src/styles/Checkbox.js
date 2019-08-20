import React from 'react';
import styled from '@emotion/styled';
import StyledCheckbox from './StyledCheckbox';
import HiddenCheckbox from './HiddenCheckbox';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
  	<HiddenCheckbox checked={checked} {...props}/>
  	<StyledCheckbox checked={checked}/>

  </CheckboxContainer>
);
/*
const Checkbox = styled('input')`
  transform: scale(4);
`;*/

export default Checkbox;