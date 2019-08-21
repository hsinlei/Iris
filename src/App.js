import React from 'react';
import { ReactiveBase } from '@appbaseio/reactivesearch';

import theme from './styles/theme';

import Header from './components/Header';
import SearchFilters from './components/SearchFilters';

import Container from './styles/Container';
import SearchContainer from './styles/SearchContainer';
import Main from './styles/Main';

const App = () => (
	<Main>
		<Container>
			<ReactiveBase
				app="hackernews-live"
				credentials="kxBY7RnNe:4d69db99-6049-409d-89bd-e1202a2ad48e"
				theme={theme}
			>
				<Header />
				<SearchContainer>
					<SearchFilters />
				</SearchContainer>
			</ReactiveBase>
		</Container>
	</Main>
);

export default App;
