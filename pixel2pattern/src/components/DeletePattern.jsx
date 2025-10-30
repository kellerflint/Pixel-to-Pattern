"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const DeletePattern = ({ id }) => {

    // API base URL fronm environment variables
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    // handling deletion of pattern
    const handleDelete = async () => {

        // confirm action before deleting
        if (!confirm("Delete this pattern?")) return;

        try {
            // send DELETE request to backend
            const res = await fetch(`${API_URL}/patterns/${id}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error();

            alert("Pattern deleted!");

            // redirect to homepage after deletion
            router.push("/");
        } catch (err) {
            console.error("Error deleting pattern: ", err);
            alert("Error deleting pattern");
        }
    };

    return (
        <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Pattern
        </Button>
    );
};

export default DeletePattern;