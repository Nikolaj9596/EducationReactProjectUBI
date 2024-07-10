import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
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
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },

    cancelEditProfile: (state) => {
      state.readonly = true
      state.form = state.data
    },

    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.data,
        ...action.payload
      }
    }

  },
  extraReducers: (builder) => {
    // INFO: fetchProfile
    builder.addCase(fetchProfileData.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(
      fetchProfileData.fulfilled,
      (
        state,
        action: PayloadAction<Profile>
      ) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload

      }
    )
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    // INFO: updateProfile
    builder.addCase(updateProfileData.pending, (state) => {
      state.error = undefined
      state.isLoading = true
    })
    builder.addCase(
      updateProfileData.fulfilled,
      (
        state,
        action: PayloadAction<Profile>
      ) => {
        state.isLoading = false
        state.data = action.payload
        state.form = action.payload
        state.readonly = true
      }
    )
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice 
