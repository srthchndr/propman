"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardHeader } from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/ui/mode-toggle";
 
const formSchema = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(3).max(50),
    confirmPassword: z.string().min(3).max(50),
})

export default function SignUp() {
    const router = useRouter();
    let [loading, setLoading] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      })

    const signupUser = async (details: z.infer<typeof formSchema>) => {
        setLoading(true);
        await fetch('http://localhost:3000/api/signup', {method: 'POST', body: JSON.stringify(details)})
        .then((res) => {
            console.log(res, 'Successful sign in');
            router.push('/signin');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="p-4">
            <div className="absolute right-4">
                <ModeToggle></ModeToggle>
            </div>
            <div className="h-screen w-full flex justify-center items-center">
                <Card className="p-4 w-[350px] h-fit">
                    <CardHeader className="text-2xl mx-auto w-fit">Signup</CardHeader>
                    <Form {...form}>
                        <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(signupUser)}>
                            <div className="flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-muted-foreground">First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="steven" autoFocus {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-muted-foreground">Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="turn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="text-muted-foreground">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This should match with your password
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!loading 
                            ? 
                                <Button type="submit">Signup</Button> 
                            : 
                                <Button disabled type="submit">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Saving details
                                </Button>}
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
