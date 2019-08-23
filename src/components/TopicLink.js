import React from "react";
import Flex, { FlexChild } from "../styles/Flex"
import Metadata from "../styles/Metadata"
import {GreyLink} from "../styles/Link"
var timeSince = require('../utils').timeSince;

class TopicLink extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Flex>
        <FlexChild><GreyLink>{this.props.data.title}</GreyLink></FlexChild>
        <FlexChild> · </FlexChild>
        <FlexChild alignItems='bottom' style={{ minWidth: 100, minHeight: 10 }}>
          <Metadata> {timeSince(new Date(this.props.data.time * 1000))} ago
		      </Metadata>
        </FlexChild>
      </Flex>
    )
  }
}

export default TopicLink;