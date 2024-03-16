package com.inventorysystem.api.dto;

import com.inventorysystem.api.enums.OrderStatus;

public class StatusUpdateDto {
	private OrderStatus status;
	private int orderId;

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

}
