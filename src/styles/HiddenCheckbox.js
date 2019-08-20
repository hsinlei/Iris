
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
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const HiddenCheckbox = props => (
  <input css={[basic]} type={'checkbox'} onChange={props.onChange}/>
)

export default HiddenCheckbox;