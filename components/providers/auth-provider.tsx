'use client'

import { UserInfoType } from '@/features/api/types/entities'
import { getUsername } from '@/features/auth/utils'
import { createContext, memo, useContext, useState, type PropsWithChildren } from 'react'
import { createStore, useStore, type StoreApi } from 'zustand'

type AuthProvider = {
  user: UserInfoType | undefined | null
  updateUser: (user: UserInfoType) => void
}

const AuthContext = createContext<StoreApi<AuthProvider> | undefined>(undefined)
export const AuthProvider = memo(function UserProvider({
  children,
  user,
}: PropsWithChildren<{ user: UserInfoType | undefined | null }>) {
  const [store] = useState(() =>
    createStore<AuthProvider>((set) => ({
      user: user,
      updateUser: (user) => {
        set({ user })

        return user
      },
    }))
  )

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
})

export function useAuth<T>(selector: (state: AuthProvider) => T) {
  const context = useContext(AuthContext)
  if (!context) throw new Error(`AuthContext.Provider is missing!`)
  return useStore(context, selector)
}

export function useUser() {
  return useAuth((state) => state.user)
}

export function useUpdateUser() {
  return useAuth((state) => state.updateUser)
}

export function useUserName(characters?: number) {
  const user = useAuth((state) => state.user)

  return getUsername(user, characters)
}
