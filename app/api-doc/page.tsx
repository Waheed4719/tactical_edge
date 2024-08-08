import { getAPISpec } from "@/lib/swagger";
import ReactSwagger from "./ReactSwagger";

export default async function IndexPage() {
  const spec = await getAPISpec();

  return <ReactSwagger spec={spec} />;
}
