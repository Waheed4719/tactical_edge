import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "../components/ReactSwagger";

export default async function IndexPage() {
  const spec = await getApiDocs();

  if (!spec) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
