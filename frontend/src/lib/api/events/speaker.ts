import { Speaker } from "../../types";
import { fetchJsonWithAuth } from "../fetch";

export async function fetchSpeakerById(id: number) {
    const url = `${process.env.APT_ORIGIN}/speaker/${id}/`
    
    return await fetchJsonWithAuth<Speaker>(url)
}