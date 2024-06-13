import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/layouts/HomeLayout";
import ParentPageLayout from "./components/layouts/ParentPageLayout";
import { PrimeReactProvider } from "primereact/api";
import TeacherPageLayout from "./components/layouts/TeacherPageLayout";
import Footer from "./components/global/Footer";
import StudentPageLayout from "./components/layouts/StudentPageLayout";
import CreateReport from "./components/pages/create-report/CreateReport";
import { AuthProvider } from "./components/contexts/AuthContext";
import SignIn from "./components/pages/user/SignIn";
import SignUp from "./components/pages/user/SignUp";
import CreateTreatementPlan from "./components/pages/create-tratement-plan/CreateTreatementPlan";
import CoManagerPageLayout from "./components/layouts/CoManagerPageLayout";
import EditStudentPageLayout from "./components/layouts/EditStudentPageLayout";
import AddNewStudentPage from "./components/layouts/AddNewStudentPage";
import ManagerPageLayout from "./components/layouts/ManagerPageLayout";
import TeacherInformationPage from "./components/layouts/TeacherInformationPage";
import ClassPageLayout from "./components/layouts/ClassPageLayout";
import CreateClassPageLayout from "./components/layouts/CreateClassPageLayout";
import EditClassPageLayout from "./components/layouts/EditClassPageLayout";
import CoManagerInformationPage from "./components/layouts/CoManagerInformationPage";
import ReportSection from "./components/global/ReportSection";
import ReportPageContainer from "./components/layouts/ReportPageContainer";
import TreatmentPageContainer from "./components/layouts/TreatmentPageContainer";

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <div className="scroll-smooth flex flex-col justify-between min-h-[100vh]">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeLayout />} />
              <Route path="/parent" element={<ParentPageLayout />} />
              <Route path="/teacher" element={<TeacherPageLayout />} />
              <Route path="/teacher/:id" element={<TeacherInformationPage />} />
              <Route path="/co_manager" element={<CoManagerPageLayout />} />
              <Route
                path="/co_manager/:id"
                element={<CoManagerInformationPage />}
              />
              <Route path="/manager" element={<ManagerPageLayout />} />
              <Route path="/student">
                <Route path="/student/:id" element={<StudentPageLayout />} />
                <Route
                  path="/student/:id/edit"
                  element={<EditStudentPageLayout />}
                />
                <Route
                  path="/student/createReport/:id/:stName"
                  element={<CreateReport />}
                />
              </Route>
              <Route
                path="/class/createReport/:id"
                element={<CreateTreatementPlan />}
              />
              <Route path="/report/:id" element={<ReportPageContainer />} />
              <Route
                path="/treatment/:id"
                element={<TreatmentPageContainer />}
              />
              <Route path="/class/:id" element={<ClassPageLayout />} />
              <Route path="/create-class" element={<CreateClassPageLayout />} />
              <Route path="/edit-class/:id" element={<EditClassPageLayout />} />
              <Route path="/add-student" element={<AddNewStudentPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
