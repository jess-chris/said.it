import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";

import * as data_funcs from '../../store/data_store';
import { useHistory, useParams } from 'react-router-dom';


const EditCommentForm = ({ comment }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState(comment?.content);

  const {name, id, title} = useParams();

  const editComment = async (e) => {

    e.preventDefault();
  
    const updated_comment = {
      'commentId': comment.id,
      'content': content
    };

    const data = await dispatch(data_funcs.edit_comment(updated_comment));
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
      'commentId': comment.id
    };

    await dispatch(data_funcs.delete_comment(toDelete));
    await dispatch(data_funcs.get_communities());
    history.push(`/s/${name}/${id}/${title}`);
  }



  return (
    <>
      <button onClick={() => setShowModal(true)} className="main-links btn-style">Edit</button>
      <button className='main-links btn-style' onClick={handleDelete}>Delete</button>
      {showModal && (
      <Modal onClose={() => setShowModal(false)} currentId={'new-com-modal'}>
        <div className='edit-post-cont' style={{'width':'600px'}}>
          <div className='create-post-top'>
            <h3 className='bold-text'>Edit Comment</h3>
          </div>
          <form onSubmit={editComment}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='create-post-content'>
              <label htmlFor='content'></label>
              <textarea
                name='content'
                style={{'height':'200px'}}
                placeholder='Text (optional'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className='create-post-bar'>
              <div id='post-btn'>
                <button className='main-links btn-style' type='submit'>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      )}
    </>
  )
};


export default EditCommentForm;