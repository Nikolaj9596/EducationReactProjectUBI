import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PROFILE_LOCLA_STORAGE_KEY } from '../../../../shared/const/LocalStorage'
import { Profile, ProfileScheme } from '../types/profile'

const initialState: ProfileScheme = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload
    },
  }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice 
