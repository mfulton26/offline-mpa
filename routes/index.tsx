import React, { useEffect, useState } from "react";

import Page from "../components/Page.tsx";

export default function HomePage() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setCount((prevCount) => prevCount + 1),
      1000,
    );
    return () => clearInterval(intervalId);
  }, []);
  return (
    <Page title="Home" hydrationPathname="/index.js">
      <p>This is the homepage.</p>
      <p>
        <label>
          Count: <output>{count}</output>
        </label>
      </p>
    </Page>
  );
}
