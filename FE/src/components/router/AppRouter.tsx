import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLayout'));
import LoginPage from '@app/pages/LoginPage';
import SignUpPage from '@app/pages/SignUpPage';
import ForgotPasswordPage from '@app/pages/ForgotPasswordPage';
import SecurityCodePage from '@app/pages/SecurityCodePage';
import NewPasswordPage from '@app/pages/NewPasswordPage';
import LockPage from '@app/pages/LockPage';
const ArrDepListPage = React.lazy(() => import('@app/components/forms/ArrDepForm/ArrDepListPage'));
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/profile/ProfileLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';

//This is team work
import LandingPage from '@app/pages/landingPage/LandingPage';
const DashBoardPage = React.lazy(() => import('@app/pages/DashboardPages/DashboardPage'));
const RegisterNewShipPage = React.lazy(() => import('@app/pages/Register/RegisterNewShipPage'));
const RegisterNewModeratorPage = React.lazy(() => import('@app/pages/Register/RegisterNewModeratorPage'));
const RegisterNewBorderGuardPage = React.lazy(() => import('@app/pages/Register/RegisterNewBorderGuardPage'));
const RegisterNewCrewMemberPage = React.lazy(() => import('@app/pages/Register/RegisterNewCrewMemberPage'));
const RegisterNewShipOwnerPage = React.lazy(() => import('@app/pages/Register/RegisterNewShipOwnerPage'));
const RegisterNewCaptainPage = React.lazy(() => import('@app/pages/Register/RegisterNewCaptainPage'));
const ShipListPage = React.lazy(() => import('@app/pages/ListPage/ShipListsPage'));
const ShipDetailPage = React.lazy(() => import('@app/pages/DetailPage/ShipDetailPage'));
const ShipEditDetailPage = React.lazy(() => import('@app/pages/EditDetailPage/ShipEditDetailPage'));
const ModeratorListsPage = React.lazy(() => import('@app/pages/ListPage/ModeratorListsPage'));
const ModeratorDetailPage = React.lazy(() => import('@app/pages/DetailPage/ModeratorDetailPage'));
const ModeratorEditDetailPage = React.lazy(() => import('@app/pages/EditDetailPage/ModeratorEditDetailPage'));
const CaptainListsPage = React.lazy(() => import('@app/pages/ListPage/CaptainListsPage'));
const CaptainDetailPage = React.lazy(() => import('@app/pages/DetailPage/CaptainDetailPage'));
const CaptainEditDetailPage = React.lazy(() => import('@app/pages/EditDetailPage/CaptainEditDetailPage'));
const CrewMemberListsPage = React.lazy(() => import('@app/pages/ListPage/CrewMemberListsPage'));
const CrewMemberDetailPage = React.lazy(() => import('@app/pages/DetailPage/CrewMemberDetailPage'));
const CrewMemberEditDetailPage = React.lazy(() => import('@app/pages/EditDetailPage/CrewMemberEditDetailPage'));
const ShipOwnerListsPage = React.lazy(() => import('@app/pages/ListPage/ShipOwnerListsPage'));
const ShipOwnerDetailPage = React.lazy(() => import('@app/pages/DetailPage/ShipOwnerDetailPage'));
const ShipOwnerEditDetailPage = React.lazy(() => import('@app/pages/EditDetailPage/ShipOwnerEditDetailPage'));
const BorderGuardListsPage = React.lazy(() => import('@app/pages/ListPage/BorderGuardListsPage'));
const BorderGuardDetailPage = React.lazy(() => import('@app/pages/DetailPage/BorderGuardDetailPage'));
const BorderGuardEditDetailPage = React.lazy(() => import('@app/pages/EditDetailPage/BorderGuardEditDetailPage'));
const MapLocationPage = React.lazy(() => import('@app/pages/MapLocationPage'));
const NearbyShip = React.lazy(() => import('@app/pages/NearbyShip'));
const ApproveArrivalShipListsPage = React.lazy(() => import('@app/pages/ListPage/ApproveArrivalShipListsPage'));
const ApproveArrivalShipDetailPage = React.lazy(() => import('@app/pages/DetailPage/ApproveArrivalShipDetailPage'));
const ApproveDepartureShipListsPage = React.lazy(() => import('@app/pages/ListPage/ApproveDepartureShipListsPage'));
const ApproveDepartureShipDetailPage = React.lazy(() => import('@app/pages/DetailPage/ApproveDepartureShipDetailPage'));
const ScheduleListsPage = React.lazy(() => import('@app/pages/ListPage/ScheduleListsPage'));
const NextJourney = React.lazy(() => import('@app/pages/ListPage/NextJourney'));
const UncompletedRegisterPage = React.lazy(() => import('@app/pages/ListPage/UncompletedRegisterPage'));
//const DataTablesPage = React.lazy(() => import('@app/pages/DataTablesPage'));
const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const AdvancedFormsPage = React.lazy(() => import('@app/pages/AdvancedFormsPage'));
const PersonalInfoPage = React.lazy(() => import('@app/pages/PersonalInfoPage'));
const SecuritySettingsPage = React.lazy(() => import('@app/pages/SecuritySettingsPage'));
const AvatarSettingPage = React.lazy(() => import('@app/pages/AvatarSettingPage'));
const Logout = React.lazy(() => import('./Logout'));

