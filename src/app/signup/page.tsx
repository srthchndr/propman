"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const [newUserDetails, setNewUserDetails] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = event.target as HTMLInputElement;

        setNewUserDetails({...newUserDetails, [name]: value})
    }

    const signupUser = async (event: any) => {
        event.preventDefault();
        console.log(event, 'Inside signup');
        await fetch('http://localhost:3000/api/signup', {method: 'POST', body: JSON.stringify(newUserDetails)})
        .then((res) => {
            console.log(res, 'Successful sign in');
            
            router.push('/signin');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={signupUser}>
            <label htmlFor="fName" >First Name
                <input className="text-black" type="text" id="fName" name="firstName" value={newUserDetails.firstName} onChange={handleInputChange} />
            </label>
            <label htmlFor="lName">Last Name
                <input className="text-black" type="text" id="lName" name="lastName" value={newUserDetails.lastName} onChange={handleInputChange} />
            </label>
            <label htmlFor="email">Email
                <input className="text-black" type="text" id="email" name="email" value={newUserDetails.email} onChange={handleInputChange} />
            </label>
            <label htmlFor="password">Password
                <input className="text-black" type="password" id="password" name="password" value={newUserDetails.password} onChange={handleInputChange} />
            </label>
            <label htmlFor="confirmPassword">Confirm Password
                <input className="text-black" type="password" id="confirmPassword" name="confirmPassword" value={newUserDetails.confirmPassword} onChange={handleInputChange} />
            </label>
            <button type="submit">Signup</button>
        </form>
    );
}