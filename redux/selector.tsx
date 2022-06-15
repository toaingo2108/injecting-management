// import { createSelector } from '@reduxjs/toolkit';

import type { CartVaccinesState } from '~/components/cartVaccines/cartVaccinesSlice'
import type { CounterState } from '~/components/counter/counterSlice'

export const counterSelector = (state: CounterState) => state.value

export const cartVaccinesSelector = (state: CartVaccinesState) => state.vaccines
