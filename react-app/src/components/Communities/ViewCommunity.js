import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as data_funcs from '../../store/data_store';

import './Community.css';
import EditCommunityForm from './EditCommunityForm';

const ViewCommunity = () => {

const dispatch = useDispatch();
const history = useHistory();
const { name } = useParams();
const userId = useSelector(state => state.session.user.id);
const community = useSelector(state => state.data_store.all_communities[name]);

//const community = Object.values(communityObj)

const handleDelete = (e) => {

  e.preventDefault();

  const data = {
    community_id: community.id
  };

  dispatch(data_funcs.delete_community(data));
  history.push('/');
};




return (
  <div className='community-page'>

    <div className='com-header-cont'>
      <span className='com-header'></span>
    </div>

    <div className='main-com-cont'>

      <div className='com-menu-bar'>
        <h1>Welcome to s/{community?.name}</h1>
        {userId && userId === community?.owner && (
        <div id='com-btns'>
          <EditCommunityForm />
          <button className='main-links' onClick={handleDelete}>Delete</button>
        </div>
        )}
      </div>

    </div>

    <div className='com-content'>

    </div>

  </div>
)

};

export default ViewCommunity;