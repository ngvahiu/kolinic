import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Loading = lazy(() => import('./components/Loading/Loading.jsx'));
const MainLayout = lazy(() => import('./layout/MainLayout.jsx'));
const SubLayout = lazy(() => import('./layout/SubLayout.jsx'));
const AdminLayout = lazy(() => import('./layout/AdminLayout.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Appointment = lazy(() => import('./pages/Appointment/Appointment.jsx'));
const AppointmentHistory = lazy(() => import('./pages/Appointment/AppointmentHistory.jsx'));
const Blogs = lazy(() => import('./pages/Blogs/Blogs.jsx'));
const BlogDetails = lazy(() => import('./pages/Blogs/BlogDetails.jsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.jsx'));
const Doctors = lazy(() => import('./pages/Doctors/Doctors.jsx'));
const DoctorDetails = lazy(() => import('./pages/Doctors/DoctorDetails.jsx'));
const Drugs = lazy(() => import('./pages/Drugs/Drugs.jsx'));
const DrugsDetails = lazy(() => import('./pages/Drugs/DrugsDetails.jsx'));
const DrugsOrderHistory = lazy(() => import('./pages/Drugs/DrugsOrdersHistory.jsx'));
const Checkout = lazy(() => import('./pages/Drugs/Checkout.jsx'));
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const MissionVision = lazy(() => import('./pages/MissionVision/MissionVision.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound.jsx'));
const Profile = lazy(() => import('./pages/Profile/Profile.jsx'));
const Services = lazy(() => import('./pages/Services/Services.jsx'));
const ServiceDetails = lazy(() => import('./pages/Services/ServiceDetails.jsx'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn.jsx'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword.jsx'));
const TermServices = lazy(() => import('./pages/TermServices/TermServices.jsx'));
const Timeline = lazy(() => import('./pages/Timeline/Timeline.jsx'));
const UserManagement = lazy(() => import('./pages/Admin/UserManagement.jsx'));
const ServiceManagement = lazy(() => import('./pages/Admin/ServiceManagement.jsx'));
const ServiceAction = lazy(() => import('./pages/Admin/ServiceAction.jsx'));
const DoctorManagement = lazy(() => import('./pages/Admin/DoctorManagement.jsx'));
const DoctorAction = lazy(() => import('./pages/Admin/DoctorAction.jsx'));
const DrugCategoryManagement = lazy(() => import('./pages/Admin/DrugCategoryManagement.jsx'));
const DrugCategoryAction = lazy(() => import('./pages/Admin/DrugCategoryAction.jsx'));
const DrugManagement = lazy(() => import('./pages/Admin/DrugManagement.jsx'));
const DrugAction = lazy(() => import('./pages/Admin/DrugAction.jsx'));
const DrugOrderManagement = lazy(() => import('./pages/Admin/DrugOrderManagement.jsx'));
const AppointmentManagement = lazy(() => import('./pages/Admin/AppointmentManagement.jsx'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route
              index
              element={
                <Home />
              }
            />
          </Route>
          <Route path="/" element={
            <ProtectedRoute>
              <SubLayout />
            </ProtectedRoute>
          }>
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/services'
              element={<Services />}
            />
            <Route
              path='/services/:id'
              element={<ServiceDetails />}
            />
            <Route
              path='/doctors'
              element={<Doctors />}
            />
            <Route
              path='/doctors/:id'
              element={<DoctorDetails />}
            />
            <Route
              path='/mission-vision'
              element={<MissionVision />}
            />
            <Route
              path='/contact'
              element={<Contact />}
            />
            <Route
              path='/timeline'
              element={<Timeline />}
            />
            <Route
              path='/term-services'
              element={<TermServices />}
            />
            <Route
              path='/blogs'
              element={<Blogs />}
            />
            <Route
              path='/blogs/:id'
              element={<BlogDetails />}
            />
            <Route
              path='/drugs'
              element={<Drugs />}
            />
            <Route
              path='/drugs/:id'
              element={<DrugsDetails />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/make-appointment'
              element={<Appointment />}
            />
            <Route
              path='/appointment-history'
              element={<AppointmentHistory />}
            />
            <Route
              path='/drugs-order-history'
              element={<DrugsOrderHistory />}
            />
            <Route
              path='/checkout'
              element={<Checkout />}
            />
          </Route>
          <Route path='/admin' element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path='users' element={<UserManagement />} />
            <Route path='services' element={<ServiceManagement />} />
            <Route path='services/:id' element={<ServiceAction />} />
            <Route path='services/create-service' element={<ServiceAction />} />
            <Route path='doctors' element={<DoctorManagement />} />
            <Route path='doctors/:id' element={<DoctorAction />} />
            <Route path='doctors/create-doctor' element={<DoctorAction />} />
            <Route path='drug-categories' element={<DrugCategoryManagement />} />
            <Route path='drug-categories/:id' element={<DrugCategoryAction />} />
            <Route path='drug-categories/create-category' element={<DrugCategoryAction />} />
            <Route path='drugs' element={<DrugManagement />} />
            <Route path='drugs/:id' element={<DrugAction />} />
            <Route path='drugs/create-drug' element={<DrugAction />} />
            <Route path='drug-orders' element={<DrugOrderManagement />} />
            <Route path='appointments' element={<AppointmentManagement />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route
            path='/sign-in'
            element={<SignIn />}
          />
          <Route
            path='/sign-up'
            element={<SignUp />}
          />
          <Route
            path='/forgot-password'
            element={<ForgotPassword />}
          />
          <Route
            path='/reset-password/:token'
            element={<ForgotPassword />}
          />
          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense >
  );
}

export default App;
