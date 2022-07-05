// import { createSelector } from '@reduxjs/toolkit';

import type { CartState } from '~/components/cart/cartSlice'

export const cartVaccinesSelector = (state: CartState) => state.vaccines
