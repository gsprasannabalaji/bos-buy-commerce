import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import axios from "axios";
import { setToast } from "../features/toast/toastSlice";
import { setIsLoading } from "../features/loader/loaderSlice";
import Loader from "../common-components/Loader";
import Logo from "../assets/logo.webp";

const Login = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.loader?.isLoading);

  const handleChange = (event) => {
    const { name, value } = event?.target;
    dispatch(
      setUser({
        ...user,
        [name]: value,
      })
    );
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {
      dispatch(setIsLoading(true));
      const result = await axios?.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (result && result?.data) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            email: result?.data?.email,
            userName: result?.data?.userName,
            role: result?.data?.role,
            isUserValid: result?.data?.isUserValid,
          })
        );
        dispatch(
          setUser({
            ...user,
            role: result?.data?.role,
            isUserValid: result?.data?.isUserValid,
          })
        );
        setTimeout(() => {
          dispatch(setIsLoading(false));
          if (result?.data?.role == "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 500);
      }
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 500);
      dispatch(
        setToast({
          toast: {
            message: err?.response?.data?.message || "Network Error",
            variant: "error",
          },
          showToast: true,
        })
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="login">
          <Container>
            <Row className="flex-column-reverse flex-lg-row">
              <Col xs={12} lg={6} className="login__wrapper-left px-0 d-none d-lg-flex">
                <Image
                  src={Logo}
                  alt="logo"
                  className="login__wrapper-left__img"
                />
              </Col>
              <Col xs={12} lg={6} className="login__wrapper-right">
                <Form className="login__form">
                  <h3 className="mb-3">Login</h3>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      className="login__form__input mb-3"
                      onChange={handleChange}
                      name="email"
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="login__form__input"
                      onChange={handleChange}
                      name="password"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="login__form__cta"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                  <div className="text-center mt-3">
                    New user?{" "}
                    <Link to="/signup" className="text-primary">
                      Sign up
                    </Link>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Login;
