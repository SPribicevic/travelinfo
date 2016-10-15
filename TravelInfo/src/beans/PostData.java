package beans;

import javax.ws.rs.FormParam;


public class PostData {
	@FormParam("title")
	private String title;
	@FormParam("text")
	private String text;
	@FormParam("country")
	private String country;
	
	public PostData() {
	}

	public PostData(String title, String text, String country) {
		this.title = title;
		this.text = text;
		this.country = country;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
	
}
