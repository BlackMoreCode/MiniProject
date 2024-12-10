import "./styles/Global.css";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import { DiaryProvider } from "./contexts/DiaryContext.jsx";
import { MobileDeviceContainer } from "./components/MobileDeviceContainer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <LoginProvider>
      <DiaryProvider>
        <MobileDeviceContainer>
          <AppRoutes />
        </MobileDeviceContainer>
      </DiaryProvider>
    </LoginProvider>
  );
}

export default App;
