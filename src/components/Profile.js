import React from 'react';
import Topic from './Topic'
import topics from "./sampleTopics";
import SearchContainer from '../styles/SearchContainer';

const Profile = () => (
    <SearchContainer>{topics.map(function (d, idx) {
        return (<Topic key={idx} data={d} />)
    })}</SearchContainer>
);

export default Profile;