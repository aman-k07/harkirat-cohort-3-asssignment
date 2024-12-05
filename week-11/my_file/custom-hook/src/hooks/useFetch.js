import {useState, useEffect} from "react";

//THIS IS CUTOM HOOK
function usePostTitlle(){
    const [post, setPost]=useState({});

    async function getPosts(){

        //send backend req to specific data
        const response= await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const json=await response.json();
        setPost(json);

       
    }

    useEffect(()=>{
        getPosts();
    },[])

    return post.title;

}

export function useFetch(url){
    const [finalData,setFinalData]=useState({});
    console.log(url);

    const [loading ,setLoading]=useState(true);



    async function getDetails(){
        //befor req goes to backend
        setLoading(true);

        //send backend req to generic data
        const response=await fetch(url);
        const json=await response.json();
        setFinalData(json);
        //after req goes to backend
        setLoading(false);

    }

    //anytime url changes fetch the data from the backend
    useEffect(()=>{
        getDetails();
    },[url])


    return {
        finalData,
        loading
    }
}


export default usePostTitlle;