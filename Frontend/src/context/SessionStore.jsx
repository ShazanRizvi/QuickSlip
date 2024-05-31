import React,{useState, useEffect} from "react";
//import { supabase } from "../supabaseClient";
import SessionContext from "./session";
import callAPI from "../http/axios";

const SessionStore = ({children})=>{
     const [accessToken, setAccessToken] = useState(null);
     const signUp = async (data)=>{
          //console.log("data",data)
          const response = await callAPI('POST','/auth/signup',data);
          localStorage.setItem('accessToken',response.token);
          
     }
     const login= async (data)=>{
          //console.log("data",data)
          const response = await callAPI('POST','/auth/signin',data);
          localStorage.setItem('accessToken',response.token);
          
          
     }

    //  useEffect(() => {
    //   console.log('SessionStore');
    //   //  supabase.auth.getSession().then(({ data: { session } }) => {
    //   //    setSession(session);
    //   //  });
    //   //  supabase.auth.onAuthStateChange((_event, session) => {
    //   //    setSession(session);
    //   //  });
       
    //  }, []);
     return (
          <SessionContext.Provider value={{signUp,login, accessToken}}>{children}</SessionContext.Provider>
     )
}

export default SessionStore;