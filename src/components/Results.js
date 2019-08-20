import React from 'react';
//import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

import ResultItem, { resultItemDetails } from '../styles/ResultItem';
import Flex, { FlexChild } from '../styles/Flex';
import Checkbox from '../styles/Checkbox'
import Link from '../styles/Link';
import axios from 'axios';

function timeSince(date) {
	const seconds = Math.floor((new Date() - date) / 1000);

	let interval = Math.floor(seconds / 31536000);

	if (interval >= 1) {
		const postfix = interval === 1 ? ' year' : ' years';
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

const renderResultStats = ({ numberOfResults, time }) => (
	<Flex justifyContent="flex-end" style={{ padding: '0 1rem' }}>
		{numberOfResults} results found in {time}ms
	</Flex>
);

const onData = data => (
	<ResultItem key={data._id}>
	{ console.log(data)}

		<div dangerouslySetInnerHTML={{ __html: data.title }} />
		<div dangerouslySetInnerHTML={{ __html: data.text }} />
		<Flex className={resultItemDetails} style={{ paddingTop: 5, marginTop: 5 }}>
			{!!data.parent && (
				<FlexChild>
					parent{' '}
					<Link
						href={`https://news.ycombinator.com/item?id=${data.parent}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{data.parent}
					</Link>
				</FlexChild>
			)}
			<FlexChild>{data.score} points</FlexChild>
			<FlexChild>
				<Link
					href={`https://news.ycombinator.com/user?id=${data.by}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{data.by}
				</Link>
			</FlexChild>
			<FlexChild>{timeSince(new Date(data.time * 1000))} ago</FlexChild>
		</Flex>
	</ResultItem>
);
const data = {
by: "scootklein",
highlight: {},
id: "11004454",
p_type: "job",
parent: 0,
score: "1",
text: "",
time: "1454198578",
title: "StatusPage (YC S13) Is Hiring Rails Engineers in SF and Denver",
url: "https://www.statuspage.io/careers",
_id: "AV0xh-GK5TqtMYnFEJCl",
_index: "hackernews-live",
_score: 1,
_type: "hackernews-live"};


class Results extends React.Component {
	constructor() {
  super();
  // Define state
  this.state = {
    checked: false,
    numUpvotes:457,
    dataLoaded: false
  }
}

// Is called when the component succesfully loads
componentDidMount() {
  // GET request to our server
  axios({
    method: 'GET',
    url: '/api/quotes'
  })
  // Saves the data to state. Only way to change the state is with setState
  .then(data => {
    this.setState({
      numUpvotes: data.numUpvotes,
      dataLoaded: true
    });
  })
  // logs an error
  .catch(err => {
    console.log(err);
  });
}
	handleCheckboxChange = event => {
		this.setState({checked: event.target.checked});
		var op = -1;
		if (event.target.checked) {
			op = 1;
		}
		this.setState(prevState => {
			return {numUpvotes: prevState.numUpvotes + op}
		});
		//TODO: need an 'un save handler too'
		const request = new Request('http://localhost:8002/api/save', { 
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({post_id: 1, user_id: 2})
		});
		fetch(request)
			.then(function(response) {
				response.json()
					.then(function(data) {
						console.log('data: ');
						console.log(data);
					});
			})
			.catch(function(err) {
				console.log('caught :' + err);
			});
	};
	render() {
		const post_id = 1;
		const request = new Request('http://localhost:8002/api/getsavedcount', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({post_id: post_id})
		});
		fetch(request)
			.then(function(response) {
				response.json()
					.then(function(data) {
						console.log('data: ');
						console.log(data);
						this.setState({
							numUpvotes: data.saved
						});
					});
			})
			.catch(function(err) {
				console.log('caught :' + err);
			});
		return (
			<ResultItem key={0}>
			<Flex>
					<FlexChild>
					<label>
						<Checkbox checked={this.state.checked} 
								onChange={this.handleCheckboxChange}
						/>
					</label>

					<div> {this.state.numUpvotes} </div>
					</FlexChild>
				<FlexChild>
				<div dangerouslySetInnerHTML={{ __html: data.title }} />
				<div dangerouslySetInnerHTML={{ __html: data.text }} />
				<Flex className={resultItemDetails} style={{ paddingTop: 5, marginTop: 5 }}>


					{!!data.parent && (
						<FlexChild>
							parent{' '}
							<Link
								href={`https://news.ycombinator.com/item?id=${data.parent}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{data.parent}
							</Link>
						</FlexChild>
					)}
					<FlexChild>{data.score} points</FlexChild>
					<FlexChild>
						<Link
							href={`https://news.ycombinator.com/user?id=${data.by}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{data.by}
						</Link>
					</FlexChild>
					<FlexChild>{timeSince(new Date(data.time * 1000))} ago</FlexChild>
				</Flex>
				</FlexChild>
				</Flex>
			</ResultItem>
		)
	}
}

onData.propTypes = {
	_source: PropTypes.object, // eslint-disable-line
};

export default Results;
