package beans;

import javax.ws.rs.FormParam;

public class ValidateLogin {
	@FormParam("user")
	private String user;
	@FormParam("pass")
	private String pass;
	
	public ValidateLogin() {
		
	}
	
	public ValidateLogin(String user, String pass) {
		this();
		this.user = user;
		this.pass = pass;
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
	
	
}
