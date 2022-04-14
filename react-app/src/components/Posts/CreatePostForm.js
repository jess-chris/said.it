import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import * as data_funcs from '../../store/data_store';

const CreatePostForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [communityName, setCommunityName] = useState('');

  const userId = useSelector(state => state.session.user?.id);
  const community = useSelector(state => state.data_store?.all_communities[communityName.toLowerCase()]);

  const createPost = async (e) => {

    e.preventDefault();
  
    let id;

    try {
      id = community.id;
    } catch {
      return setErrors(['Community does not exist']);
    }

    const post = {
      'name': communityName,
      'community': id,
      'userId': userId,
      'content': content
    };

    const data = await dispatch(data_funcs.create_post(post));

    if (data) {
      setErrors(data);
    } else {
      history.push(`/s/${communityName}`);
    }

  }

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{"backgroundColor": "#0079D3", "color": "#FFF", "borderColor": "#0079D3"}} className="main-links">Create Post</button>
      {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <div className='post-form-cont'>
          <form onSubmit={createPost}>
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
                placeholder='Which community do you want to post to?'
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='content'></label>
              <textarea
                name='content'
                rows='15'
                cols='75'
                placeholder='Content goes here'
                value={content}
                onChange={(e) => setContent(e.target.value)}
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


export default CreatePostForm;