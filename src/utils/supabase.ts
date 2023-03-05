import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

interface UploadUrlRequestBody {
  fileType: string;
  fileName: string;
}

interface UploadUrlResponseBody {
  url: string;
  fields: Record<string, string>;
}

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_API_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadUrlResponseBody | { error: string }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { fileType, fileName } = req.body as UploadUrlRequestBody;

  await supabase.storage.from("uploads").
  const {
    data: { url, fields },
    error,
  } = await supabase.storage
    .from("uploads")
    .createSignedUrl(`images/${fileName}`, 600, {
      
      contentType: fileType,
    });

  if (error) {
    console.error("Error creating signed URL: ", error.message);
    res.status(500).json({ error: "Error creating signed URL" });
    return;
  }

  res.status(200).json({ url, fields });
}
