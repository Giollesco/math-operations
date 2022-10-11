import Layout from "../layouts";
import { Navigate } from "react-router-dom";
import { IRoute } from "../models";

// Icons
import { IconPlus, IconMinus, IconX, IconDivide } from '@tabler/icons';

// Pages
import Addition from "../pages/Addition";
import Subtraction from "../pages/Subtraction";
import Multiplication from "../pages/Multiplication";
import Division from "../pages/Division";
import Test from "../pages/Test";
import CustomTest from "../pages/Test/Custom";
import Dashboard from "../pages/Dashboard";

export const MainRoutes = (): IRoute => {
  return {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navigate replace to="dashboard" />,
        showOnSidebar: false,
        children: undefined,
        icon: null,
      },
      {
        path: "*",
        element: <Navigate replace to="dashboard" />,
        showOnSidebar: false,
        children: undefined,
        icon: null,
      },
      {
        path: "dashboard",
        children: undefined,
        element: <Dashboard />,
        name: "Početna stranica",
        showOnSidebar: false,
        icon: null,
      },
      {
        path: "addition",
        children: undefined,
        element: <Addition />,
        name: "Zbrajanje",
        showOnSidebar: true,
        icon: <IconPlus stroke={1.5} size="1.1rem" />,
      },
      {
        path: "subtraction",
        children: undefined,
        element: <Subtraction />,
        name: "Oduzimanje",
        showOnSidebar: true,
        icon: <IconMinus stroke={1.5} size="1.1rem" />,
      },
      {
        path: "division",
        children: undefined,
        element: <Division />,
        name: "Dijeljenje",
        showOnSidebar: true,
        icon: <IconDivide stroke={1.5} size="1.1rem" />,
      },
      {
        path: "multiplication",
        children: undefined,
        element: <Multiplication />,
        name: "Množenje",
        showOnSidebar: true,
        icon: <IconX stroke={1.5} size="1.1rem" />,
      },
      {
        path: "test/custom",
        children: undefined,
        element: <CustomTest />,
        name: "Prilagođeni Test",
        showOnSidebar: false,
        icon: null,
      },
      {
        path: "test/:test_type",
        children: undefined,
        element: <Test />,
        name: "Test",
        showOnSidebar: false,
        icon: null,
      },
    ],
    icon: null,
  };
};
