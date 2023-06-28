import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/sign-up/signUp";
import SignIn from "./pages/sign-in/signIn";
import Home from "./pages/home/home";
import EquipmentsArea from "./pages/equipments/equiments";
import BudgetsArea from "./pages/budgets/budgets";
import CreateBudget from "./pages/create-budget/createBudgets";
import AllBudgets from "./pages/all-budgets/allBudgets";

function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/equipments" element={<EquipmentsArea/>}/>
            <Route path="/budgets" element={<BudgetsArea/>}/>
            <Route path="/create-budgets" element={<CreateBudget/>}/>
            <Route path="/all-budgets" element={<AllBudgets/>}/>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
