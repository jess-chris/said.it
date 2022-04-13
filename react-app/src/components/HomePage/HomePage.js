import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import './HomePage.css'

const HomePage = () => {

  //const dispatch = useDispatch();
  const communityObj = useSelector(state => state.data_store.all_communities)
  const communities = Object.values(communityObj);
  
  // useEffect(() => {
  //   dispatch(get_communities(communities));
  // }, [dispatch]);



  return (

    <div className="main-cont">


      <div className="post-cont">

        <div className="post-cont-topbar">
          <button>Test</button>
          <button>Test</button>
          <button>Test</button>
        </div>

        <div>

          <div className="single-post">

            <p>{`/s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>

          <div className="single-post">

            <p>{`/s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>

          <div className="single-post">

            <p>{`/s/${communities[0]?.name}`}</p>
            <p>post data</p>
            <p>post data</p>
            <p>post data</p>

          </div>


        </div>


      </div>

      <div className="side-page-cont">

        <div className="side-page">


        </div>


      </div>


    </div>




  )



};


export default HomePage;