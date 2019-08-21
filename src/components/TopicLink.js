import React from "react";
import Flex, {FlexChild} from "../styles/Flex"
import Metadata from "../styles/Metadata"

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    const postfix = interval === 1 ? " year" : " years";
    return interval + postfix;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}

class TopicLink extends React.Component {

 constructor(props) {
    super(props);
  }

	render() {
		return (
      <div style={{padding:'10px 0'}}>
	      <Flex>
		      <FlexChild>{this.props.data.title}</FlexChild>
		      <FlexChild> · </FlexChild>
		      <FlexChild alignItems='bottom' style={{minWidth:100, minHeight:10}}>
		      <Metadata> {timeSince(new Date(this.props.data.time * 1000))} ago
		      </Metadata>
		      </FlexChild>
	      </Flex>
		</div>
		
		)
	}
 }

 export default TopicLink;