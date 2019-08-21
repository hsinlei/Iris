import React from "react";
//import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from "prop-types";
import ResultItem, { resultItemDetails } from '../styles/ResultItem';
import Flex, { FlexChild, CenterFlex, Test } from '../styles/Flex';
import Checkbox from '../styles/Checkbox'
import Link, {SmallLink} from '../styles/Link';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TopicLink from '../styles/TopicLink';

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


class Topic extends React.Component {

 constructor(props) {
    super(props);

    this.state = {
      checked: false,
      dataLoaded: false,
     moreData: false,
    };
  }



	render() {
		return (
      <ResultItem>
				<Flex>
					{/*<FlexChild justifyContent='center' alignItems='center' style={{flexDirection:'column', minHeight:'200px'}}>*/}
          <FlexChild>
          <CenterFlex>
          <Fab aria-label="add" size='medium' style={{boxShadow:'none' }}>
                   {this.props.data.numTitles}
                  </Fab>
					</CenterFlex>
          </FlexChild>
					<FlexChild>
						<Link href={"www.google.com"}> {this.props.data.topicName} </Link>
            {this.props.data.titles.map(function(d, idx){
         return (<TopicLink style={{color:"#616161"}}> {d}</TopicLink>)
       })}

						<Flex className={resultItemDetails} style={{ paddingTop: 5, marginTop: 5 }}>
							<FlexChild>{timeSince(new Date(this.props.data.time * 1000))} ago</FlexChild>
							<div style={{position: 'absolute', right:0}}> 
							<Fab aria-label="add" style={{backgroundColor:'#ffffff', boxShadow:'none',maxWidth: '20px', maxHeight: '20px',minHeight:'20px' }}>
					          <AddIcon size="small" color="primary" style={{fill:'#9fa8da', maxWidth: '15px', maxHeight: '15px' }}/>
					        </Fab>
					        </div>
						</Flex>
					</FlexChild>
				</Flex>
      </ResultItem>
		)
	}
 }

export default Topic;
