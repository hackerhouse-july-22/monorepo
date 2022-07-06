// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getContext} from "../../server/context"

type Data = {
  name: string
  startedAt: string
  currentTime: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe', startedAt: getContext().startupTime, currentTime: new Date().getTime().toString()})
}
