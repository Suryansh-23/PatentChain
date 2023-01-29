import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";
import detectEthereumProvider from "@metamask/detect-provider";
import Install from "./components/Install";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

const provider = await detectEthereumProvider();
console.log(provider);

const App = () => {
    return (
        <>
            {window.ethereum != null ? (
                <div className="flex flex-column gap-3">
                    <NavBar />
                    <Home />
                    <Dashboard />
                </div>
            ) : (
                // {/* <Route path="users/*" element={<Users />} /> */}
                <Install />
            )}
        </>
    );
};

export default App;

