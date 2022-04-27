import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";

import * as data_funcs from '../../store/data_store';
import { useHistory, useParams } from 'react-router-dom';


const EditPostForm = ({ post }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const {name} = useParams();

  const editPost = async (e) => {

    e.preventDefault();
  
    const updated_post = {
      'id': post.id,
      'title': title,
      'content': content
    };

    const data = await dispatch(data_funcs.edit_post(updated_post));
    await dispatch(data_funcs.get_communities());

    if (data) {
      setErrors(data);
    } else {
      setShowModal(false)
    }

  }


  const handleDelete = async (e) => {
    e.preventDefault()

    const toDelete = {
      'id': post.id
    };

    setShowModal(false)
    history.push(`/s/${name}`);
    await dispatch(data_funcs.delete_post(toDelete));
    await dispatch(data_funcs.get_communities());
  }



  return (
    <>
      <button onClick={() => setShowModal(true)} className="main-links btn-style">Edit</button>
      <button className='main-links btn-style' onClick={handleDelete}>Delete</button>
      {showModal && (
      <Modal onClose={() => setShowModal(false)} currentId={'new-com-modal'}>
        <div className='create-post-cont'>
          <div className='create-post-top'>
            <h3 className='bold-text'>Edit Post</h3>
          </div>
          <form onSubmit={editPost}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='create-post-body'>
              <div className='create-post-title'>
                <div>
                  <label htmlFor='title'></label>
                  <textarea
                    name='content'
                    rows='2'
                    cols='75'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className='create-post-content' style={{'padding':'10px'}}>
              <div>
                <label htmlFor='content'></label>
                <textarea
                  name='content'
                  style={{'height':'200px'}}
                  placeholder='Text (optional)'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className='create-post-bar'>
              <div id='post-btn'>
                <button className='main-links' type='submit'>Submit</button>
              </div>
            </div>

          </form>
        </div>
      </Modal>
      )}
    </>
  )
};


export default EditPostForm;