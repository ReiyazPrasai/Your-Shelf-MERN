import React, { useState, useEffect } from "react";
import { isEmpty } from "../../utils/commonUtils";
import { Card } from "../Common/Elements";

const View = (props) => {
  const [description, setDescription] = useState({});
  const [finance, setFinance] = useState({});

  useEffect(() => {
    if (!isEmpty(props.product)) {
      setDescription(props.product.description);
      setFinance(props.product.finance);
    }
  }, [props.product]);

  return <Card>{description.name}</Card>;
};

export default View;
