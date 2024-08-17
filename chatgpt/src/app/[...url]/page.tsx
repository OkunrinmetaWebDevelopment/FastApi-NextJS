import { ChatWrapper } from "@/component/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { Component } from "react";

interface PageProps{
    params:{
       url: string| string[] | undefined
    }
}


function reconstructUrl({url}:{url:string[]}) {
    const decodedComponents=url.map((component)=> decodeURIComponent(component))

    return decodedComponents.join("/")
}

const Page = async ({params}:PageProps) =>{
    console.log(params);

    const reconstructedUrl= reconstructUrl({url: params.url as string[]})

    const isAlreadyIndexed= await redis.sismember("indexed-urls",reconstructedUrl)

    console.log("isAlreadyIndexed",isAlreadyIndexed)

    const sessioniD="mock-session"

    if (!isAlreadyIndexed) {

        await ragChat.context.add({
            type:"html",
            source: reconstructedUrl,
            config:{ chunkOverlap:50,chunkSize:200},
        })

        await redis.sadd("indexed-urls",reconstructedUrl)
        
    }
    
    


    return <ChatWrapper sessioniD={sessioniD}></ChatWrapper>
}

export default Page