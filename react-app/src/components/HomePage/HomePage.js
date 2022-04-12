import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { get_communities } from "../../store/posting";

import './HomePage.css'

const HomePage = () => {

  const dispatch = useDispatch();
  const communityObj = useSelector(state => state.posting.all_communities)
  const communities = Object.values(communityObj);
  
  useEffect(() => {
    dispatch(get_communities(communities));
  }, [dispatch]);
  

  console.log(communities)


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

            <p>testing aaaaaaaaaaaaaaaaaaaaaaaaaa</p>

          </div>

          <div className="single-post">

            <p>testing aaaaaaaaaaaaaaaaaaaaaaaaaa</p>

          </div>

          <div className="single-post">

            <p>testing aaaaaaaaaaaaaaaaaaaaaaaaaa</p>

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