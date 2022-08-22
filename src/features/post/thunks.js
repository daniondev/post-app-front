import {
  startLoadingPost,
  readPost,
  loadPost,
  createPost,
  deletePost,
} from "./postSlice";
import axios from "axios";

export const readPostThunk = (page = 0) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPost());

    const resp = await axios.get(
      `http://localhost:4000/post/reads/10/${page * 10}`
    );

    dispatch(
      readPost({
        posts: resp.data,
        page: page,
      })
    );
  };
};

export const loadPostThunk = (posts) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPost());

    dispatch(
      loadPost({
        posts
      })
    );
  };
};

export const createPostThunk = (post) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axios.post("http://localhost:4000/post/create", post);

      if (resp.data.isValid === true) {
        const newPost = {
            id : resp.data.body.id,
            nombre : post.nombre,
            descripcion: post.descripcion
        }

        // TODO: Agregar al filteredPosts solo si corresponde a lo filtrado
        dispatch(
          createPost({
            post: newPost
          })
        );
      } else {
        console.log(resp.data.message);
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(`Error : ${e.message}`);
      }
    }
  };
};

export const deletePostThunk = (posts, post, filtered) => {
  return async (dispatch, getState) => {
    const newPost = {
      nombre: post.nombre,
      descripcion: post.descripcion,
    };

    try {
      const resp = await axios.put(
        `http://localhost:4000/post/delete/${post.id}`,
        newPost
      );

      if (resp.data.isValid === true) {
        
        const filterDelete = posts.filter(function(value, index, arr){ 
            return value.id !== post.id;
        });

        const filterFiltered = filtered.filter(function(value, index, arr){ 
            return value.id !== post.id;
        });

        dispatch(
          deletePost({
            posts: filterDelete,
            filteredPosts: filterFiltered
          })
        );
      } else {
        console.log(resp.data.message);
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(`Error : ${e.message}`);
      }
    }
  };
};
