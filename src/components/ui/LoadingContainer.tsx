interface LoadingProps {
  text?: string;
  size?: "small" | "medium" | "large";
  theme?: "light" | "dark";
  fullscren?: boolean;
}

const LoadingContainer = ({
  text = "Loading...",
  size = "medium",
  theme = "light",
  fullscren = false,
}: LoadingProps) => {
  return (
    <div
      className={`loading-container ${size} ${theme} ${
        fullscren ? "fullscren" : ""
      }`}
    >
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      {text && <p className="custom-loading-text">{text}</p>}
    </div>
  );
};

export default LoadingContainer