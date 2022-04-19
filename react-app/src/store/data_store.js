// Community 

const GET_COMMUNITIES = 'data_store/GET_COMMUNITIES';
const CREATE_COMMUNITY = 'data_store/CREATE_COMMUNITY';
const EDIT_COMMUNITY = 'data_store/EDIT_COMMUNITY';
const DELETE_COMMUNITY = 'data_store/DELETE_COMMUNITY';

const GET_USER_POST_VOTES = 'data_store/GET_USER_POST_VOTES';
const UPDATE_USER_POST_VOTES = 'data_store/UPDATE_USER_POST_VOTES';
const GET_USER_COMMENT_VOTES = 'data_store/GET_USER_COMMENT_VOTES';
const UPDATE_USER_COMMENT_VOTES = 'data_store/UPDATE_USER_POST_VOTES';


const all_communities = (communities) => ({
  type: GET_COMMUNITIES,
  communities
});



const add_community = (community) => ({
  type: CREATE_COMMUNITY,
  community
});


const del_community = (community) => ({
  type: DELETE_COMMUNITY,
  community
});

const ed_community = (community, old) => ({
  type: EDIT_COMMUNITY,
  community,
  old
});

const user_post_votes = (votes) => ({
  type: GET_USER_POST_VOTES,
  votes
});

const update_post_votes = (vote) => ({
  type: UPDATE_USER_POST_VOTES,
  vote
});

const user_comment_votes = (votes) => ({
  type: GET_USER_COMMENT_VOTES,
  votes
});

const update_comment_votes = (vote) => ({
  type: UPDATE_USER_COMMENT_VOTES,
  vote
});



// Communities

export const get_communities = () => async (dispatch) => {

  const res = await fetch('/api/communities/')
  if (res.ok) {
    const { communities } = await res.json()
    dispatch(all_communities(communities));
  } else {
    return 'ERROR'
  }
};





