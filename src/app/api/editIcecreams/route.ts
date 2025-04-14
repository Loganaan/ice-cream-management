// File: /pages/api/icecreams/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PATCH":
      // Simulate editing ice cream details
      const updatedData = req.body; // Receive updated fields from the client
      console.log(`Updating ice cream with ID: ${id}`, updatedData);
      // Process and save changes to your database here...
      res.status(200).json({ message: "Ice cream updated successfully." });
      break;

    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
