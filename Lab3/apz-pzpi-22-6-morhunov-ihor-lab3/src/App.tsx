import {BrowserRouter, Route, Routes} from 'react-router';
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import CarTypesPage from './pages/CarTypesPage.tsx';
import RulesPage from "./pages/RulesPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import CarsAdminPage from './pages/CarsAdminPage.tsx';
import CarSensorsPage from "./pages/CarSensorsPage.tsx";
import SensorsPage from "./pages/SensorsPage.tsx";
import MaintenancePage from "./pages/MaintenancePage.tsx";
import CarMaintenancePage from "./pages/CarMaintenancePage.tsx";
import CarIncidentsPage from "./pages/CarIncidentsPage.tsx";
import IncidentsPage from "./pages/IncidentsPage.tsx";
import PoliciesPage from "./pages/PoliciesPage.tsx";
import PoliciesAdminPage from "./pages/PoliciesAdminPage.tsx";
import MeasurementsPage from "./pages/MeasurementsPage.tsx";
import PaymentsPage from "./pages/PaymentsPage.tsx";
import PaymentsAdminPage from "./pages/PaymentsAdminPage.tsx";
import CarPage from './pages/CarPage.tsx';
import BackupPage from "./pages/BackupPage.tsx";

// TODO: technical score ???

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/cars/:carId/sensors" element={<CarSensorsPage />} />
                <Route path="/cars/:carId" element={<CarPage />} />
                <Route path="/cars/:carId/maintenance" element={<CarMaintenancePage />} />
                <Route path="/cars/:carId/incidents" element={<CarIncidentsPage />} />
                <Route path="/cars-admin" element={<CarsAdminPage />} />
                <Route path="/policies" element={<PoliciesPage />} />
                <Route path="/car-types" element={<CarTypesPage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/sensors" element={<SensorsPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
                <Route path="/incidents" element={<IncidentsPage />} />
                <Route path="/policies-admin" element={<PoliciesAdminPage />} />
                <Route path="/measurements" element={<MeasurementsPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/payments-admin" element={<PaymentsAdminPage />} />
                <Route path="/backup" element={<BackupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
