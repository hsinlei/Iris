import React from 'react';
import Topic from './Topic'
import topics from "./sampleTopics";
import SearchContainer from '../styles/SearchContainer';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Fab from '@material-ui/core/Fab';
import 'react-vertical-timeline-component/style.min.css';


const Profile = () => (
        <VerticalTimeline layout='1-column' style={{color:'#aaaaaa'}}>
            {topics.map(function (d, idx) {
                return (<VerticalTimelineElement key={idx}
                    className={d.title} icon={
                        <Fab aria-label="add" size='medium' style={{margin:0, padding:0, position:'absolute', top:'50%', boxShadow: 'none' }}>
                            {d.numTitles}
                        </Fab>} position='right'>
                        <Topic key={idx} data={d} />
                </VerticalTimelineElement>)
            })}
        </VerticalTimeline>
);

export default Profile;