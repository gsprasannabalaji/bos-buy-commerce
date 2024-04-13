import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { setNewProduct } from "../features/products/productsSlice";
import axios from "axios";

const AddProducts = () => {
  const newProductData = useSelector((state) => state?.products?.newProduct);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event?.target;
    if (name === "imageURL") {
      dispatch(
        setNewProduct({
          ...newProductData,
          [name]: event?.target?.files[0],
        })
      );
    } else {
      dispatch(
        setNewProduct({
          ...newProductData,
          [name]: value,
        })
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(newProductData).forEach(([key, value]) => {
      if (Array.isArray(value)) { 
        value.forEach((item) => {
          formData.append(`${key}[]`, item); 
        });
      } else if (value instanceof File) { 
        formData.append('file', value, value.name);
      } else {
        formData.append(key, value);
      }
    });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}/product/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error Posting Data:", error.response.data);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <h1>Add Product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group htmlFor="name" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={newProductData?.name}
              onChange={handleChange}
              name="name"
              id="name"
            />
          </Form.Group>

          <Form.Group htmlFor="imageUpload" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              id="imageUpload"
              label="Choose file"
              type="file"
              onChange={handleChange}
              name="imageURL"
            />
          </Form.Group>

          <Form.Group htmlFor="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={newProductData?.description}
              onChange={handleChange}
              name="description"
              id="description"
            />
          </Form.Group>

          <Form.Group htmlFor="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={newProductData?.price || ""}
              onChange={handleChange}
              name="price"
              id="price"
            />
          </Form.Group>

          <Form.Group htmlFor="stock" className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Stock"
              value={newProductData?.stock || ""}
              onChange={handleChange}
              name="stock"
              id="stock"
            />
          </Form.Group>

          <Form.Group htmlFor="description" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={newProductData?.category}
              onChange={handleChange}
              name="category"
              id="category"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddProducts;
