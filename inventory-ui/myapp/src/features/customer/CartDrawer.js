import React, { useState, useRef } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function CartDrawer({
  isOpen,
  onClose,
  cart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  getTotalPrice,
  isLoggedIn,
}) {
  const [isErrorAlertVisible, setIsErrorAlertVisible] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const handleOrderClick = () => {
    if (!isLoggedIn) {
      setIsErrorAlertVisible(true);
      setTimeout(() => {
        setIsErrorAlertVisible(false);
      }, 3000); // hides after 3 seconds
      return;
    }
    // If logged in, continue the order process.
    setIsPurchaseModalOpen(true);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Cart</DrawerHeader>
            <DrawerBody overflowY="auto">
              {cart.map((product, index) => (
                <Box key={index} mb={5}>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text color="gray.500">${product.price}</Text>
                  <HStack mt={2}>
                    <IconButton
                      icon={<FaMinus />}
                      onClick={() => decreaseQuantity(product.id)}
                      aria-label="Decrease quantity"
                    />
                    <Input type="number" value={product.quantity} readOnly />
                    <IconButton
                      icon={<FaPlus />}
                      onClick={() => increaseQuantity(product.id)}
                      aria-label="Increase quantity"
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => removeFromCart(product.id)}
                      aria-label="Remove from cart"
                    />
                  </HStack>
                </Box>
              ))}
            </DrawerBody>
            <Box py={2} px={4}>
              <Text fontSize="xl" mb={4}>
                Total: ${getTotalPrice().toFixed(2)}
              </Text>
              <Button
                width="full"
                colorScheme="green"
                onClick={handleOrderClick}
              >
                Place Order
              </Button>
            </Box>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Purchase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Cards
              number={cardInfo.number}
              name={cardInfo.name}
              expiry={cardInfo.expiry}
              cvc={cardInfo.cvc}
              focused={cardInfo.focused}
            />
            <form>
              <input
                type="tel"
                name="number"
                placeholder="Card Number"
                value={cardInfo.number}
                onChange={handleInputChange}
                onFocus={(e) => setCardInfo({ ...cardInfo, focused: "number" })}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={cardInfo.name}
                onChange={handleInputChange}
                onFocus={(e) => setCardInfo({ ...cardInfo, focused: "name" })}
              />
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY Expiry"
                value={cardInfo.expiry}
                onChange={handleInputChange}
                onFocus={(e) => setCardInfo({ ...cardInfo, focused: "expiry" })}
              />
              <input
                type="tel"
                name="cvc"
                placeholder="CVC"
                value={cardInfo.cvc}
                onChange={handleInputChange}
                onFocus={(e) => setCardInfo({ ...cardInfo, focused: "cvc" })}
              />
            </form>
            Are you sure you want to proceed with the purchase?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                // Handle purchase logic here...
                setIsPurchaseModalOpen(false);
              }}
            >
              Confirm
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsPurchaseModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isErrorAlertVisible && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="modal"
          width="80%"
          maxWidth="400px"
        >
          <Alert status="error">
            <AlertIcon />
            Please Login to process your order.
          </Alert>
        </Box>
      )}
    </>
  );
}

export default CartDrawer;
