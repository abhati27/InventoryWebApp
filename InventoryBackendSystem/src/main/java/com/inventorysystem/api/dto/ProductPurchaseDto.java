package com.inventorysystem.api.dto;

import java.util.List;

import org.springframework.stereotype.Component;
@Component
public class ProductPurchaseDto {

	private List<Entry> entries;
	private String couponCode;

	public static class Entry {
		private int pid;
		private int qty;

		public int getPid() {
			return pid;
		}

		public void setPid(int pid) {
			this.pid = pid;
		}

		public int getQty() {
			return qty;
		}

		public void setQty(int qty) {
			this.qty = qty;
		}

	}

	public List<Entry> getEntries() {
		return entries;
	}

	public void setEntries(List<Entry> entries) {
		this.entries = entries;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

}