export const TABLE_DASHBOARD_PATH = '/';

//This is team work
const Dashboard = withLoading(DashBoardPage);
const RegisterShip = withLoading(RegisterNewShipPage);
const ShipList = withLoading(ShipListPage);
const ShipDetail = withLoading(ShipDetailPage);
const ShipEditDetail = withLoading(ShipEditDetailPage);
const ModeratorList = withLoading(ModeratorListsPage);
const ModeratorDetail = withLoading(ModeratorDetailPage);
const ModeratorEditDetail = withLoading(ModeratorEditDetailPage);
const CaptainList = withLoading(CaptainListsPage);
const CaptainDetail = withLoading(CaptainDetailPage);
const CaptainEditDetail = withLoading(CaptainEditDetailPage);
const CrewMemberList = withLoading(CrewMemberListsPage);
const CrewMemberDetail = withLoading(CrewMemberDetailPage);
const CrewMemberEditDetail = withLoading(CrewMemberEditDetailPage);
const ShipOwnerList = withLoading(ShipOwnerListsPage);
const ShipOwnerDetail = withLoading(ShipOwnerDetailPage);
const ShipOwnerEditDetail = withLoading(ShipOwnerEditDetailPage);
const BorderGuardList = withLoading(BorderGuardListsPage);
const BorderGuardDetail = withLoading(BorderGuardDetailPage);
const BorderGuardEditDetail = withLoading(BorderGuardEditDetailPage);
const Map = withLoading(MapLocationPage);
const NearbyShip2 = withLoading(NearbyShip);
const DepartureRegisterPage = React.lazy(() => import('@app/pages/Register/DepartureRegisterPage'));
const DepartureRegister = withLoading(DepartureRegisterPage);
const ArrivalRegisterPage = React.lazy(() => import('@app/pages/Register/ArrivalRegisterPage'));
const ArrivalRegister = withLoading(ArrivalRegisterPage);
const ApproveArrivalShipList = withLoading(ApproveArrivalShipListsPage);
const ApproveArrivalShipDetail = withLoading(ApproveArrivalShipDetailPage);
const ApproveDepartureShipList = withLoading(ApproveDepartureShipListsPage);
const ApproveDepartureShipDetail = withLoading(ApproveDepartureShipDetailPage);
const RegisterModerator = withLoading(RegisterNewModeratorPage);
const RegisterBorderGuard = withLoading(RegisterNewBorderGuardPage);
const RegisterCrewMember = withLoading(RegisterNewCrewMemberPage);
const RegisterShipOwner = withLoading(RegisterNewShipOwnerPage);
const RegisterCaptain = withLoading(RegisterNewCaptainPage);
const ScheduleListsDetail = withLoading(ScheduleListsPage);
const UncompletedRegisterDetail = withLoading(UncompletedRegisterPage);
const NextJourneyDetail = withLoading(NextJourney);
const AdvancedForm = withLoading(AdvancedFormsPage);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

