import React from "react";
import { Drawer, Button, Divider, Alert } from "rsuite";
import { useProfileContext } from "../../context/ProfileContext";
import { db, auth } from "../../db/firebase";
import EditableInput from "../EditableInput";
import ProviderBlock from "./ProviderBlock";
import AvatarUploadBtn from "./AvatarUploadBtn";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfileContext();

  const onSave = async (newData) => {
    const userRef = db.collection("profiles");

    try {
      await userRef.doc(auth.currentUser.uid).update({
        name: newData,
      });

      Alert.success("Nickname has been Updated", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashbaord</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />

        <AvatarUploadBtn />
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
