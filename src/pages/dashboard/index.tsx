import React, { FC, useState, useEffect } from "react";
import Overview from "./overview";
import SalePercent from "./salePercent";
import TimeLine from "./timeLine";
import "./index.less";

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
};

export default DashBoardPage;
