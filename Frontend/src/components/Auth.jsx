import { useState, useContext } from "react";
//import { supabase } from "../supabaseClient";
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
import SessionContext from "../context/session";
import { useNavigate, NavLink } from "react-router-dom";

export default function Auth() {
  const { signUp } = useContext(SessionContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    await signUp({ email, password });

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/InvoiceGenerator/dashboard");
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <form onSubmit={handleLogin}>
        <Card className="w-[500px]">
          <CardHeader className="gap-2">
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
                  placeholder="Email address"
                  className="h-11"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Password</Label>

                <Input
                  type="password"
                  className="h-11"
                  id="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 mb-0 ">
              <p className="text-sm font-normal">Already on QuickSlip?</p>
              <NavLink to= '/InvoiceGenerator/login'>
              <Button className="p-0 m-0 font-normal" variant="link">
                <span>Login</span>
              </Button>
              </NavLink>
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button
              className="w-full justify-between h-10"
              variant="default"
              disabled={loading}
            >
              {loading ? <span>Loading</span> : <span>Sign Up</span>}
              <IoMdReturnLeft size={12} />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
