import { confirmCallback } from "@/tools/generate-form-tool";

export const maxDuration = 30;

export async function POST(req: Request) {
  const formData = await req.json();
  confirmCallback(formData);
  return { ok: true };
}
