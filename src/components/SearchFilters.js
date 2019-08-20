import React from 'react';
import {
	DataSearch,
	SingleDropdownList,
	SingleDropdownRange,
} from '@appbaseio/reactivesearch';

import Flex, { FlexChild } from '../styles/Flex';

const SearchFilters = () => (
	<Flex responsive style={{ padding: '1rem' }}>
		<FlexChild flex={2}>
			<DataSearch
				componentId="title"
				dataField={['title', 'text']}
				highlight
				customHighlight={() => ({
					highlight: {
						pre_tags: ['<mark>'],
						post_tags: ['</mark>'],
						fields: {
							text: {},
							title: {},
						},
						number_of_fragments: 0,
					},
				})}
			/>
		</FlexChild>
	</Flex>
);

export default SearchFilters;
