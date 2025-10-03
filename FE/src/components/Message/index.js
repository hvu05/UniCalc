import { useState, useEffect } from "react";
import "./Cmes.scss";

let showMessageFn;

function Cmes() {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success");

  useEffect(() => {
    // gán hàm showMessage để gọi ngoài
    showMessageFn = (msg, msgType = "success") => {
      setMessage(msg);
      setType(msgType);

      // tự động ẩn sau 3s
      setTimeout(() => setMessage(null), 3000);
    };
  }, []);

  if (!message) return null;

  return (
    <div className={`cmes cmes-${type}`}>
      {message}
    </div>
  );
}

export function showMessage(msg, type = "success") {
  if (showMessageFn) {
    showMessageFn(msg, type);
  }
}

export default Cmes;
