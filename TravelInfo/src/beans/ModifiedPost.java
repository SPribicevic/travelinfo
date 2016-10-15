package beans;

import java.sql.Timestamp;

public class ModifiedPost {
	
	private Integer id;
	private String title;
	private String text;
	private String username;
	private Timestamp time;
	
	public ModifiedPost() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ModifiedPost(Integer id, String title, String text, String username,
			Timestamp time) {
		super();
		this.id = id;
		this.title = title;
		this.text = text;
		this.username = username;
		this.time = time;
	}
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Timestamp getTime() {
		return time;
	}

	public void setTime(Timestamp time) {
		this.time = time;
	}
	
	
	
}
