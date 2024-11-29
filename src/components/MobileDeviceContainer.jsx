import iphone from "../assets/images/iphone6.png";
import { Screen } from "./Screen";

export const MobileDeviceContainer = ({ children }) => {
  return (
    <div
      style={{ backgroundImage: `url("${iphone}")` }}
      className="mobile-device-container"
    >
      <Screen>{children}</Screen>
    </div>
  );
};
