package com.samsam.cs.dto;

//import lombok.Data;

//@Data
public class CSDTO {
	private int csNumber;
	private String csTitle;
	private String csDate;
	private String csContent;
	
	public int getCsNumber() {
		return csNumber;
	}

	public void setCsNumber(int csNumber) {
		this.csNumber = csNumber;
	}

	public String getCsTitle() {
		return csTitle;
	}

	public void setCsTitle(String csTitle) {
		this.csTitle = csTitle;
	}

	public String getCsDate() {
		return csDate;
	}

	public void setCsDate(String csDate) {
		this.csDate = csDate;
	}

	public String getCsContent() {
		return csContent;
	}

	public void setCsContent(String csContent) {
		this.csContent = csContent;
	}

	@Override
	public String toString() {
		return "CSDTO [csNumber=" + csNumber + ", csTitle=" + csTitle + ", csDate=" + csDate + ", csContent=" + csContent + "]";
	}
}