import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from 'react-router-dom';

import * as data_funcs from '../../store/data_store';
import './PostForm.css';

const CreatePostForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [communityName, setCommunityName] = useState('');





  const userId = useSelector(state => state.session.user?.id);
  const communityObj = useSelector(state => state.data_store?.all_communities);
  const communities = Object.values(communityObj);
  const communityId = useSelector(state => state.data_store?.all_communities[communityName.toLowerCase()]);

  const handlePost = async (e) => {

    e.preventDefault();
  
    let id;

    try {
      id = communityId.id;
    } catch {
      return setErrors(['Community does not exist']);
    }

    const post = {
      'name': communityName,
      'community': id,
      'userId': userId,
      'content': content.trim(),
      'title': postTitle.trim()
    };

    const data = await dispatch(data_funcs.create_post(post));

    if (data) {
      setErrors(data);
    } else {
      history.push(`/s/${communityName}`);
    }
  }

  // TODO text editor 

  // const handleKeyCommand = () => {

  // };

  
  return (
    <>
      <button onClick={() => setShowModal(true)} style={{"backgroundColor": "#0079D3", "color": "#FFF", "borderColor": "#0079D3"}} className="main-links">Create Post</button>
      {showModal && userId && (
      <Modal onClose={() => setShowModal(false)}>
        <div className='post-form-cont'>
          <svg onClick={() => setShowModal(false)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="menu-close">
            <polygon fill="inherit" points="11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497"></polygon>
          </svg>

          <form className='post-form' onSubmit={handlePost}>
            <div id='community-dropdown'>
              <fieldset id='community-list'>
                <select onChange={(e) => setCommunityName(e.target.value)} required name='communities' style={{'border':'none', 'outline':'none'}}>
                  <option value=''>Choose a community</option>
                  {communities && communities.map((community) => {
                    return (
                      <>
                        <option name={community?.name} className='profile-btn-item' key={community?.id} value={community?.name.toLowerCase()}>{community?.name}</option>
                      </>
                    )
                  })}
                </select>
              </fieldset>
              {/* <label htmlFor='name'></label>
              <textarea
                name='name'
                className='post-input'
                rows='1'
                cols='40'
                placeholder='Community name'
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                required
              /> */}
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>

            <div>
              <label htmlFor='title'></label>
              <textarea
                name='title'
                className='post-input'
                id='post-title'
                rows='1'
                cols='75'
                placeholder='Title'
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor='content'></label>
              <textarea
                name='content'
                className='post-input'
                id='post-content'
                rows='15'
                cols='75'
                placeholder='Text (optional)'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>

            </div>

            <button className='main-links btn-style' type='submit'>Submit</button>
          </form>

        </div>
      </Modal>
      )}
      {showModal && !userId && (
      <Redirect to='/login' />
      )}
    </>
  )
};


export default CreatePostForm;