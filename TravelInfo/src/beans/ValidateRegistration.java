package beans;

import javax.ws.rs.FormParam;

public class ValidateRegistration {
	@FormParam("user")
	private String user;
	@FormParam("pass")
	private String pass;
	@FormParam("email")
	private String email;
	public ValidateRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ValidateRegistration(String user, String pass, String email) {
		super();
		this.user = user;
		this.pass = pass;
		this.email = email;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
