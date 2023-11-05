import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const res = await fetch(`${process.env.BASE_URL}`);
    const data = await res.json();
    return response.status(200).json({ data });
}