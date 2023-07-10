import ReactDOM from "react-dom";

// HOC
const GuidePortal = (Component: React.FC) => () => {
  if (typeof document === "undefined") return null; // 서버 측에서는 null 반환

  return ReactDOM.createPortal(
    <Component />,
    document.getElementById("guide") as HTMLElement
  );
};

export default GuidePortal;
