import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

import * as data_funcs from '../../store/data_store';

import './CommunityModal.css';

const EditCommunityForm = () => {

  
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useParams();
  const community = useSelector(state => state.data_store.all_communities[name]);
  
  
  
  const [showModal, setShowModal] = useState(false);
  const [communityName, setCommunityName] = useState(community?.name);
  const [communityImage, setCommunityImage] = useState(community?.community_image);
  const [communityInfo, setCommunityInfo] = useState(community?.community_info);
  const [communityMemberTitle, setCommunityMemberTitle] = useState(community?.member_title);
  const [id] = useState(community?.id);
  const [errors, setErrors] = useState([]);

  const handleEdit = (e) => {
    e.preventDefault();

    const community = {
      'name': communityName,
      'title': communityMemberTitle,
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
      <button className='main-links' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='com-form-cont'>
            <h2>Edit Community Details</h2>
            <form onSubmit={handleEdit}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>

              <div>
                <label htmlFor='name'>Community Name</label>
                <input
                  name='name'
                  type='text'
                  placeholder='What is it for?'
                  value={communityName}
                  onChange={(e) => setCommunityName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor='image'>Community Image</label>
                <input
                  name='image'
                  type='text'
                  placeholder='Optional image for your community'
                  value={communityImage}
                  onChange={(e) => setCommunityImage(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='info'>Community Info</label>
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

              <div>
                <label htmlFor='title'>Community Member Title</label>
                <input
                  name='title'
                  type='text'
                  placeholder='What do you call your members?'
                  value={communityMemberTitle}
                  onChange={(e) => setCommunityMemberTitle(e.target.value)}
                  required
                />
              </div>

              <button className='main-links' type='submit'>Submit</button>

            </form>
          </div>
        </Modal>
      )}
    </>
  )
};


export default EditCommunityForm;