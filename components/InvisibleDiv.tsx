import { useState } from "react";
import { m } from "framer-motion";
import { SetInvisibleDivs } from "@utils/types";

const InvisibleDiv = ({
  invisibleDivs,
  setInvisibleDivs,
}: {
  invisibleDivs: string[];
  setInvisibleDivs: SetInvisibleDivs;
}) => {
  const [entered, setEntered] = useState(false);

  return (
    <m.div
      layout
      onViewportEnter={() => {
        entered && setInvisibleDivs(invisibleDivs.slice(0, -1));
        setEntered(true);
      }}
      onViewportLeave={() => {
        entered && setInvisibleDivs(invisibleDivs.slice(0, -1));
        setEntered(true);
      }}
      className="h-20"
    ></m.div>
  );
};

export default InvisibleDiv;
