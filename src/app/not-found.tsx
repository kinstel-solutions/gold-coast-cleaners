import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Gem } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] text-center py-16">
        <Gem className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        It seems the page you're looking for has been misplaced. Our agents are on the case, but in the meantime, let's get you back to safety.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  )
}
