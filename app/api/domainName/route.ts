import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export function GET(request: Request) {
  const domainName = process.env.GCS_DOMAIN_NAME;
  return Response.json(domainName);
}
