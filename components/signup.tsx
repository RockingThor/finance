"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import bcrypt from "bcrypt";
import qs from "qs";

const loginSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(8),
});

const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    preferredUsername: z.optional(z.string().min(4)),
});

export function Signup() {
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [preferredUsername, setPreferredUsername] = useState("");

    const onLoginSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    };

    const onSignupSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = {
            name,
            email,
            hashedPassword,
            username: preferredUsername,
        };
        const response = await axios.post("/api/signup", {
            headers: user,
        });
    };

    useEffect(() => {
        const tryToFetchSignedInUser = async () => {
            try {
                const response = await axios.get("/api/login/authenticate", {
                    withCredentials: true,
                });
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        tryToFetchSignedInUser();
    }, []);

    return (
        <Tabs
            defaultValue="login"
            className="w-[400px] transition"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="login"
                    onClick={() => setIsLoginActive(true)}
                >
                    Login
                </TabsTrigger>
                <TabsTrigger
                    value="signup"
                    onClick={() => setIsLoginActive(false)}
                >
                    Signup
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-center">
                            Welcome Back To Comparify
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Username/Email</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Password</Label>
                            <Input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Login</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome...!!</CardTitle>
                        <CardDescription>
                            Lets get started by signing you up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Name</Label>
                            <Input
                                id="current"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="current">Email</Label>
                            <Input
                                id="current"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="current">Username</Label>
                            <Input
                                id="current"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="current">Set Password</Label>
                            <Input
                                id="current"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => onSignupSubmit}>
                            Save password
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
