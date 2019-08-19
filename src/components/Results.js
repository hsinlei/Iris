import React from 'react';
//import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

import ResultItem, { resultItemDetails } from '../styles/ResultItem';
import Flex, { FlexChild } from '../styles/Flex';
import Link from '../styles/Link';

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
const Results = () => (
	<ResultItem key={0}>
	{ }
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

onData.propTypes = {
	_source: PropTypes.object, // eslint-disable-line
};

export default Results;