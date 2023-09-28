"use client";

import { Path } from "@/enums/path_enums";
import type { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, signIn } from "next-auth/react"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { Card, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, PersonIcon, ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(50),
})


export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const signInUser = async (credentials: z.infer<typeof formSchema>) => {
    setLoading(true);
    await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: true,
      callbackUrl: '/'
    })
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="p-4 w-[350px] h-fit">
        <CardHeader className="text-2xl mx-auto w-fit">Signin</CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signInUser)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Email</FormLabel>
                    <FormControl>
                        <Input placeholder="steven.turn@company.com" {...field} />
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
                    <FormLabel className="text-muted-foreground">Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            />
            <Button variant={"link"} className="pl-0">
              <Link href={Path.SIGNUP} className="flex items-center gap-1">
                Not a member yet? Sign up 
                <ArrowRightIcon  className="mr-2 h-4 w-4" /> 
              </Link>
            </Button>
            <div className="w-full text-right">
              {!loading 
                ? 
                  <Button type="submit">
                    <PersonIcon className="mr-2 h-4 w-4" />
                    Signin
                  </Button> 
                : 
                  <Button disabled type="submit">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Signing in
                  </Button>
              }
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
