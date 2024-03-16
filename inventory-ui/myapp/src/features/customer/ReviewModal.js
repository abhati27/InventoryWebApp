import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from "@chakra-ui/react";

const ReviewModal = ({
  isOpen,
  onClose,
  products,
  selectedProductId,
  reviews,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Reviews for {products.find((p) => p.id === selectedProductId)?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <p style={{ fontWeight: "bold" }}>
                  Rating: {review.rating} ⭐️
                </p>
                <p>{review.reviewText}</p>
                <Divider marginBottom="10px" marginTop="10px" />
              </div>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
