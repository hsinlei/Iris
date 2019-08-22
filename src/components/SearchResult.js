import React from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import theme from '../styles/theme';
import SearchContainer from '../styles/SearchContainer';
import SearchFilters from './SearchFilters';

const SearchResult = () => (
    <ReactiveBase
        app="hackernews-live"
        credentials="kxBY7RnNe:4d69db99-6049-409d-89bd-e1202a2ad48e"
        theme={theme}
    >
        <SearchContainer>
            <SearchFilters />
        </SearchContainer>
    </ReactiveBase>
);

export default SearchResult;ß