import { getAPISpec } from "@/lib/swagger";
import ReactSwagger from "../components/ReactSwagger";

export default function IndexPage() {
  const spec = getAPISpec();

  return <ReactSwagger spec={spec} />;
}
