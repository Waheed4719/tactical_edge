import { getAPISpec } from "@/lib/swagger";
import ReactSwagger from "../components/ReactSwagger";

export default function IndexPage() {
  const spec = getAPISpec();

  if (!spec) {
    return <div>Loading...</div>;
  }

  return <ReactSwagger spec={spec} />;
}
