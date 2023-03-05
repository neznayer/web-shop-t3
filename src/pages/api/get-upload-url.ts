import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";
import { type NextApiRequest, type NextApiResponse } from "next";

const storage = new Storage({
  projectId: "my-project-id",
  keyFilename: "./pro-shop-9e475-firebase-adminsdk-obrvh-62201e2721.json",
});

const bucket = storage.bucket(process.env.GCP_BUCKET as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filename = randomUUID();

  const file = bucket.file(filename);

  try {
    const [url] = await file.getSignedUrl({
      action: "write",
      expires: Date.now() + 1 * 60 * 1000, // 1 minute
    });
    return res.status(200).json({ url });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
