import React from "react";
import { Grid, Col, Row } from "rsuite";
import Sidebar from "../../components/Sidebar";
import { RoomProvider } from "../../context/RoomContext";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useMediaQuery } from "../../utils/utils";
import Chat from "./Chat";

const Home = () => {
  const isDesktop = useMediaQuery("(min-width: 992px)");

  const { isExact } = useRouteMatch();

  const canRederSidebar = isDesktop || isExact;

  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRederSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar></Sidebar>
            </Col>
          )}

          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>

            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">
                    Please Select Chat room
                  </h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomProvider>
  );
};

export default Home;
