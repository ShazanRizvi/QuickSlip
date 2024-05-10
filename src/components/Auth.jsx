import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

import { IoMdReturnLeft } from "react-icons/io";
import { PiInvoice } from "react-icons/pi";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
    
  };

  return (
    <div className="flex h-screen justify-center items-center">
    <form onSubmit={handleLogin}>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="flex gap-1">
          <PiInvoice />
          QuickSlip</CardTitle>
          <CardDescription>Experience the fastest invoice generation!</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid w-full items-center gap-4">
           
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email}  placeholder="Email address" required  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
          </div>
        </CardContent>
        <CardFooter className="flex w-full">
          
          <Button size="lg" variant="default" disabled={loading}>
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
            <IoMdReturnLeft className="w-3 h-5 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </form>
  </div>
  );
}
