import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPost = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | `failed'
  error: null,
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body:content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              tea: 0,
            },
          },
        };
      },
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            tea: 0,
          };
          return post;
        });
        //add any fetched posts to the array
        state.posts = loadedPosts;

      })
      .addCase(fetchPost.rejected, (state, action)=>{
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getpostError = (state) => state.posts.error;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
