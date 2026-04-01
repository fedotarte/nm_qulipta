import { readFile } from "node:fs/promises";

export const runtime = "nodejs";

const assetMap: Record<string, string> = {
  "episodic-migraine-full":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/_____________________-7b1d174e-0caa-4da0-ad0d-60d247939107.png",
  "episodic-migraine-2-1-1":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/2__1__1-85cb7f91-154c-4ca4-8b22-fd8f57b05147.png",
  "episodic-migraine-3-2-1":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/3__2__1-20e6ae40-b94e-4b9d-8fe9-c0f0135d9ca3.png",
  "episodic-migraine-group":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/Group-3490ca08-ffea-45b1-9f88-1ab723831eb2.png",
  "episodic-migraine-frame-194":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/Frame_194-48e05da5-8da7-4dd4-8be4-19bc3a27539b.png",
  "episodic-migraine-frame-163":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/Frame_163-56ffb7ce-bca6-4c46-a7ac-6131955a9496.png",
  "episodic-migraine-group-4":
    "/Users/olegvolohov/.cursor/projects/Users-olegvolohov-WebstormProjects-nm-qulipta/assets/Group_4-49d8402e-4777-489d-93ac-39888c9b8999.png",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ asset: string }> },
) {
  const { asset } = await context.params;
  const assetPath = assetMap[asset];

  if (!assetPath) {
    return new Response("Asset not found", { status: 404 });
  }

  try {
    const file = await readFile(assetPath);

    return new Response(file, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Asset not found", { status: 404 });
  }
}
