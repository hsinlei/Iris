import React from "react";
//import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from "prop-types";

import ResultItem, { resultItemDetails } from "../styles/ResultItem";
import Flex, { FlexChild } from "../styles/Flex";
import Checkbox from "../styles/Checkbox";
import Link from "../styles/Link";
import axios from "axios";

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

const renderResultStats = ({ numberOfResults, time }) => (
  <Flex justifyContent="flex-end" style={{ padding: "0 1rem" }}>
    {numberOfResults} results found in {time}ms
  </Flex>
);

const onData = data => (
  <ResultItem key={data._id}>
    {console.log(data)}

    <div dangerouslySetInnerHTML={{ __html: data.title }} />
    <div dangerouslySetInnerHTML={{ __html: data.text }} />
    <Flex className={resultItemDetails} style={{ paddingTop: 5, marginTop: 5 }}>
      {!!data.parent && (
        <FlexChild>
          parent{" "}
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
  _type: "hackernews-live"
};

class Results extends React.Component {
  fetch_counts() {
    console.log("fetch_ocounts");
    // Define state numUpvotes, checked, and dataLoaded
    const request = new Request("http://localhost:8002/api/getsavedcount", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ post_id: this.props.id })
    });

    fetch(request)
      .then(response => {
        response.json().then(data => {
          this.setState({
            numUpvotes: data.saved
          });
        });
      })
      .catch(function(err) {
        console.log("caught :" + err);
      });
  }
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      dataLoaded: false,
      numUpvotes: 0
    };

    // Define state numUpvotes, checked, and dataLoaded
    const request = new Request("http://localhost:8002/api/getsavedcount", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ post_id: props.id })
    });

    fetch(request)
      .then(response => {
        response.json().then(data => {
          this.setState({
            numUpvotes: data.saved
          });
        });
      })
      .catch(function(err) {
        console.log("caught :" + err);
      });

    const check_state_request = new Request(
      "http://localhost:8002/api/checksaved",
      {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ post_id: props.id, user_id: 2 })
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
      .catch(function(err) {
        console.log("caught :" + err);
      });
  }

  handleCheckboxChange = event => {
    const old_state = this.state.checked;
    console.log("old statet = " + old_state);
    const op = old_state ? -1 : 1;
    const end_point = old_state
      ? "http://localhost:8002/api/unsave"
      : "http://localhost:8002/api/save";
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
        user_id: 2
      })
    });
    fetch(request)
      .then(function(response) {
        response.json().then(function(data) {
          console.log("data: ");
          console.log(data);
        });
      })
      .catch(function(err) {
        console.log("caught :" + err);
      });
  };
  render() {
    return (
      <ResultItem key={0}>
        <Flex>
          <FlexChild>
            <label>
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckboxChange}
              />
            </label>

            <div> {this.state.numUpvotes} </div>
          </FlexChild>
          <FlexChild>
            <Link href={this.props.data.link}> {this.props.data.title} </Link>
            <div
              dangerouslySetInnerHTML={{ __html: this.props.data.snippet }}
            />
            <Flex
              className={resultItemDetails}
              style={{ paddingTop: 5, marginTop: 5 }}
            >
              {!!data.parent && (
                <FlexChild>
                  parent{" "}
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
    );
  }
}

onData.propTypes = {
  _source: PropTypes.object // eslint-disable-line
};

export default Results;
