import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as data_funcs from '../../store/data_store';

import './Community.css';
import EditCommunityForm from './EditCommunityForm';

const ViewCommunity = () => {

const dispatch = useDispatch();
const [loaded, setLoaded] = useState(false);
const history = useHistory();
const { name } = useParams();

useEffect(() => {
  (async() => {
    await dispatch(data_funcs.get_communities());
    setLoaded(true);
  })();
}, [dispatch]);


const userId = useSelector(state => state.session.user.id);
const community = useSelector(state => state.data_store.all_communities[name]);

if (!loaded) {
  return null;
}

const handleDelete = (e) => {

  e.preventDefault();

  const data = {
    community_id: community.id
  };

  dispatch(data_funcs.delete_community(data));
  history.push('/');
};

let sessionLinks;

if (userId === community?.owner) {

  sessionLinks = (
    <div id='com-btns'>
      <EditCommunityForm />
      <button className='main-links' onClick={handleDelete}>Delete</button>
    </div>
    );

}



return (
  <div className='community-page'>

    <div className='com-header-cont'>
      <span className='com-header'></span>
    </div>

    <div className='main-com-cont'>

      <div className='com-menu-bar'>
        <h1>Welcome to s/{community?.name}</h1>
        {sessionLinks && sessionLinks}
      </div>

    </div>

    <div className='com-content'>

    </div>

  </div>
)

};

export default ViewCommunity;