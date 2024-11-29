import "./styles/global.css";
import { UserProfile } from "./contexts/UserContext";
import { MobileDeviceContainer } from "./components/MobileDeviceContainer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <UserProfile>
      <MobileDeviceContainer>
        <AppRoutes />
      </MobileDeviceContainer>
    </UserProfile>
  );
}

export default App;
