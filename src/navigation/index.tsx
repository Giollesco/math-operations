import { useRoutes } from "react-router-dom";
import { IRoutes } from "../models";
import { MainRoutes } from "./routes";

const Routes = (): IRoutes => {
  return useRoutes([MainRoutes()], "");
};

export default Routes;
