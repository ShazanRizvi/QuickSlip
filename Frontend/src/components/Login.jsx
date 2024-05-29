import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { IoMdReturnLeft } from "react-icons/io";
import { PiInvoice } from "react-icons/pi";
import toast from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error(error.error_description || error.message);
    } else {
      toast.success("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <form onSubmit={handleLogin}>
        <Card className="w-[500px]">
          <CardHeader className='gap-2'>
            <CardTitle className="flex gap-1">
              <PiInvoice size={40} />
              QuickSlip
            </CardTitle>
            <CardDescription>
            Optimized Invoicing for Maximum Productivity
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  className="h-11"
                  placeholder="Email address"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Password</Label>

                <Input
                  type="password"
                  id="password"
                  className="h-11"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button
              className="w-full justify-between h-10"
              variant="default"
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Login</span>}
              <IoMdReturnLeft size={12} />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
