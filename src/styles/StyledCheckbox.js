
//import styled from '@emotion/styled';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
/*const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => props.checked ? 'salmon' : 'papayawhip'}
  border-radius: 3px;
  transition: all 150ms;
`;

const StyledCheckbox = styled.div(props => ({
  display: inline-block,
  width: 16px,
  height: 16px,
}));*/

let basic = css`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: papayawhip;
  border-radius: 3px;
`;

let important = css`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: salmon;
  border-radius: 3px;
`;

const StyledCheckbox = props => (
  <div css={[basic, props.checked && important]} />
)

export default StyledCheckbox;