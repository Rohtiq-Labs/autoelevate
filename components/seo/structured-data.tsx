import { getStructuredDataGraph } from "@/lib/structured-data";

export const StructuredData = (): React.ReactElement => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(getStructuredDataGraph()),
    }}
  />
);
