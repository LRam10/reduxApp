import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id` e.f if post id was in format of postID
  //selectId: (book) => book.bookId,
  sortComparer:(a,b) => b.date.localeCompare(a.date),
})
export const fetchPost = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.put(`${POST_URL}/${id}`, initialPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POST_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response.statusText}`;
  }
);
const initialState =postsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | `failed'
  error: null,
}); 
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
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
        postsAdapter.upsertMany(state,loadedPosts);
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          tea: 0,
        };
        console.log(action.payload);
        postsAdapter.addOne(state,action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete Could not be Deleted");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state,id);
      });
  },
});


export const {
  selectAll:SelectAllPost,
  selectById:selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);

export const getPostStatus = (state) => state.posts.status;
export const getpostError = (state) => state.posts.error;

// Memomaize Selector
// export const selectPostByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (post, userId) => posts.filter((post) => post.userId === userId)
// );
export const { reactionAdded } = postSlice.actions;
export default postSlice.reducer;
