package beans;

public class CheckLogin {
	private boolean status;
	private String user;
	
	public CheckLogin(boolean status, String user) {
		super();
		this.status = status;
		this.user = user;
	}
	public CheckLogin() {
		super();
		// TODO Auto-generated constructor stub
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	
	
}
