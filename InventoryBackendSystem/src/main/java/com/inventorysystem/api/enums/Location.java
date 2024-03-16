package com.inventorysystem.api.enums;

public enum Location {
LONDON("someplace in london")
,CARDIFF("someplace in cardiff")
,MANCHESTER("someplace in manchester");
	
	Location(String address){
		this.address = address; 
	}
	
	private String address;

	public String getAddress() {
		return address;
	}
	
	
}
