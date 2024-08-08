'use client'
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  spec: Record<string, any>;
};

const ReactSwagger = ({ spec }: Props) => {
  return <SwaggerUI spec={spec} />;
};

export default ReactSwagger;