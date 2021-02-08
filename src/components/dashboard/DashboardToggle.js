import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import { useModalState, useMediaQuery } from "../../utils/utils";
import Dashbaord from ".";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashbaord />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
