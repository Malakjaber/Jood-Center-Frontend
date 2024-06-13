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
import ReportPageContainer from "./components/layouts/ReportPageContainer";
import TreatmentPageContainer from "./components/layouts/TreatmentPageContainer";
import ErrorBoundary from "./components/global/ErrorBoundary";
import StudentPageLayout from "./components/layouts/StudentPageLayout";
import CreateReport from "./components/pages/create-report/CreateReport";
import TeacherPageLayout from "./components/layouts/TeacherPageLayout";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import HomeLayout from "./components/layouts/HomeLayout";
import ParentPageLayout from "./components/layouts/ParentPageLayout";
import ErrorPage from "./components/global/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <HomeLayout />
      </>
    ),
  },
  { path: "/parent", element: <ParentPageLayout /> },
  { path: "/teacher", element: <TeacherPageLayout /> },
  { path: "/teacher/:id", element: <TeacherInformationPage /> },
  { path: "/co_manager", element: <CoManagerPageLayout /> },
  { path: "/co_manager/:id", element: <CoManagerInformationPage /> },
  { path: "/manager", element: <ManagerPageLayout /> },
  {
    path: "/student",
    children: [
      {
        path: ":id",
        element: (
          <>
            <ScrollRestoration />
            <StudentPageLayout />
          </>
        ),
      },
      { path: ":id/edit", element: <EditStudentPageLayout /> },
      { path: "createReport/:id/:stName", element: <CreateReport /> },
    ],
  },
  { path: "/class/createReport/:id", element: <CreateTreatementPlan /> },
  { path: "/report/:id", element: <ReportPageContainer /> },
  { path: "/treatment/:id", element: <TreatmentPageContainer /> },
  { path: "/class/:id", element: <ClassPageLayout /> },
  { path: "/create-class", element: <CreateClassPageLayout /> },
  { path: "/edit-class/:id", element: <EditClassPageLayout /> },
  { path: "/add-student", element: <AddNewStudentPage /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/*", element: <ErrorBoundary /> },
  { path: "/error", element: <ErrorPage /> },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
