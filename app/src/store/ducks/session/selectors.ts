import { createSelector } from '@reduxjs/toolkit'
import { Actor, PermissionScope } from 'domain/entity/actor'
import { ProfileType } from 'domain/models/user'
import { State } from '..'

export const getRoot = (state: State) => {
  return state.session
}

export const getCurrentUser = createSelector([getRoot], state => {
  return state.currentUser
})

export const getCurrentActorProfile = createSelector([getRoot], state => {
  return state.currentUser?.profile.nome
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
  (currentUser, is) => (requiredPermissions: PermissionScope[]) => {
    if (!currentUser) return false

    const hasRequiredPermissions =
      requiredPermissions.length > 0
        ? Actor.includesInProfiles(currentUser, requiredPermissions)
        : true

    return is('admin') || hasRequiredPermissions
  }
)
