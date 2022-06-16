import React, { FC } from "react";
import "driver.js/dist/driver.min.css";
import { Button } from "antd";
import useGuide from "./useGuide";

const GuidePage: FC = () => {
  const { driverStart } = useGuide();

  return (
    <div className="guide-page ">
      <div className="innerText">
        <p className="guide-intro">
          app.guide.guideIntro
          <a
            className="driverjs-link"
            href="https://github.com/kamranahmedse/driver.js"
            rel="noopener noreferrer"
            target="_blank"
          >
            driver.js
          </a>
          .
        </p>
        <Button type="primary" onClick={driverStart}>
          pp.guide.showGuide
        </Button>
      </div>
    </div>
  );
};

export default GuidePage;
