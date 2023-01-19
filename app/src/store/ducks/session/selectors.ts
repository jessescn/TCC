import { createSelector } from '@reduxjs/toolkit'
import { Actor } from 'domain/entity/actor'
import { ProfileType } from 'domain/models/user'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.session
}

export const getCurrentUser = createSelector([getRoot], state => {
  return state.currentUser
})

export const getAuthStatus = createSelector([getRoot], state => {
  return state.loginStatus
})

export const getOpenProcedimentos = createSelector([getRoot], state => {
  return state.openProcedimentos
})

export const is = createSelector(
  [getCurrentUser],
  currentUser => (profile: ProfileType) => {
    return currentUser?.profile.nome === profile
  }
)

export const hasRoutePermission = createSelector(
  [getCurrentUser, is],
  (currentUser, is) => (requiredProfiles: ProfileType[]) => {
    if (!currentUser) return false

    const hasRequiredProfiles =
      requiredProfiles.length > 0
        ? Actor.includesInProfiles(currentUser, requiredProfiles)
        : true

    return is('admin') || hasRequiredProfiles
  }
)
