import { createBrowserRouter, Navigate } from "react-router";
import ClientPageLayout from "../layout/client/ClientPageLayout";
import AdminPageLayout from "../layout/admin/AdminPageLayout";
import HomePage from "../pages/Client/Home/HomePage";
import SessionsPage from "../pages/Client/Sessions/SessionsPage";
import SessionDetailsPage from "../pages/Client/SessionDetails/SessionDetailsPage";
import MovieDetailsPage from "../pages/Client/MovieDetails/MovieDetailsPage";
import NewsPage from "../pages/Client/News/NewsPage";
import NewsDetailsPage from "../pages/Client/NewsDatails/NewsDetailsPage";
import ActorPage from "../pages/Client/Actor/ActorPage";
import OrderPage from "../pages/Client/Order/OrderPage";
import CheckoutPage from "../pages/Client/Checkout/CheckoutPage";
import AuthLayout from "../layout/auth/AuthLayout";
import Login from "../features/auth/Login";
import SignUp from "../features/auth/SignUp";
import AdminMoviesPage from "../pages/Admin/MoviesPage/AdminMoviesPage";
import AdminSessionsPage from "../pages/Admin/SessionsPage/AdminSessionsPage";
import AdminHallsPage from "../pages/Admin/Halls/AdminHallsPage";
import AdminNewsPage from "../pages/Admin/News/AdminNewsPage";
import AdminUsersPage from "../pages/Admin/Users/AdminUsersPage";
import AdminModal from "../components/AdminModal/AdminModal";
import AdminOrderPage from "../pages/Admin/Orders/AdminOrdersPage";
import TicketsPage from "../pages/Client/Tickets/TicketsPage";
import PageNotFound from "../pages/Client/PageNotFound/PageNotFound";
import AdminPageNotFound from "../pages/Admin/PageNotFound/AdminPageNotFound";
import AdminActorsPage from "../pages/Admin/Actors/AdminActorsPage";
import CreateActorForm from "../features/admin/actors/CreateActor/CreateActorForm";
import EditActorForm from "../features/admin/actors/EditActor/EditActorForm";
import editActorFormLoader from "../features/admin/actors/EditActor/editActorFormLoader";
import editNewsFormLoader from "../features/admin/news/EditNews/editNewsFormLoader";
import EditNewsForm from "../features/admin/news/EditNews/EditNewsForm";
import CreateNewsForm from "../features/admin/news/CreateNews/CreateNewsForm";
import CreateMovieForm from "../features/admin/movies/CreateMovie/CreateMovie";
import EditMovieForm from "../features/admin/movies/EditMovie/EditMovie";
import editMovieFormLoader from "../features/admin/movies/EditMovie/editMovieFormLoader";
import CreateSessionForm from "../features/admin/sessions/CreateSession/CreateSessionForm";
import EditSessionForm from "../features/admin/sessions/EditSession/EditSessionForm";
import editSessionFormLoader from "../features/admin/sessions/EditSession/editSessionFormLoader";
import CreateHallForm from "../features/admin/halls/HallCreate/CreateHallForm";
import EditHallForm from "../features/admin/halls/HallEdit/EditHallForm";
import editHallFormLoader from "../features/admin/halls/HallEdit/editHallFormLoader";
import CreateSeatType from "../features/admin/seatType/CreateSeatType/CreateSeatType";
import EditSeatTypeForm from "../features/admin/seatType/EditSeatType/EditSeatTypeForm";
import AdminSeatTypesPage from "../pages/Admin/SeatTypes/AdminSeatTypesPage";
import editSeatTypeFormLoader from "../features/admin/seatType/EditSeatType/editSeatTypeLoader";
import orderDetailsLoader from "../features/admin/order/orderDetailsLoader";
import OrderDetailsView from "../features/admin/order/OrderDetailsView";
import userDetailsLoader from "../features/admin/user/UserDetails/userDetailsLoader";
import UserDetails from "../features/admin/user/UserDetails/UserDetails";
import CreateUser from "../features/admin/user/CreateUserForm/CreateUserForm";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientPageLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />, 
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "sessions",
        element: <SessionsPage />, 
      },
      {
        path: "sessions/:sessionId",
        element: <SessionDetailsPage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailsPage />,
      },
      {
        path: "news",
        element:<NewsPage />,
      },
      {
        path: "news/:newsId",
        element: <NewsDetailsPage />,
      },
      {
        path: "actor/:actorId",
        element: <ActorPage />,
      },
      {
        path: "order/:sessionId",
        element:<OrderPage /> ,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "tickets/:userId",
        element: <TicketsPage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element:<Login /> },
      { path: "signup", element:<SignUp />},
    ],
  },

  {
    path: "/admin",
    element: <AdminPageLayout />,
    children: [
      {
        path: "movies",
        element: <AdminMoviesPage />,
        children: [
          {
            path: "create",
            element: <AdminModal  title="Create Movie"><CreateMovieForm/></AdminModal>,
          },
          {
            path: ":movieId/edit",
            element: <AdminModal title="Edit Movie"><EditMovieForm/></AdminModal>,
            loader: editMovieFormLoader,
          },
        ],
      },

      {
        path: "sessions",
        element: <AdminSessionsPage />,
        children: [
          {
            path: "create",
            element: <AdminModal  title="Create Session"><CreateSessionForm /></AdminModal>,
          },
          {
            path: ":sessionId/edit",
            element: <AdminModal title="Edit Session"><EditSessionForm /></AdminModal>,
            loader : editSessionFormLoader,
          },
        ],
      },

      {
        path: "halls",
        element: <AdminHallsPage />,
        children: [
          {
            path: "create",
            element: <AdminModal title="Create Hall"><CreateHallForm/></AdminModal>,
          },
          {
            path: ":hallId/edit",
            element: <AdminModal title="Edit Hall"><EditHallForm/></AdminModal>,
            loader:editHallFormLoader,
          },
        ],
      },

      {
        path: "news",
        element: <AdminNewsPage />,
        children: [
          { path: "create", element: <AdminModal title="Create News"><CreateNewsForm/></AdminModal> },
          { path: ":newsId/edit",
              element: <AdminModal title="Edit News"><EditNewsForm/></AdminModal>,
              loader: editNewsFormLoader,
            }
        ],
      },

      {
        path: "users",
        element: <AdminUsersPage />,
        children: [
          { path: "create", element: <AdminModal title="Create User"><CreateUser /></AdminModal> },
          {
            path: ":userId/details",
            element: <AdminModal title="User Orders"><UserDetails /></AdminModal>,
            loader: userDetailsLoader,
          }
        ],
      },
      
      {
        path: "orders",
        element: <AdminOrderPage />,
        children: [
            { path: ":orderId/details", 
              element: <AdminModal><OrderDetailsView/></AdminModal>,
              loader: orderDetailsLoader,
            }
        ]
      },

      {
        path: "actors",
        element: <AdminActorsPage />,
        children: [
            { path: "create", element: <AdminModal title="Create Actor"><CreateActorForm/></AdminModal> },
            { path: ":actorId/edit",
              element: <AdminModal title="Edit Actor"><EditActorForm/></AdminModal>,
              loader: editActorFormLoader,
            }
        ]
      },

      {
        path: "seats",
        element: <AdminSeatTypesPage />,
        children: [
          { path: "create", element: <AdminModal title="Create Seat Type"><CreateSeatType/></AdminModal> },
          { path: ":seatId/edit",
              element: <AdminModal title="Edit Seat Type"><EditSeatTypeForm /></AdminModal>,
              loader: editSeatTypeFormLoader,
            }
        ],
      },

      {
        path: "*",
        element: <AdminPageNotFound />,
      },
    ],
  },
]);

export default router;