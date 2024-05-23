import { useState } from "react";
import "../styles/colorPicker.css"; // File CSS để style
import { useDispatch } from "react-redux";
import { setColor } from "../reducers/colorSlice";

function ColorPicker() {
  const colorData = [
    { code: "#eeecee", name: "Alabaster White" },
    { code: "#ffd4ba", name: "Tender Peach" },
    { code: "#6683c2", name: "Persian Jewel" },
    { code: "#c68f64", name: "Light Fudge" },
    { code: "#342d46", name: "Eclipse" },
  ];
  const [selectedColor, setSelectedColor] = useState(colorData[0]);
  const dispatch = useDispatch();
  // console.log("selectedColor: ", selectedColor);

  const handleColorClick = (color: any) => {
    setSelectedColor(color);
    dispatch(setColor(color));
  };

  return (
    <div className="color-picker">
      {colorData.map((color) => (
        <div
          key={color.code}
          className={`color-circle ${
            selectedColor.code === color.code ? "active" : ""
          }`}
          style={{ backgroundColor: color.code }}
          onClick={() => handleColorClick(color)}
        ></div>
      ))}
    </div>
  );
}

export default ColorPicker;
