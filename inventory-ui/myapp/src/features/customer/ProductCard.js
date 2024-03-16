import React from "react";
import {
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const ProductCard = ({ product, addToCart, handleReviewClick }) => {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Card maxW="sm" className="product-card" bgColor="gray.200">
        <CardBody>
          <Image
            src={product.imgURL || "https://via.placeholder.com/150"}
            alt={product.name}
            borderRadius="lg"
            width="100%"
            height="200px"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Heading size="sm">{product.brand}</Heading>
            <Text className="product-description">{product.description}</Text>
            <Text color="red.600" fontSize="2xl">
              ${product.price} | Rating:{" "}
              {product.avgRating || product.avgRating === 0
                ? product.avgRating.toFixed(1)
                : "N/A"}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="outline"
              colorScheme="green"
              _hover={{ bgColor: "green.200", color: "white" }}
              onClick={(e) => addToCart(product, e)}
            >
              Add to Cart
            </Button>
            <Button onClick={() => handleReviewClick(product.id)}>
              Reviews
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
