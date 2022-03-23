import { Fragment } from 'react';
import classes from './MeetupDetail.module.css';
const MeetupDetail = (props) => {
  return (
    <Fragment>
      <div className={classes['meetup_detail']}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </div>
    </Fragment>
  );
};

export default MeetupDetail;
