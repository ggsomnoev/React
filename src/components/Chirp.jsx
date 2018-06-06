import React from 'react';
import {Link} from 'react-router-dom';
import { calcTime } from '../utils/dateConverter';

export default (props) => {
    return (<article className="chirp">
        <div className="titlebar">
            {props.id !== props.chirp._acl.creator ?
                <Link to={"/user/" + props.chirp._acl.creator} className="chirp-author">{props.chirp.author}</Link> :
                ''
            }
            <span className="chirp-time">{calcTime(props.chirp._kmd.lmt)}</span>
        </div>
        <p>{props.chirp.text}</p>
    </article>);
}