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
      <Modal onClose={() => setShowModal(false)}>
        <div className='main-spacer'></div>
        <div className='comment-form-modal'>
          <form onSubmit={editComment}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label htmlFor='content'></label>
              <textarea
                name='content'
                rows='15'
                cols='75'
                placeholder='Text (optional'
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


export default EditCommentForm;