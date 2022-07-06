// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apolloServer } from "../../server/graphql";
import Cors from "micro-cors";

type Data = {
  name: string;
  startedAt: string;
  currentTime: string;
};

const cors = Cors();

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  await startServer;
  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
