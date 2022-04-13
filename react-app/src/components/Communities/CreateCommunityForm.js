import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as data_funcs from '../../store/data_store';

const Create_Community_Form = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [communityName, setCommunityName] = useState('');
  const [communityImage, setCommunityImage] = useState('');
  const [communityInfo, setCommunityInfo] = useState('');
  const [communityMemberTitle, setCommunityMemberTitle] = useState('');
  const [errors, setErrors] = useState([]);

  const createCommunity = async (e) => {

    e.preventDefault()

    const community = {
      'name': communityName,
      'title': communityMemberTitle,
      'image': communityImage,
      'info': communityInfo
    }

    const data = await dispatch(data_funcs.create_community(community));

    if (data) {
      setErrors(data);
    }

    history.push('/');
    

  };



  return (
    <div className='com-form-cont'>

      <form onSubmit={createCommunity}>
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

        <button type='submit'>Create</button>

      </form>


    </div>
  )

};


export default Create_Community_Form;