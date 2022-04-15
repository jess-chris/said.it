import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";

import * as data_funcs from '../../store/data_store';


const EditPostForm = ({ post }) => {

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

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

    await dispatch(data_funcs.delete_post(toDelete));
    await dispatch(data_funcs.get_communities());

  }



  return (
    <>
      <button onClick={() => setShowModal(true)} className="main-links btn-style">Edit</button>
      <button className='main-links btn-style' onClick={handleDelete}>Delete</button>
      {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <div className='post-form-cont'>
          <form onSubmit={editPost}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
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


export default EditPostForm;