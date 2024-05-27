import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import SessionContext from "../context/session";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";

export default function Account() {
  const session = useContext(SessionContext);
  console.log("Account session", session);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
        console.log("user Profile from profiles",data)

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };
    console.log("updates", updates)

    const { error } = await supabase.from("Users").upsert(updates);

    if (error) {
      toast.error(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <div className="m-8 flex justify-center  overflow-auto">
      <form onSubmit={updateProfile} className="form-widget h-auto w-1/4 dark:bg-[#1f2936] p-10 rounded-lg">
      <h1 className="dark:text-white mb-5 text-4xl font-bold">Your Profile</h1>
        <div className="mb-5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div className="mb-5">
          <Label htmlFor="username">Name</Label>
          <Input
            id="username"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
       <div className="flex gap-2">
        <div>
          <Button
            
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
        </div>

        <div>
          <Button variant='destructive' onClick={() => supabase.auth.signOut()}>Sign Out</Button>
        </div>
        </div>
      </form>
    </div>
  );
}
