import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import { useModalState } from "../../utils/utils";
import Dashbaord from ".";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="right">
        <Dashbaord />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
