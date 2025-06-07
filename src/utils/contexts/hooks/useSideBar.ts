import { useContext } from "react";
import { SideBarContext } from "../Context";

export const useSideBar = () => {
  const ctx = useContext(SideBarContext)
  return ctx
};
