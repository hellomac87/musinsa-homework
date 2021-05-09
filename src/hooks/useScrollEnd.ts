import { useState, useEffect } from "react";
import _ from "lodash";

interface Props {
  thradholds?: number;
}

const useScrollEnd = ({ thradholds = 300 }: Props) => {
  const [state, setState] = useState(false);
  const onScroll = ({}) => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight ===
      document.documentElement.scrollHeight
    ) {
      setState(true);
    } else {
      setState(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", _.throttle(onScroll, thradholds));
    // 스크롤 이벤트는 꼭 삭제해줍니다!
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
};

export default useScrollEnd;
