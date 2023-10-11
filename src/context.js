import React, { useContext, useEffect, useState } from "react"
const API_URL='http://www.omdbapi.com/?apikey=78234ebc'
// context(warehouse)
// Provider(Delivery boy)
// consumer/(useContext(you))
const AppContext = React.createContext();
const AppProvider=({children})=>{
    const [isLoading,setIsLoading]=useState(true);
    const[movie,setMovie]=useState([]);
    const[isError,setIsError]=useState({show:"false",msg:""});
    const[query,setQuery]=useState("titanic");
    const getMovies=async(url)=>{
        try{
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            if(data.Response==="True"){
                setIsLoading(false);
              setMovie(data.Search) ; 
            }
            else{
setIsError({
    show:true,
    msg:data.Error,
})
            }
        }
        catch(error){
            console.log(error);
        }

    }
    useEffect(()=>{
        let timerout=setTimeout(()=>{
        getMovies(`${API_URL}&s=${query}`);},300);
        return()=>clearTimeout(timerout);
    },
    [query]);
    return <AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>
        {children}
    </AppContext.Provider>

};
//global custom hooks
const useGlobalContext=()=>{
    return useContext(AppContext);
}
export {AppContext,AppProvider,useGlobalContext};
