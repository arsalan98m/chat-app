import React from "react";
import { Drawer, Button, Divider } from "rsuite";
import { useProfileContext } from "../../context/ProfileContext";
import EditableInput from "../EditableInput";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfileContext();

  const onSave = async (newData) => {
    console.log(newData);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashbaord</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
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
