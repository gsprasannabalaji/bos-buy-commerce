import  { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import banner2 from '../assets/logo.webp';
import { useSelector, useDispatch } from 'react-redux';
import { setToast } from "../features/toast/toastSlice";
import { setIsLoading } from '../features/loader/loaderSlice';
import Loader from '../common-components/Loader';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.isLoading);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Invalid email format';
        }
        break;
      case 'password':
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
          return 'Password must be at least 6 characters and include a combination of uppercase and lowercase letters, numbers, and symbols.';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });  // Update only the error for the changed field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      dispatch(setIsLoading(true));
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/user/signup`, formData);
      navigate('/login');
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
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container fluid className="signup-page">
          <Row className="justify-content-center">
          <Col md={6} className="graphic-section px-0">
              <img src={banner2} alt="Sign Up Visual" className="img-fluid" />
            </Col>
            <Col md={6} className="signup-form-section ">
              

              <Form onSubmit={handleSubmit}>
                <h3>Create Account</h3>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100">
                  Create your account
                </Button>
                <div className="mt-3 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SignUp;
