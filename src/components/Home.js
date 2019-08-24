import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import {CenterFlex} from '../styles/Flex';
import SearchBar from './SearchBar';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSearch = query => {
    this.props.setQuery(query);
    this.props.history.push('/result');
  };
  render() {
      return (
          <div>
          <CenterFlex>
              <div style={{fontSize:'200px', position:'absolute', color:'#1a237e', fontFamily:'Nunito'}}>Iris</div>
            <P5Wrapper sketch={sketch}></P5Wrapper>
        </CenterFlex>
        <CenterFlex style={{minHeight:0}}>
            <SearchBar handleSearch={this.handleSearch.bind(this)}/>
        </CenterFlex>
        </div>
      )
  }
}

export default Home;
