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
import Modal from "../components/Modal/Modal";
import AdminOrderPage from "../pages/Admin/Orders/AdminOrdersPage";
import TicketsPage from "../pages/Client/Tickets/TicketsPage";
import PageNotFound from "../pages/Client/PageNotFound/PageNotFound";
import AdminPageNotFound from "../pages/Admin/PageNotFound/AdminPageNotFound";
import AdminActorsPage from "../pages/Admin/Actors/AdminActorsPage";
import SessionForm from "../features/admin/sessions/SessionForm";
import CreateActorForm from "../features/admin/actors/CreateActor/CreateActorForm";
import EditActorForm from "../features/admin/actors/EditActor/EditActorForm";
import editActorFormLoader from "../features/admin/actors/EditActor/editActorFormLoader";
import editNewsFormLoader from "../features/admin/news/EditNews/editNewsFormLoader";
import EditNewsForm from "../features/admin/news/EditNews/EditNewsForm";
import CreateNewsForm from "../features/admin/news/CreateNews/CreateNewsForm";
import MovieForm from "../features/admin/movies/MovieForm/MovieForm";
import CreateMovieForm from "../features/admin/movies/CreateMovie/CreateMovie";
import EditMovieForm from "../features/admin/movies/EditMovie/EditMovie";
import editMovieFormLoader from "../features/admin/movies/EditMovie/editMovieFormLoader";

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
            element: <Modal  title="Create Movie"><CreateMovieForm/></Modal>,
          },
          {
            path: ":movieId/edit",
            element: <Modal title="Edit Movie"><EditMovieForm/></Modal>,
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
            element: <Modal title="Create Session"><SessionForm/></Modal>,
          },
          {
            path: ":sessionId/edit",
            element: <Modal title="Edit Session"><SessionForm/></Modal>,
          },
        ],
      },

      {
        path: "halls",
        element: <AdminHallsPage />,
        children: [
          {
            path: "create",
            element: <Modal>create hall</Modal>,
          },
          {
            path: ":hallId/edit",
            element: <Modal>edit hall</Modal>,
          },
        ],
      },

      {
        path: "news",
        element: <AdminNewsPage />,
        children: [
          { path: "create", element: <Modal title="Create News"><CreateNewsForm/></Modal> },
            { path: ":newsId/edit",
              element: <Modal title="Edit News"><EditNewsForm/></Modal>,
              loader: editNewsFormLoader,
            }
        ],
      },

      {
        path: "users",
        element: <AdminUsersPage />,
        children: [
          {
            path: ":userId/edit",
            element: <Modal>User view</Modal>,
          },
          { path: "create", element: <Modal>create User</Modal> },
        ],
      },
      
      {
        path: "orders",
        element: <AdminOrderPage />,
        children: [
            { path: "create", element: <Modal>create order</Modal> },
            { path: ":orderId/edit", element: <Modal>order view</Modal>}
        ]
      },

      {
        path: "actors",
        element: <AdminActorsPage />,
        children: [
            { path: "create", element: <Modal title="Create Actor"><CreateActorForm/></Modal> },
            { path: ":actorId/edit",
              element: <Modal title="Edit Actor"><EditActorForm/></Modal>,
              loader: editActorFormLoader,
            }
        ]
      },

      {
        path: "*",
        element: <AdminPageNotFound />,
      },
    ],
  },
]);

export default router;