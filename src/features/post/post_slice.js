import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id` e.f if post id was in format of postID
  //selectId: (book) => book.bookId,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.data)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions) {
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              tea: 0,
            };
          }
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    addNewPost: builder.mutation({
      query: (initalPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initalPost,
          userId: Number(initalPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            tea: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initalPost) => ({
        url: `/posts/${initalPost.id}`,
        method: "PUT",
        body: {
          ...initalPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: "PATCH",
        //in a real aoo, we'd probably need to based this on an ID
        body: { reactions },
      }),
      async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        //updatequerydata requires the endpoint and chache key arguments,
        //so it knows which piece of cache state to update
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.entities[postId];
            if (post) post.reactions = reactions;
          })
        )
        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
  
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation
} = extendedApiSlice;

//returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

//creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
); //normalized state object with uds & entities

export const {
  selectAll: SelectAllPost,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
