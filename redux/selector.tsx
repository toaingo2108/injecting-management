// import { createSelector } from '@reduxjs/toolkit';

import type { CounterState } from '~/components/counter/counterSlice'

export const counterSelector = (state: CounterState) => state.value
