import "../styles/sizePicker.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSize } from "../reducers/sizeSlice";

function SizePicker() {
  const sizeData = ["S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState(sizeData[0]);
  const dispatch = useDispatch();

  const handleSizeClick = (size: any) => {
    setSelectedSize(size);
    dispatch(setSize(size));
  };

  return (
    <div className="size-picker">
      {sizeData.map((size) => (
        <div
          key={size}
          className={`size-button ${selectedSize === size ? "active" : ""}`}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
}

export default SizePicker;
