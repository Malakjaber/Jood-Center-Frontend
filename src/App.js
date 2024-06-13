import { PrimeReactProvider } from "primereact/api";
import Footer from "./components/global/Footer";
import { AuthProvider } from "./components/contexts/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <div className="scroll-smooth flex flex-col justify-between min-h-[100vh]">
          <Routes />
          <Footer />
        </div>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
