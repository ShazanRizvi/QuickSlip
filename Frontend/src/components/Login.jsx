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
import { Spinner } from "./Spinner";

import { IoMdReturnLeft } from "react-icons/io";
import { PiInvoice } from "react-icons/pi";
import toast from "react-hot-toast";
import SessionContext from "../context/session";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const { login } = useContext(SessionContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });

    const accessToken = localStorage.getItem("accessToken");
    //console.log("accessToken", accessToken);
    setLoading(false);
    if (accessToken) {
      navigate("/InvoiceGenerator/dashboard");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center ">
      <form onSubmit={handleLogin}>
        <Card className="w-[500px]">
          <CardHeader className="gap-2">
            <CardTitle className="flex gap-1">
              {/* <PiInvoice size={40} /> */}
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
            <div className="flex items-center gap-1 mt-1 mb-0 ">
              <p className="text-sm font-normal">New to QuickSlip?</p>
              <NavLink to="/InvoiceGenerator/signup">
                <Button className="p-0 m-0 font-normal" variant="link">
                  <span>Create an Account</span>
                </Button>
              </NavLink>
            </div>
          </CardContent>
          <CardFooter className="flex w-full">
            <Button
              className="w-full h-10"
              variant="default"
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex w-full justify-between">
                  <div>Login</div>
                  <div className="flex items-center">
                    <IoMdReturnLeft size={14} />
                  </div>
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
