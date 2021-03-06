import React, { ReactElement, useState } from "react";
import { PropsDoc } from "../PropsDoc";
import Container from "../Container";
import { Button } from "../../../src/Button";
import { Collapse } from "../../../src/Collapse";
import doc from "!!@advclb/react-docgen-loader!../../../src/Collapse";

export function CollapsePage(): ReactElement {
  const [open, toggle] = useState(false);
  return (
    <Container>
      <h1>Collapse</h1>
      <h2>Showcase</h2>
      <h3>Basic</h3>
      <p>
        <Button onClick={(): void => toggle(!open)}>Toggle</Button>
      </p>
      <Collapse open={open}>
        <div style={{ background: "#ff8888", width: 400, height: 400 }}></div>
      </Collapse>

      <hr></hr>

      <PropsDoc props={doc.props} />
    </Container>
  );
}

CollapsePage.meta = {
  path: "/collapse",
  name: "Collapse",
  group: "utilities",
};
