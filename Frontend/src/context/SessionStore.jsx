import React,{useState, useEffect} from "react";
import { supabase } from "../supabaseClient";
import SessionContext from "./session";

const SessionStore = ({children})=>{
     const [session, setSession] = useState(null);

     useEffect(() => {
       supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
       });
       supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session);
       });
       
     }, []);
     return (
          <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
     )
}

export default SessionStore;