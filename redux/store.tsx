import { configureStore } from '@reduxjs/toolkit'
import cartVaccinesSlice from '~/components/cartVaccines/cartVaccinesSlice'

export const store = configureStore({
  reducer: {
    cartVaccines: cartVaccinesSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
