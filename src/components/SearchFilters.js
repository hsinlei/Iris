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
			<form method = "get" title = "Search Form" action="https://cse.google.com/cse/publicurl">
			 <div>
			    <input type="text" id="q" name="q" title="Search this site" alt="Search Text" maxlength="256" />
			    <input type="hidden" id="cx" name="cx" value="008518891864161743594:5lv7n5p4qru" />
			   <input type="image" id="searchSubmit" name="submit" src="https://www.flaticon.com/free-icon/active-search-symbol_34148" alt="Search" title="Submit Search Query" />
			 </div>
			</form>
		</FlexChild>
		<FlexChild flex={1}>
			<SingleDropdownList
				componentId="category"
				dataField="p_type"
				placeholder="Select Category"
				react={{
					and: 'title',
				}}
			/>
		</FlexChild>
		<FlexChild flex={1}>
			<SingleDropdownRange
				componentId="time"
				dataField="time"
				data={[
					{ start: 'now-6M', end: 'now', label: 'Last 6 months' },
					{ start: 'now-1y', end: 'now', label: 'Last year' },
					{ start: 'now-10y', end: 'now', label: 'All time' },
				]}
				placeholder="Select Time"
			/>
		</FlexChild>
	</Flex>
);

export default SearchFilters;