import "./styles/Global.css";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import { DiaryProvider } from "./contexts/DiaryContext.jsx";
import EventProvider from "./contexts/EventContext.jsx";
import { MobileDeviceContainer } from "./components/MobileDeviceContainer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <LoginProvider>
      <EventProvider>
        <DiaryProvider>
          <MobileDeviceContainer>
            <AppRoutes />
          </MobileDeviceContainer>
        </DiaryProvider>
      </EventProvider>
    </LoginProvider>
  );
}

export default App;
