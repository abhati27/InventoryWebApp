package com.inventorysystem.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventorysystem.api.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer>{

	@Query("select o from Order o where o.executive.user.username =?1")
	List<Order> getOrdersByExecutive(String username);

	@Query("select o from Order o where o.supplier.user.username =?1")
	List<Order> getOrdersBySupplier(String username);

}