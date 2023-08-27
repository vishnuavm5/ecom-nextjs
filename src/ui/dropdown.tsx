import React from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message, Space } from "antd";
import { useRouter } from "next/navigation";

const DropDownMenu = () => {
  const router = useRouter();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const clickedItem: any = items?.find((item) => item?.key === e.key);

    if (clickedItem) {
      //message.info(`Clicked on "${clickedItem.label}" menu item.`);

      if (clickedItem.key === "1") {
        router.push("/addProduct");
      } else if (clickedItem.key === "2") {
        router.push("/sellerProducts");
      } else if (clickedItem.key === "3") {
        router.push("/sellerOrders");
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Add Product",
      key: "1",
    },
    {
      label: "My Products",
      key: "2",
    },
    {
      label: "View Orders",
      key: "3",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div>
      <Space wrap>
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
        >
          Options
        </Dropdown.Button>
      </Space>
    </div>
  );
};

export default DropDownMenu;
