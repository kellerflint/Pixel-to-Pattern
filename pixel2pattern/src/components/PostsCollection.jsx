"use client";
import { useEffect, useState } from "react";
import PixelPost from "./PixelPost.jsx";
import Link from "next/link.js";
export default function PostsCollection() {

    const [ pixelPosts, setPixelPosts] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${API_URL}/patterns`);
                if (!res.ok) throw new Error("failed to fetch posts");
                const posts = await res.json();
                setPixelPosts(posts);
            } catch (error) {
                console.error('failed to fetch posts ', error);
            } 
        }
        fetchPosts();

    }, []);

    return(
        <>
        {pixelPosts.map((post, index) => (
            <Link href={`/view/${post.pattern_ID}`} key={index} ><PixelPost post={post} /></Link>
        ))}
        
        </>
    )
}