import React from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title, content }) => {
  return (
    <Helmet>
      <title>3S-SOFT | {title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
};

export default PageTitle;