// Profile
const PersonalInfo = withLoading(PersonalInfoPage);
const SecuritySettings = withLoading(SecuritySettingsPage);
const AvatarSetting = withLoading(AvatarSettingPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);
//VanHuy
const ArrDepList = withLoading(ArrDepListPage);
const ArrivalAndDeparturePage = React.lazy(() => import('@app/pages/ArrivalAndDeparturePage'));
const ArrivalAndDeparture = withLoading(ArrivalAndDeparturePage);

export const AppRouter: React.FC = () => {
  const roleType = localStorage.getItem('roleType');
const role = localStorage.getItem('role');
console.log(role);
console.log(roleType);
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path={TABLE_DASHBOARD_PATH} element={protectedLayout}>
        {/* {roleType === 'Admin' ||role==='PortAuthority' ? ( */}
            <Route path="dashboard" element={<Dashboard />} />   
        {/* ) : (
          <Route path="dashboard" element={<Navigate to="/auth/login" />} />
        )} */}
          <Route path="moderator-management" element={<ModeratorList />} />
          <Route path="moderator-detail/:id" element={<ModeratorDetail />} />
          <Route path="moderator-detail/:id/edit" element={<ModeratorEditDetail />} />
          <Route path="captain-management" element={<CaptainList />} />
          <Route path="captain-detail/:id" element={<CaptainDetail />} />
          <Route path="captain-detail/:id/edit" element={<CaptainEditDetail />} />
          <Route path="crew-member-management" element={<CrewMemberList />} />
          <Route path="crew-member-detail/:id" element={<CrewMemberDetail />} />
          <Route path="crew-member-detail/:id/edit" element={<CrewMemberEditDetail />} />
          <Route path="register-new-ship" element={<RegisterShip />} />
          <Route path="ship-management" element={<ShipList />} />
          <Route path="/ship-detail/:id" element={<ShipDetail />} />
          <Route path="/ship-detail/:id/edit" element={<ShipEditDetail />} />
          <Route path="ship-owner-management" element={<ShipOwnerList />} />
          <Route path="/ship-owner-detail/:id" element={<ShipOwnerDetail />} />
          <Route path="/ship-owner-detail/:id/edit" element={<ShipOwnerEditDetail />} />
          <Route path="border-guard-management" element={<BorderGuardList />} />
          <Route path="/border-guard-detail/:id" element={<BorderGuardDetail />} />
          <Route path="/border-guard-detail/:id/edit" element={<BorderGuardEditDetail />} />
          <Route path="approve-arrival-ship-management" element={<ApproveArrivalShipList />} />
          <Route path="approve-arrival-ship-detail/:id" element={<ApproveArrivalShipDetail />} />
          <Route path="approve-departure-ship-management" element={<ApproveDepartureShipList />} />
          <Route path="approve-departure-ship-detail/:id" element={<ApproveDepartureShipDetail />} />
          <Route path="404" element={<Error404 />} />
          <Route path="map" element={<Map />} />
          <Route path="nearbyShip/:id" element={<NearbyShip2 />} />
          <Route path="arrival-departure/detail/:id" element={<ArrivalAndDeparture />} />
          <Route path="arrival-departure" element={<ArrDepList />} />
          <Route path="departure-register" element={<DepartureRegister />} />
          <Route path="arrival-register" element={<ArrivalRegister />} />
          <Route path="history" element={<ScheduleListsDetail />} />
          <Route path="nextjourney" element={<NextJourneyDetail />} />
          <Route path="uncomplete" element={<UncompletedRegisterDetail />} />
          <Route path="register-moderator" element={<RegisterModerator />} />
          <Route path="register-border-guard" element={<RegisterBorderGuard />} />
          <Route path="register-crew-member" element={<RegisterCrewMember />} />
          <Route path="register-ship-owner" element={<RegisterShipOwner />} />
          <Route path="register-captain" element={<RegisterCaptain />} />
          <Route path="forms">
            <Route path="advanced-forms" element={<AdvancedForm />} />
          </Route>
          <Route path="server-error" element={<ServerError />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="security-settings" element={<SecuritySettings />} />
            <Route path="avatar-setting" element={<AvatarSetting/>} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="security-code" element={<SecurityCodePage />} />
          <Route path="new-password" element={<NewPasswordPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
        </Routes>
    </BrowserRouter>
  );
};
