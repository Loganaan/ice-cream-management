// File: /pages/api/icecreams/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "DELETE":
      console.log(`Deleting ice cream with ID: ${id}`);
      // Process and delete the item from your database here...
      res.status(200).json({ message: "Ice cream deleted successfully." });
      break;

    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
