"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { addUser } from '@/actions/user';
import { toast } from 'sonner';

const Signup = () => {

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        city: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("user Details: ", userDetails);
        const { name, email, password, phone, address, city } = userDetails;
        const phoneNumber = parseInt(phone);
        const added = await addUser({
          name,
          phone : phoneNumber,
          email,
          password,
          city,
          address,
        });
        if(added){
            signIn();
            toast.success("Siggned Up successfully");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Register Yourself</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                required
                                placeholder="John Rai"
                                value={userDetails.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                required
                                id="phone"
                                type="number"
                                placeholder="81XXXXXXXX"
                                value={userDetails.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                required
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={userDetails.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                required
                                type='password'
                                id="password"
                                placeholder="********"
                                value={userDetails.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                required
                                id="address"
                                placeholder="1234 Main St"
                                value={userDetails.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                required
                                id="city"
                                placeholder="New York"
                                value={userDetails.city}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full mt-4">
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default Signup
