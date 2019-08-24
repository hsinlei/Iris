import React from "react";
import Flex, {FlexChild} from "../styles/Flex"

class Abstract extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{paddingTop:'5px'}}>
        <div style={{fontWeight:'bold',fontFamily:'Georgia'}}>Abstract</div>
        <div style={{fontFamily:'Georgia', fontSize:'15px',lineHeight:'1.6'}}>{this.props.data.abstract }</div>
      </div>
    );
  }
}
export default Abstract;
