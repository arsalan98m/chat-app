import React from "react";
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from "rsuite";
import { auth, db } from "../db/firebase";
import firebase from "firebase/app";

const SignIn = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        db.collection("profiles")
          .doc(user.uid)
          .set({
            name: user.displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            email: user.email,
            photoUrl:
              additionalUserInfo.providerId === "facebook.com"
                ? additionalUserInfo.profile.picture.data.url
                : additionalUserInfo.profile.picture,
          });
      }

      Alert.success("Signed in", 4000);

      console.log(additionalUserInfo);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Chat App</h2>
                <p>Welcome to Progressive Web Chat App</p>
              </div>
              <div className="mt-3 login__btn">
                <Button
                  block
                  color="blue"
                  onClick={onFacebookSignIn}
                  className="signIn__btn"
                >
                  <span className="signIn__icon">
                    <Icon icon="facebook" />
                  </span>
                  <span className="signIcon__text">
                    {" "}
                    Continue with Facebook
                  </span>
                </Button>

                <Button
                  block
                  color="red"
                  className="google__btn signIn__btn"
                  onClick={onGoogleSignIn}
                >
                  <span className="signIn__icon">
                    {" "}
                    <Icon icon="google" />
                  </span>
                  <span className="signIcon__text"> Continue with Google</span>
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
