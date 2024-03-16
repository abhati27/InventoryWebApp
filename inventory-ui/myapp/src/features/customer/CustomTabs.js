import React from "react";
import { Tabs, Box, TabList, Tab } from "@chakra-ui/react";

const CustomTabs = ({
  activeTab,
  categories,
  fetchAllProducts,
  fetchProductsByCategory,
  setActiveTab,
}) => {
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="orange"
      // bgColor="gray.200"
      marginBottom="4"
      marginTop="4"
    >
      <Box
        overflowX="auto"
        maxWidth="100%"
        whiteSpace="nowrap"
        //... other styles
      >
        <TabList>
          <Tab
            onClick={() => {
              fetchAllProducts();
              setActiveTab("all");
            }}
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://img.freepik.com/premium-vector/consumer-electronics-store-interior-showcase-shelves-with-laptop-computer_276875-601.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "150px",
              width: "200px",
              borderRadius: "8px",
              fontWeight: "bold",
              color: "white",
              marginRight: "10px",
              border: activeTab === "all" ? "3px solid #ff8c00" : "none",
              boxShadow:
                activeTab === "all" ? "0 0 0 3px #ff8c00 inset" : "none",
            }}
          >
            All
          </Tab>
          {categories.map((category) => (
            <Tab
              key={category.id}
              onClick={() => {
                fetchProductsByCategory(category.id);
                setActiveTab(category.id);
              }}
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${category.imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "150px",
                width: "200px",
                borderRadius: "8px",
                fontWeight: "bold",
                color: "white",
                marginRight: "10px",
                border:
                  activeTab === category.id ? "3px solid #ff8c00" : "none",
                boxShadow:
                  activeTab === category.id
                    ? "0 0 0 3px #ff8c00 inset"
                    : "none",
              }}
            >
              {category.name}
            </Tab>
          ))}
        </TabList>
      </Box>
    </Tabs>
  );
};

export default CustomTabs;
