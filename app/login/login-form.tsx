'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  useEffect(() => {
    const storedRemember = localStorage.getItem('rememberMe') === 'true'
    const storedEmail = localStorage.getItem('rememberEmail')
    if (storedRemember) {
      setValue('rememberMe', true)
    }
    if (storedRemember && storedEmail) {
      setValue('email', storedEmail)
    }
  }, [setValue])

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast({
        title: 'Authentication error',
        description: 'Please sign in again.',
        variant: 'destructive',
      })
    }
  }, [searchParams, toast])

  const onSubmit = async (values: FormValues) => {
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe ? 'true' : 'false',
      redirect: false,
    })

    if (response?.error) {
      toast({
        title: 'Login failed',
        description: response.error,
        variant: 'destructive',
      })
      return
    }

    if (values.rememberMe) {
      localStorage.setItem('rememberMe', 'true')
      localStorage.setItem('rememberEmail', values.email)
    } else {
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('rememberEmail')
    }

    toast({
      title: 'Welcome back!',
      description: 'Redirecting you to the homepage...',
    })

    router.replace('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">Email</label>
        <Input
          type="email"
          placeholder="your@email.com"
          className="bg-input text-foreground placeholder:text-muted-foreground"
          {...register('email')}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground block mb-2">Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          className="bg-input text-foreground placeholder:text-muted-foreground"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 rounded border-border cursor-pointer"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="text-sm text-muted-foreground">
            Remember me
          </label>
        </div>
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-lg h-10"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Login'}
      </Button>
    </form>
  )
}

