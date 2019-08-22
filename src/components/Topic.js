import React from "react";
//import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from "prop-types";
import ResultItem, { resultItemDetails } from '../styles/ResultItem';
import Flex, { FlexChild, CenterFlex, Test } from '../styles/Flex';
import Checkbox from '../styles/Checkbox'
import Link, { SmallLink } from '../styles/Link';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TopicLink from './TopicLink';
var timeSince = require('../utils').timeSince;


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
					<FlexChild style={{ padding: '10px 20px' }}>
						<FlexChild><Link href={"www.google.com"}> {this.props.data.topicName} </Link></FlexChild>
						{this.props.data.titles.map(function (d, idx) {
							return (<TopicLink key={idx} data={d} style={{ color: "#616161" }} />)
						})}

						<Flex className={resultItemDetails} style={{ paddingTop: 5, marginTop: 5 }}>
							<FlexChild>{timeSince(new Date(this.props.data.time * 1000))} ago</FlexChild>
							<div style={{ position: 'absolute', right: 0 }}>
								<Fab aria-label="add" style={{ backgroundColor: '#ffffff', boxShadow: 'none', maxWidth: '20px', maxHeight: '20px', minHeight: '20px' }}>
									<AddIcon size="small" color="primary" style={{ fill: '#9fa8da', maxWidth: '15px', maxHeight: '15px' }} />
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
