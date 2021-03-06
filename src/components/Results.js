import React from "react";
//import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from "prop-types";
import ResultItem, { resultItemDetails } from '../styles/ResultItem';
import Flex, { FlexChild } from '../styles/Flex';
import Checkbox from '../styles/Checkbox'
import Link, { SmallLink } from '../styles/Link';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
var timeSince = require('../utils').timeSince;
const request = require('request');

const renderResultStats = ({ numberOfResults, time }) => (
  <Flex justifyContent="flex-end" style={{ padding: "0 1rem" }}>
    {numberOfResults} results found in {time}ms
  </Flex>
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
  _type: "hackernews-live"
};

const API_SERVER = "http://localhost:8002";

class Results extends React.Component {

  constructor(props) {
    super(props);

    // Define state numUpvotes, checked, and dataLoaded
    this.state = {
      checked: false,
      dataLoaded: false,
      moreData: false,
      numUpvotes: 0
    };

    const request = new Request(API_SERVER + "/api/getsavedcount", {
      method: "POST",
      headers: new Headers({"Content-Type": "application/json" }),
      body: JSON.stringify({
        post_id: props.id,
        user_id: props.user.id
      })
    });

    fetch(request)
      .then(response => {
        response.json().then(data => {
          this.setState({
            numUpvotes: data.saved
          });
        });
      })
      .catch(function (err) {
        console.log("caught :" + err);
      });

    const check_state_request = new Request(
      API_SERVER + "/api/checksaved",
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          post_id: props.id,
          user_id: props.user.id
        })
      }
    );

    fetch(check_state_request)
      .then(response => {
        response.json().then(data => {
          this.setState({
            checked: data.count > 0
          });
        });
      })
      .catch(function (err) {
        console.log("caught :" + err);
      });
  }

  handleExpand = event => {
    this.setState(prevState => {
      return { moreData: !prevState.moreData }
    });


    request('http://stackabuse.com', function (err, res, body) {
      console.log(body);
    });
    /*
    axios({
      method: "GET",
      url:  "https://www.google.com"
    })
      // Saves the data to state. Only way to change the state is with setState
      .then(data => {
        this.setState({
          data: data,
          dataLoaded: true
        });
        console.log(data);
        // var event = new Event("search_submitted");
        // window.dispatchEvent(event);
        // console.log(this.state.data);
      })
      // logs an error
      .catch(err => {
        console.log(err);
      });*/
  }

  handleCheckboxChange = event => {
    const old_state = this.state.checked;
    console.log("old statet = " + old_state);
    const op = old_state ? -1 : 1;
    const end_point = API_SERVER + (old_state
      ? "/api/unsave"
      : "/api/save");
    this.setState(prevState => {
      return {
        numUpvotes: +prevState.numUpvotes + op,
        checked: !prevState.checked
      };
    });

    const request = new Request(end_point, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      // use hashcode
      body: JSON.stringify({
        post_id: this.props.id,
        user_id: this.props.user.id
      })
    });
    fetch(request)
      .then(function (response) {
        response.json().then(function (data) {
          console.log("data: ");
          console.log(data);
        });
      })
      .catch(function (err) {
        console.log("caught :" + err);
      });
  };



  render() {
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
            <Link href={this.props.data.link}> {this.props.data.title} </Link>
            <div><SmallLink href={this.props.data.formattedUrl}>{this.props.data.displayLink} </SmallLink></div>
            <div style={{ color: "#616161" }}>{this.props.data.snippet} </div>

            {this.state.moreData &&
              <div>
                <div>
                  {/*Object.entries(this.props.data.pagemap.metatags[0]).map(function(idx, d) {
									return (<div>{idx}</div>)
								})*/
                    this.props.data.pagemap.metatags[0].citation_title
                  }
                </div> <div>
                  {/*Object.entries(this.props.data.pagemap.metatags[0]).map(function(idx, d) {
									return (<div>{idx}</div>)
								})*/
                    this.props.data.pagemap.metatags[0].citation_journal_title + ". " + this.props.data.snippet + ". " + this.props.data.snippet + ". " +
                    this.props.data.pagemap.metatags[0].citation_title
                  }
                </div> </div>}
            {this.state.moreData &&
              <div>
                <div>
                  {
                    this.props.data.pagemap.metatags[0].citation_title
                  }
                </div> <div>
                  {/*Object.entries(this.props.data.pagemap.metatags[0]).map(function(idx, d) {
									return (<div>{idx}</div>)
								})*/
                    this.props.data.pagemap.metatags[0].citation_journal_title + ". " + this.props.data.snippet + ". " + this.props.data.snippet + ". " +
                    this.props.data.pagemap.metatags[0].citation_title
                  }
                </div> </div>}

            <Flex className={resultItemDetails} style={{ paddingTop: 5, marginTop: 5 }}>
              {!!data.parent && (
                <FlexChild>
                  parent{' '}
                  <Link
                    href={this.props.data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.parent}
                  </Link>
                </FlexChild>
              )}
              <FlexChild>{data.score} points</FlexChild>
              <FlexChild>
                {data.by}
              </FlexChild>
              <FlexChild>{timeSince(new Date(data.time * 1000))} ago</FlexChild>
              <div style={{ position: 'absolute', right: 0 }}>
                <Fab aria-label="add" onClick={this.handleExpand} style={{ backgroundColor: '#ffffff', boxShadow: 'none', maxWidth: '20px', maxHeight: '20px', minHeight: '20px' }}>
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

export default Results;
