import React, { useCallback } from "react";
import { Button, Icon, Drawer, Alert } from "rsuite";
import { useModalState, useMediaQuery } from "../../utils/utils";
import { auth } from "../../db/firebase";
import Dashbaord from ".";

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");

  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info("Successfully Signed Out", 4000);
    close();
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashbaord onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
