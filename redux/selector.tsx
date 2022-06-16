// import { createSelector } from '@reduxjs/toolkit';

import type { CartVaccinesState } from '~/components/cartVaccines/cartVaccinesSlice'

export const cartVaccinesSelector = (state: CartVaccinesState) => state.vaccines
