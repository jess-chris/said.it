import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { io } from 'socket.io-client';


import * as data_funcs from '../../store/data_store';
import CreateCommunityForm from "../Communities/CreateCommunityForm";
import CreatePostForm from "../Posts/CreatePostForm";

import './HomePage.css'

let socket;

const HomePage = () => {

  const dispatch = useDispatch();
  const history = useHistory()
  const [loaded, setLoaded] = useState(false);
  const location = useLocation().pathname;

  
  const user = useSelector(state => state.session?.user);
  
  useEffect(() => {
    (async() => {
      await dispatch(data_funcs.get_communities());
      if (user) await dispatch(data_funcs.get_user_votes(user));
      setLoaded(true);
    })();
  }, [dispatch, user]);
  
  useEffect(() => {

    socket = io();

    socket.on("votes", async ({post}) => {


      const scoreCont = document.getElementById(`counter-${post}`)

      // await dispatch(data_funcs.get_communities());
      const {score} = await dispatch(data_funcs.current_post_score(post));
      scoreCont.innerText = score;

    });


    return (() => {
      socket.disconnect()
    })

  }, [dispatch]);



  const communityObj = useSelector(state => state.data_store.all_communities);
  const votes = useSelector(state => state.data_store.user_votes.post_votes);
  const communities = Object.values(communityObj);

  
  if (!loaded) {
    return null;
  }







  const saidIt = (e) => {

    e.preventDefault();

    const [name, id] = e.target.id.split(':');
    const voiceMessage = new SpeechSynthesisUtterance();
    voiceMessage.text = communityObj[name.toLowerCase()].posts[id].title;
    window.speechSynthesis.speak(voiceMessage);

  };

  const handleVote = async (post, val) => {

    if (!user) {
      return history.push('/login')
    }

    const upArrow = document.getElementById(`up:${post}`);
    const downArrow = document.getElementById(`down:${post}`);
    const scoreCont = document.getElementById(`counter-${post}`)


    if (val === true) {

      upArrow.getAttribute('fill') === 'none' ? upArrow.setAttribute('fill', '#ff4500') : upArrow.setAttribute('fill', 'none');
      if (downArrow.getAttribute('fill') !== 'none') downArrow.setAttribute('fill', 'none');


    } else if (val === false) {

      downArrow.getAttribute('fill') === 'none' ? downArrow.setAttribute('fill', '#0079D3') : downArrow.setAttribute('fill', 'none');
      if (upArrow.getAttribute('fill') !== 'none') upArrow.setAttribute('fill', 'none');
    }

    const vote = {
      userId: user.id,
      postId: post,
      voteType: val
    };

    await dispatch(data_funcs.post_vote(vote));
    await dispatch(data_funcs.get_communities());
    const {score} = await dispatch(data_funcs.current_post_score(post));
    scoreCont.innerText = score;

    socket.emit("votes", {post});
  };

  
  return (

    <div className="main-cont">


      <div className="post-cont">

        <div className="post-cont-topbar">
          <button className="post-links light-text"><i className="fa-solid fa-burst fa-lg"></i>  New</button>
          <button className="post-links light-text"><i className="fa-solid fa-arrow-up-from-bracket fa-lg"></i>  Top</button>
        </div>

        <div className="medium-text" style={{'fontWeight':'bold', 'opacity':'0.7'}}>Popular posts</div>

        <div style={{'paddingTop': '20px'}}>

          {loaded && communities?.map((community) => {
            let posts = Object.values(community.posts).reverse();
            return posts?.map((post) => {
              // for (const [key, post] of Object.entries(community?.posts)) {
              return (
                <>
                  <div key={`key:${post.id}`} className="single-post">
                    <div className="single-post-btn-bar">
                      <div className={`vote-cont-${post?.id}`} style={{'display': 'flex', 'flexDirection':'column', 'justifyContent': 'center', 'alignItems':'center'}}>
                        <svg onClick={() => handleVote(post?.id, true)} className="vote-buttons" id="upVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path id={`up:${post?.id}`} d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" strokeWidth="1.5" stroke="#666" fill={votes !== undefined && post?.id in votes && votes[post?.id]?.vote_type === true ? '#ff4500' : 'none'} strokeLinejoin="round"></path>
                        </svg>
                        <div style={{'cursor':'auto'}} id={`counter-${post?.id}`}>{post?.vote_score}</div>
                        <svg onClick={() => handleVote(post?.id, false)} className="vote-buttons" id="downVoteButton" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path id={`down:${post?.id}`} d="m12 20 9-11h-6V4H9v5H3z" className="icon_svg-stroke icon_svg-fill" stroke="#666" fill={votes !== undefined && post?.id in votes && votes[post?.id]?.vote_type === false ? '#0079D3' : 'none'} strokeWidth="1.5" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <div></div>
                      <div className="sound-cont">
                        <button onClick={saidIt} style={{'background':'none', 'border':'none', 'color': 'grey'}}><i id={`${community.name}:${post?.id}`} className="fa-solid fa-volume-high"></i></button>
                      </div>
                    </div>
                    <div className="single-post-content">
                      <div><NavLink to={`/s/${community?.name}`}><span className="bold-text">{`s/${community?.name}`}</span></NavLink> • <span className="light-text" style={{'cursor':'auto'}}>Posted by u/{post?.user_name}</span></div>
                      <NavLink to={{pathname: `/s/${community?.name}/${post?.id}/${post?.title.replaceAll(' ', '_')}`, state:{location}}}>
                      <p className="medium-text" style={{'fontWeight': 'bold'}}>{post?.title}</p>
                      <div className="text-post-content">
                        <p className="light-text">{post?.content}</p>
                      </div>
                      </NavLink>
                      <div className="single-post-footer">
                        <i className="fa-regular fa-message fa-lg"></i>
                        <span style={{'opacity':'1', 'cursor':'auto'}} className="light-text">  {post?.comments.length} Comments</span>
                      </div>
                    </div>
                  </div>
                  
                </>
              )
            })
          })}

        </div>

      </div>

      <div className="side-page-cont">

        <div className="side-page">

          <div className='side-header'>

            <div id="banner">
              <h2 className="bold-text" style={{'color': '#fff', 'fontSize': '16px'}}>Top Communities</h2>
            </div>

            <ol style={{"listStyle":"none"}}>

              {loaded && communities?.map((community, ind) => {
                if (ind >= 5) return false;
                return(
                  <li className="top-com-list" key={community?.name}>
                      <NavLink className='bold-text' to={`s/${community?.name}`}>
                      <img className='community-logo' alt='community-logo' src={`${community?.community_image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABFZJREFUWEfVWU1oVFcU/m6CJRKiCQE1am1GY8VoNNqdUrW4DSSFrETQoi4UQiLiz0iL2oKjltJphbrQ0hSkq4Ij1KU0UXSnHR0bUYOT+DcqhmSU4KBMnnzv5SVv3rv3/WU6pGeTkHfuud89P98590YgrERvfQ6UbwS0zyCwDBrmA6LKMKe9gcAzaLgHiBtAvhex1VfDbCUCLTr0bwNEfhcgtgBYGGgt8ATQ/oBWfhYnVvT7XesP4OHUXGg4AmC3X8MeemcgcAzHm1542fMGGE3tAPADgNlexgJ+zwLYh1jTr27r3AFGU78U0WsqHGcQa9qj+qgGeOh2AkK0BvRKOHVNu4gTq9pki+UASwnORKUA6QRYmrD6DnchQKMgzoWLk7GqvuYjpPd/imQmh2TmLZLP+DOHwZH3uLB1EZrrKhC/NoS9lzKqbXZaC2cSoEEl96ZarW2Ns3QgBNBcN1MHtLquwgFmzel+HbhEsjrxj1PQJMAihfbo5jnYtLgSm86mC/ZObF2E1sZZE3+LfH8fA8PvPENtANQ7xNiDqYTWXNuzK4Keh6M4evllgTmGvrt9ATZGKnHs8kvHd8feWtlSdhwDYPT2SUAcKAZA7fhKfHn+ERJ9r6doTjuF2KqD4wBTj0P0VgcA5ts/HQ3wCJ9f4E8Qa/pYQJ9Kyq74XeWmt31tDeIt81D97d1imAMwtkEgeudrQPsurEXm1ifVM4zCiFSivmYGui49x+DwO1WVBthKfCMQTV0AIG0zKkvVFeXoXF+LrvW14O9uQiqJX3uF32+OBAA2oZoQOJzqg4blstXc/MeWeSC3sTK5CTnNDzC7PVIKCbo3PYojm+foByN4VvRILi8HL3CXHuTRpKNUsqNBSrJhXKFaQ5AkbYVkmYN5QCuzK5gVWUwwKlvqriLGlACZ9H/vjEhtsq92/ZXRw87w/9a+QKrHdkcdtjxW92xFvnoAVId44MAyvULt8tP1IR2gKbJUuJXJodkSuu72hdi2ttphi4etP8URQCpZzyJh67I3ez8AL/a9Rtv5RxO7xlvq0LmutgAFwTX/3O9ZJK40w+bPqrMKK5Jc1/twFK2NVaB3ZEKABEquNEctqx4r2j5U2OwkPIlaBjBI4ZBCVFxpj4TTrk7U7q3uv6zmr/58iu6bwy7nZaujRN2HBeYhxyS7kLhliW/VY4itc6D5zaM4qDY+LOgA3cct5lCyY4mDJr44l8bA8HswDayTMyuYBMyZkL2Z+WcPs8tEPX4G67jlY2AlAHrSzmXkufj1IRCUOSHzQHpLXFerDxFWyebyenVznasUDKxGmD0v6fQCp2JZyPwUDquW/Km4i1hNTFzmQ12a6BXOfm2NVcruYM9DetnTa8YixaXJ8GLgayfBMvz0LkNLMUPdkx71C8p6HsW101TxEWo/4Qyp43in+R8+fZhHL+X7TODHo9KGO+Tz2yTIafyAaYKc1k/A1nKcto/oMs4o0b8hPgAAePkgmneDRQAAAABJRU5ErkJggg=='}`} width='20px' height='20px'></img>
                        s/{community?.name}
                      </NavLink>
                  </li>

                )
              })}

            </ol>

          </div>

          <div className="main-spacer"></div>

          <div className="side-header">

            <div className="p-home-banner"></div>

            <div className="personal-home-cont">

              <div className="p-home-header">
                <div id="p-home-moogle"></div>
                <p className="bold-text">Home</p>
              </div>

              <div>
                <p>Your personal Said.it frontpage. Come here to check in with your favorite communities, and hear them too!</p>
              </div>

              <div id="create-links">
                <CreatePostForm />
                <CreateCommunityForm />
              </div>

            </div>



          </div>

          <div className="main-spacer"></div>

          <div className='side-header' style={{'position':'sticky', 'top':'50px'}}>
              <div className='bold-text com-banner' style={{'justifyContent':'center'}}>
                Technologies Used & Links
              </div>
              <ul className='light-text'>
                <li key='react'>React</li>
                <li key='redux'>Redux</li>
                <li key='python'>Python</li>
                <li key='flask'>Flask SQLAlchemy</li>
                <li key='psql'>PostgreSQL</li>
              </ul>
              <div style={{'textAlign':'center'}} className="light-text">Developed by Jesse Christensen</div>
              <div style={{'display':'flex', 'flexDirection':'row', 'textAlign':'center'}}>
                <a href='https://www.linkedin.com/in/jesse-christensen-204801232/'><div className="bold-text"><i className="fa-brands fa-linkedin"></i>  LinkedIn</div></a>
                <a href='https://github.com/jess-chris'><div className="bold-text"><i className="fa-brands fa-github-square"></i>   GitHub</div></a>
              </div>
            </div>


        </div>


      </div>


    </div>




  )



};


export default HomePage;