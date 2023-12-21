'use client'
import {
  signOut
} from 'next-auth/react'
import {
  Button,
} from '@/components/ui/button'

const Welcome = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a dashboard
          </p>
        </div>
        <div>
          <Button
            type="button"
            onClick={() => signOut()}
          >Sign out</Button>
        </div>
      </div>
    </div>
  )
}

export default Welcome