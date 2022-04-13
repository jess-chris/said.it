import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

import * as data_funcs from '../../store/data_store';

const CreatePostForm = () => {

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState('');

  const userId = useSelector(state => state.session.user.id);
  const communityObj = useSelector(state => state.data_store.all_communities)
  const communities = Object.values(communityObj);

  const createPost = async (e) => {

    e.preventDefault();

    const post = {

    };
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
              <label htmlFor='community'>Community Name</label>
              <input
                name='name'
                type='text'
                placeholder='Which community do you want to post to?'
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
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