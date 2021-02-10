import React from "react";
import { Grid, Col, Row } from "rsuite";
import Sidebar from "../components/Sidebar";
import { RoomProvider } from "../context/RoomContext";
const Home = () => {
  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar></Sidebar>
          </Col>
        </Row>
      </Grid>
    </RoomProvider>
  );
};

export default Home;