export const create_community = (community) => async (dispatch) => {

  const res = await fetch('/api/communities/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(community)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(add_community(data));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};


export const edit_community = (community) => async (dispatch) => {

  const res = await fetch('/api/communities/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(community)
  });

  if (res.ok) {
    const {community, old} = await res.json();
    dispatch(ed_community(community, old));
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};



export const delete_community = (community_id) => async (dispatch) => {

  const res = await fetch('/api/communities/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(community_id)
  });

  if (res.ok) {
    const community = await res.json();
    await dispatch(del_community(community));
    return community;
  }

};



// Posts

export const create_post = (post) => async (dispatch) => {

  const res = await fetch('/api/posts/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });

  if (res.ok) {
    await res.json();
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};


export const edit_post = (post) => async (dispatch) => {

  const res = await fetch('/api/posts/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });

  if (res.ok) {
    await res.json();
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};


export const delete_post = (post_id) => async (dispatch) => {

  const res = await fetch('/api/posts/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post_id)
  });

  if (res.ok) {
    const post = await res.json();
    return post;
  } 
};


export const current_comment_score = (commentId) => async dispatch => {

  const res = await fetch(`/api/comments/score/${commentId}`, {
    headers: {
    'Content-Type': 'application/json'
    },
  });

  if (res.ok) {
    const score = await res.json()
    return score;
  }
};

// Comments

export const create_comment = (comment) => async (dispatch) => {

  const res = await fetch('/api/comments/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    await res.json();
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


export const edit_comment = (comment) => async (dispatch) => {

  const res = await fetch('/api/comments/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    await res.json();
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


export const delete_comment = (comment) => async (dispatch) => {

  const res = await fetch('/api/comments/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    const comment = await res.json();
    return comment;
  } 
};

export const current_post_score = (postId) => async dispatch => {

  const res = await fetch(`/api/posts/score/${postId}`, {
    headers: {
    'Content-Type': 'application/json'
    },
  });

  if (res.ok) {
    const score = await res.json()
    return score;
  }
};



// Votes

export const get_user_votes = (userId) => async (dispatch) => {

  if (!userId) return null;

  const res = await fetch('/api/votes/post_vote')
  if (res.ok) {
    const votes = await res.json()
    await dispatch(user_post_votes(votes));
  } 

  const res2 = await fetch('/api/votes/comment_vote')
  if (res2.ok) {
    const votes = await res2.json()
    await dispatch(user_comment_votes(votes));
  } 

};


export const post_vote = (vote) => async (dispatch) => {

  const res = await fetch('/api/votes/post_vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  });

  if (res.ok) {
    const vote = await res.json();
    await dispatch(update_post_votes(vote))
  }

};


export const comment_vote = (vote) => async (dispatch) => {

  const res = await fetch('/api/votes/comment_vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  });

  if (res.ok) {
    const vote = await res.json();
    await dispatch(update_comment_votes(vote))
  }

};




export default function reducer(state = {all_communities: {}, user_votes: {post_votes: {}, comment_votes: {}}}, action) {

  const newState = { ...state }

  switch(action.type) {

    case GET_COMMUNITIES:
      action.communities.forEach((community) => {
      newState.all_communities[community.name.toLowerCase()] = community;
      
      // community.posts.forEach((post, ind) => {
      //     if (post.id !== ind) {
      //       newState.all_communities[community.name.toLowerCase()].posts[ind] = post;
      //       newState.all_communities[community.name.toLowerCase()].posts[post.id] = newState.all_communities[community.name.toLowerCase()].posts[ind];
      //       delete newState.all_communities[community.name.toLowerCase()].posts[ind];
      //       }
      });
        
        
        
        // community.post.comments.forEach((comment, cind) => {
          //   if (comment.id !== cind) {
            //     newState.all_communities[community.name.toLowerCase()].post.comments[cind] = comment;
            //     newState.all_communities[community.name.toLowerCase()].post.comments[comment.id] = newState.all_communities[community.name.toLowerCase()].post.comments[cind];
            //     delete newState.all_communities[community.name.toLowerCase()].post.comments[cind];
            //   }
            // });
            
            
            // community.posts.comments.forEach(comment => console.log(comment))
            
      // });
      return newState;

    case CREATE_COMMUNITY:
      newState.all_communities[action.community.name.toLowerCase()] = action.community;
      return newState;

    case EDIT_COMMUNITY:
      if(action.old.toLowerCase() !== action.community.name.toLowerCase()) {
        newState.all_communities[action.old.toLowerCase()] = action.community;
        newState.all_communities[action.community.name.toLowerCase()] = newState.all_communities[action.old]
        delete newState.all_communities[action.old]
      } else {
        newState.all_communities[action.community.name.toLowerCase()] = action.community;
      }
      return newState;

    case DELETE_COMMUNITY:
      delete newState.all_communities[action.community.name.toLowerCase()];
      return newState;

    case GET_USER_POST_VOTES:
      action.votes.post_votes.forEach((vote) => {
        newState.user_votes.post_votes[vote.post_id] = vote;
      });
  
      return newState;

    case UPDATE_USER_POST_VOTES:
    

      if (newState.user_votes[action.vote.post_id]?.vote_type === action.vote.vote_type) {
        delete newState.user_votes[action.vote.post_id];
      } else {
        newState.user_votes[action.vote.post_id] = action.vote
      }
  
      return newState;

    case GET_USER_COMMENT_VOTES:
      action.votes.comment_votes.forEach((vote) => {
        newState.user_votes.comment_votes[vote.comment_id] = vote;
      });
  
      return newState;

    case UPDATE_USER_COMMENT_VOTES:
  
      if (newState.user_votes[action.vote.comment_id]?.vote_type === action.vote.vote_type) {
        delete newState.user_votes[action.vote.comment_id];
      } else {
        newState.user_votes[action.vote.comment_id] = action.vote
      }
  
      return newState;

    default:
      return state;
  }
};