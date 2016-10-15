package beans;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="posts")
public class Post {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Integer id;
	@Column(name="country_id")
	private Integer countryId;
	@Column(name="date")
	private Timestamp date;
	@Column(name="text")
	private String text;
	@Column(name="user_id")
	private Integer userId;
	@Column(name="title")
	private String title;

	public Post(Integer countryId, Timestamp date, String text, Integer userId, String title) {	
		this.countryId = countryId;
		this.date = date;
		this.text = text;
		this.userId = userId;
		this.title = title;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Post() {
		super();
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setCountryId(Integer countryId) {
		this.countryId = countryId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	
}
