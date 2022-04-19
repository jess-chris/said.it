import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

import * as data_funcs from '../../store/data_store';

import './CommunityModal.css';

const EditCommunityForm = ({value}) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams();
  const community = useSelector(state => state.data_store.all_communities[name.toLowerCase()]);
  
  
  const [showModal, setShowModal] = useState(value ? true : false);
  const [communityName, setCommunityName] = useState(community?.name);
  const [communityImage, setCommunityImage] = useState(community?.community_image);
  const [communityInfo, setCommunityInfo] = useState(community?.community_info);
  // const [communityMemberTitle, setCommunityMemberTitle] = useState(community?.member_title);
  const [id] = useState(community?.id);
  const [errors, setErrors] = useState([]);

  const handleEdit = (e) => {
    e.preventDefault();

    const community = {
      'name': communityName,
      // 'title': communityMemberTitle,
      'image': communityImage,
      'info': communityInfo,
      id
    }

    const data = dispatch(data_funcs.edit_community(community));

    if (data) {
      setErrors(data);
    }


    setShowModal(false);
    history.push(`/s/${communityName}`);
    
  }



  return (
    <>
      {/* <div className='btn-style profile-btn-item' onClick={() => setShowModal(true)}>Edit</div> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} currentId={'new-com-modal'}>
        <div className='com-form-cont'>
          <div className='com-form-header-cont'>
            <h1 className='com-form-header'>Create a community</h1>
            <svg onClick={() => setShowModal(false)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="menu-close">
              <polygon fill="inherit" points="11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497"></polygon>
            </svg>
          </div>
          <form onSubmit={handleEdit}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='com-form-name'>
              <label className='com-form-header' htmlFor='name'>Name</label>
              <div style={{'marginBottom':'16px'}} className='light-text'>Community names are case sensitive for display only, they must be unique.</div>
              <div className='com-form-name com-name-input'>
                <span id='prefix-text'>s/</span>
                <input
                  name='name'
                  type='text'
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  maxLength='40'
                  required
                />
              </div>
              <div style={{'margin':'16px 0'}} className='light-text'>{40 - communityName.length} Characters remaining</div>
            </div>
            <div className='com-form-name'>
              <label className='com-form-header' htmlFor='image'>Community Image</label>
              <div style={{'marginBottom':'16px'}} className='light-text'>Will only accept image url's of .jpg or .png</div>
              <input
                name='image'
                type='text'
                placeholder='Optional image for your community'
                value={communityImage}
                onChange={(e) => setCommunityImage(e.target.value)}
                disabled={true}
              />
            </div>
            <div className='com-form-name'>
              <label style={{'marginBottom':'16px'}} className='com-form-header' htmlFor='info'>Community Info</label>
              <textarea
                name='info'
                rows='15'
                cols='75'
                placeholder='Let people know what your community is about'
                value={communityInfo}
                onChange={(e) => setCommunityInfo(e.target.value)}
                required
              />
            </div>
            {/* <div>
              <label htmlFor='title'>Community Member Title</label>
              <input
                name='title'
                type='text'
                placeholder='Title for your users'
                value={communityMemberTitle}
                onChange={(e) => setCommunityMemberTitle(e.target.value)}
                required
              />
            </div> */}
            <div className='com-form-btn-bar'>
              <button id='com-cancel-btn' className='main-links btn-style' onClick={() => setShowModal(false)}>Cancel</button>
              <button id='com-create-btn' className='main-links btn-style' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </Modal>
      )}
    </>
  )
};


export default EditCommunityForm;