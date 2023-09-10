"use client";

import { Path } from "@/enums/path_enums";
import type { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, signIn } from "next-auth/react"
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SignIn() {
  const [signinDetails, setSigninDetails] = useState({
    email: '',
    password: ''
  })

  const handleInputchange = (event: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = event.target as HTMLInputElement;

    setSigninDetails({...signinDetails, [name]: value});
  }

  const signInUser = async (event: any) => {
    event.preventDefault();
    await signIn('credentials', {
      email: signinDetails.email,
      password: signinDetails.password,
      redirect: true,
      callbackUrl: '/'
    })
  }

  return (
    <form onSubmit={signInUser}>
      <label>
        Email
        <input name="email" type="text" value={signinDetails.email} onChange={handleInputchange}/>
      </label>
      <label>
        Password
        <input name="password" type="password" value={signinDetails.password} onChange={handleInputchange} />
      </label>
      <button type="submit">Sign in</button>
      <Link href={Path.SIGNUP}>Not a member yet? Sign up</Link>
    </form>
  )
}
