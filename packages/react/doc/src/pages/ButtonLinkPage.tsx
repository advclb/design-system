import React, { ReactElement } from "react";
import { PropsDoc } from "../components/PropsDoc";
import { ButtonLink } from "../../../src/ButtonLink";
import doc from "!!@advclb/react-docgen-loader!../../../src/ButtonLink";

export function ButtonLinkPage(): ReactElement {
  return (
    <div>
      <h2>Showcase</h2>
      <h3>Variants</h3>
      <p>
        <ButtonLink variant="filled" to="#">
          Filled
        </ButtonLink>
        &nbsp;
        <ButtonLink variant="outline" to="#">
          Outline
        </ButtonLink>
        &nbsp;
        <ButtonLink variant="flat" to="#">
          Flat
        </ButtonLink>
      </p>
      <PropsDoc props={doc.props} />
    </div>
  );
}

ButtonLinkPage.meta = {
  path: "/button-link",
  name: "ButtonLink",
};
