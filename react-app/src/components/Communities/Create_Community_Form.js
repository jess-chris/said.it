import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Create_Community_Form = () => {

  const [communityName, setCommunityName] = useState('');
  const [communityImage, setCommunityImage] = useState('');
  const [communityInfo, setCommunityInfo] = useState('');
  const [communityMemberTitle, setCommunityMemberTitle] = useState('');


  const createCommunity = async (e) => {

    e.preventDefault()

    //const data = await 

  };



  return (
    <div className='com-form-cont'>

      <form onSubmit={createCommunity}>

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
          <label htmlFor='member-title'>Community Member Title</label>
          <input
            name='member-title'
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