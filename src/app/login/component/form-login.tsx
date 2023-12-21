'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { signIn } from "next-auth/react";

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string(),
})

const FormLogin = () => {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLogin = async (data: any) => {
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      setLoading(false);

      if (!res?.ok) {
        setMessage("Email or password is invalid")
        return
      }

      push("/dashboard")
    } catch(error: any) {
      setLoading(false)
      setMessage(error.message)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          Login
        </CardTitle>
        <CardDescription>
          Kindly fill in this form to register
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <div className="grid gap-3 mb-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem
                    className="grid gap-1"
                  >
                    <FormLabel>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="w-full mb-4"
              disabled={loading}
            >
              {loading? "Loading" : "Login"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type='button'
              onClick={() => push("/register")}
            >
              Register
            </Button>
          </form>
        </Form>
        {message && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {message}
              </AlertDescription>
            </Alert>
          )
        }
      </CardContent>
      
    </Card>
  )
}

export default FormLogin