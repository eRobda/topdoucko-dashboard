import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthenticationService } from '@/services/AuthenticationService'

export default function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const decoded = token ? AuthenticationService.verifyToken(token) : null

  if (decoded) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }

  return null
}
