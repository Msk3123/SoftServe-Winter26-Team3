import { createBrowserRouter } from "react-router";
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
import Login from "../features/Login";
import SignUp from "../features/SignUp";
import AdminMoviesPage from "../pages/Admin/MoviesPage/AdminMoviesPage";
import AdminSessionsPage from "../pages/Admin/SessionsPage/AdminSessionsPage";
import AdminHallsPage from "../pages/Admin/Halls/AdminHallsPage";
import AdminNewsPage from "../pages/Admin/News/AdminNewsPage";
import AdminUsersPage from "../pages/Admin/Users/AdminUsersPage";
import Modal from "../components/Modal";
import AdminOrderPage from "../pages/Admin/Orders/AdminOrdersPage";
import TicketsPage from "../pages/Client/Tickets/TicketsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientPageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sessions",
        element: <SessionsPage />, //query params(?date=...)
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
            element: <Modal>create movie</Modal>,
          },
          {
            path: ":movieId/edit",
            element: <Modal>edit movie</Modal>,
          },
        ],
      },

      {
        path: "sessions",
        element: <AdminSessionsPage />,
        children: [
          {
            path: "create",
            element: <Modal>create session</Modal>,
          },
          {
            path: ":sessionId/edit",
            element: <Modal>edit session</Modal>,
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
          { path: "create", element: <Modal>create news</Modal> },
          { path: ":newsId/edit", element: <Modal>edit news</Modal> },
        ],
      },

      {
        path: "users",
        element: <AdminUsersPage />,
        children: [
          {
            path: ":userId",
            element: <Modal>User view</Modal>,
          },
        ],
      },

       {
        path: "orders",
        element: <AdminOrderPage />,
        children: [
            { path: ":orderId", element: <Modal>order view</Modal>}
        ]
      },
    ],
  },
]);

export default router;