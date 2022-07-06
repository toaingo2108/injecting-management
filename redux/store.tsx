import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '~/components/cart/cartSlice'
import modalSlice from '~/components/modal/modalSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    modal: modalSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
