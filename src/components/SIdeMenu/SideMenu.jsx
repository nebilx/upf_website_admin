import { Menu } from "antd";

import { BiNews } from "react-icons/bi";
import { LiaProductHunt, LiaSignOutAltSolid } from "react-icons/lia";
import { PiFlagBannerBold, PiSuitcaseBold } from "react-icons/pi";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineForum } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function SideMenu() {
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={({ key }) => {
          if (key === "SignOut") {
            return null;
          } else {
            navigate(key);
          }
        }}
        selectedKeys={[selectedKeys]}
        items={[
          { label: "Dashboard", key: "/", icon: <RxDashboard /> },
          { label: "News", key: "/News", icon: <BiNews /> },
          { label: "Product", key: "/Product", icon: <LiaProductHunt /> },
          { label: "Banner", key: "/Banner", icon: <PiFlagBannerBold /> },
          {
            label: "Customer",
            key: "/Customer",
            icon: <RiCustomerService2Line />,
          },
          { label: "Job", key: "/Job", icon: <PiSuitcaseBold /> },
          { label: "Forum", key: "/Forum", icon: <MdOutlineForum /> },
          { label: "SignOut", key: "/SignOut", icon: <LiaSignOutAltSolid /> },
        ]}
      ></Menu>
    </div>
  );
}
