import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  TabList,
  Tab,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  IconButton,
  useDisclosure,
  HStack,
  Alert,
  AlertIcon,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import "./card.css";
import logo from "./logo.png";
import CustomTabs from "./CustomTabs";
import ProductCard from "./ProductCard";
import ReviewModal from "./ReviewModal";
import CartDrawer from "./CartDrawer";

function Customer() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });
  const [cartAnimation, setCartAnimation] = useState({ start: {}, end: {} });
  const [alertMessage, setAlertMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("gray.100", "gray.800");

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Set an animation value

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      let newCart = prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      return newCart.filter((product) => product.quantity > 0);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  const addToCart = (product, event) => {
    const productInCart = cart.find((p) => p.id === product.id);

    if (productInCart) {
      // Check if there's stock available to increase the quantity
      if (productInCart.quantity < product.quantity) {
        increaseQuantity(product.id);
      } else {
        displayStockError(product.name);
      }
    } else {
      // Check if there's stock available before adding to the cart
      if (product.quantity > 0) {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);

        // Display a success message using the Alert component
        const alertMessage = (
          <Alert status="success">
            <AlertIcon />
            {product.name} has been added to the cart.
          </Alert>
        );
        setAlertMessage(alertMessage);
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000); // Clear the alert after 3 seconds
      } else {
        displayStockError(product.name);
      }
    }
  };

  const displayStockError = (productName) => {
    const alertMessage = (
      <Alert status="error">
        <AlertIcon />
        {productName} is out of stock.
      </Alert>
    );
    setAlertMessage(alertMessage);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // Clear the alert after 3 seconds
  };

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8282/category/all");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:8282/product/category/${categoryId}`
      );
      const data = response.data;

      // Fetch average rating for each product as before
      const ratings = await Promise.all(
        data.map((product) =>
          axios.get(
            `http://localhost:8282/product/${product.id}/average-rating`
          )
        )
      );

      const productsWithRatings = data.map((product, index) => ({
        ...product,
        avgRating: ratings[index].data.averageRating || null,
      }));
      console.log(
        "Products with ratings in fetchProductsByCategory:",
        productsWithRatings
      );
      setProducts(productsWithRatings);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8282/product/all");
      const data = response.data;

      // Fetch average rating for each product
      const ratings = await Promise.all(
        data.map((product) =>
          axios
            .get(`http://localhost:8282/product/${product.id}/average-rating`)
            .then((response) => response.data.averageRating)
            .catch((error) => {
              console.error(
                `Error fetching rating for product ${product.id}:`,
                error
              );
              return null;
            })
        )
      );

      const productsWithRatings = data.map((product, index) => ({
        ...product,
        avgRating: ratings[index] || null,
      }));
      setProducts(productsWithRatings);
    } catch (error) {
      console.error("Error fetching products or ratings:", error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8282/product/review/${productId}`
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewClick = (productId) => {
    setSelectedProductId(productId);
    fetchReviews(productId);
    setReviewModalOpen(true);
  };

  const handleCloseModal = () => {
    setReviewModalOpen(false);
    setReviews([]);
    setSelectedProductId(null);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { msg } = useParams("");
  const { entity } = useParams("");
  const [message, setMessage] = useState(msg);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );

  const doLogin = () => {
    if (username === "admin@incedo.com" && password === "admin@123") {
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      navigate("/admin");
      return;
    }
    async function login() {
      try {
        let token = window.btoa(username + ":" + password);
        const response = await axios.get("http://localhost:8282/auth/login", {
          headers: {
            Authorization: "Basic " + token,
          },
        });

        // After successful login:
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        processRole(response.data.user.role);

        // Display success message
        // setAlertMessage("Successfully logged in!");
        setAlertStatus("success");
      } catch (err) {
        // Display error message
        setAlertMessage("Invalid Credentials!!");
        setAlertStatus("error");
        setErrorMsg("Invalid Credentials!!");
      }
    }

    login();
  };

  const processRole = (role) => {
    //console.log(role)

    switch (role) {
      case "EXECUTIVE":
        navigate("/executive");
        break;
      case "SUPPLIER":
        navigate("/supplier");
        break;
      case "MANAGER":
        navigate("/manager");
        break;
      case "CUSTOMER":
        onClose();
        break;
      default:
        setErrorMsg("Access Forbidden");
        break;
    }
  };

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  const [alertStatus, setAlertStatus] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Box bg={bgColor} px={4} py={2}>
        <Flex justifyContent="space-between" alignItems="center">
          {/* Logo */}
          <Image
            src={logo}
            alt="Your Logo"
            boxSize="20px"
            width="300px"
            height="60px"
          />

          {isLoggedIn ? (
            <Flex alignItems="center">
              <Button colorScheme="blue" mt={1} onClick={handleOpenDrawer}>
                Check Previous Orders
              </Button>
              <Text mx={4} mt={4}>
                {" "}
                {/* Added alignSelf and changed mr to mx */}
                Logged in as {localStorage.getItem("username")}
              </Text>
              <Button onClick={handleLogout}>Logout</Button>
            </Flex>
          ) : (
            <>
              <Button onClick={onOpen}>Login</Button>
            </>
          )}
        </Flex>
      </Box>
      <Drawer isOpen={isDrawerOpen} placement="top" onClose={handleCloseDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Previous Orders</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4}>
                <Box>
                  <Text fontWeight="bold">MacBook Pro</Text>
                  <Text>$1850</Text>
                  <Text>Quantity: 1</Text>
                  <Button colorScheme="teal" size="sm" mt={2}>
                    Write Review
                  </Button>
                </Box>
                <Box>
                  <Text fontWeight="bold">ROG Strix G15</Text>
                  <Text>$1600</Text>
                  <Text>Quantity: 4</Text>
                  <Button colorScheme="teal" size="sm" mt={2}>
                    Write Review
                  </Button>
                </Box>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMsg && (
              <Alert status="error">
                <AlertIcon />
                {errorMsg}
              </Alert>
            )}
            {message && (
              <Alert status="info">
                <AlertIcon />
                {message}
              </Alert>
            )}
            <Text mt={4}>Username:</Text>
            <Input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMsg("");
                setMessage("");
              }}
            />
            <Text mt={4}>Password:</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={doLogin}>
              Login
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CustomTabs
        activeTab={activeTab}
        categories={categories}
        fetchAllProducts={fetchAllProducts}
        fetchProductsByCategory={fetchProductsByCategory}
        setActiveTab={setActiveTab}
      />

      <div className="alert-container">{alertMessage}</div>
      <div className="product-container">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            addToCart={addToCart}
            handleReviewClick={handleReviewClick}
          />
        ))}
      </div>
      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseModal}
        products={products}
        selectedProductId={selectedProductId}
        reviews={reviews}
      />
      {/* Cart Drawer */}
      <IconButton
        icon={<FaShoppingCart />}
        position="fixed"
        bottom="2rem"
        right="2rem"
        size="lg"
        colorScheme="teal"
        isRound={true}
        aria-label="Open cart"
        onClick={onCartOpen}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={onCartClose}
        cart={cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}

export default Customer;
