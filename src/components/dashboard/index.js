import React from "react";
import { Drawer, Button } from "rsuite";
import { useProfileContext } from "../../context/ProfileContext";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfileContext();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashbaord</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
