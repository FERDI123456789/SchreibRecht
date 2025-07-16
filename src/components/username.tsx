import { useStore } from '@nanostores/react'
import { $userStore } from '@clerk/astro/client'

export function Username() {
    const currentUser = useStore($userStore)
    const username = currentUser?.username
        ? currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)
        : ''

    return <span className="">{username}</span>
}
