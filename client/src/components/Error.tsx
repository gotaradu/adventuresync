import React, { useEffect, useState } from "react";

const Error: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessageParam = urlParams.get("errorMessage");
    if (errorMessageParam) {
      setErrorMessage(errorMessageParam);
    }
  }, []);

  return (
    <div>
      {errorMessage && <h1>Error Page</h1>}
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;
