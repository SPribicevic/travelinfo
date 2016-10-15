package services;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import beans.CheckLogin;
import beans.Country;
import beans.Login;
import beans.ModifiedPost;
import beans.Post;
import beans.PostData;
import beans.User;
import beans.ValidateLogin;
import beans.ValidateRegistration;

@Path("/travelinfo")
public class TravelInfoService {
	
	@GET
	@Path("/test")
	public String test () {
		return("TEST");
	}
	
	@GET
	@Path("country/{country}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<ModifiedPost> returnPosts(@PathParam("country") String country) {
		
		Session session;
		SessionFactory factory;
		Object requestedCountry;
		List<Post> requestedPosts;
		Object requestedPost;
		Object user;
		ArrayList<ModifiedPost> modifiedPosts; 
		
		factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Country.class).buildSessionFactory();
		
		try{
			session = factory.getCurrentSession();
			session.beginTransaction();
			requestedCountry = session.createQuery("from Country c where c.name='"+ country +"'").uniqueResult();
			session.getTransaction().commit();
		} finally {
			factory.close();
		}
		
		factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Post.class).buildSessionFactory();
		
		try{
			session = factory.getCurrentSession();
			session.beginTransaction();
			requestedPosts = session.createQuery("from Post p where p.countryId='"+ ((Country)requestedCountry).getId() +"'").list();
			session.getTransaction().commit();
		} finally {
			factory.close();
		}
		
		modifiedPosts = new ArrayList<ModifiedPost>();
		
		for(Iterator iterator = requestedPosts.iterator(); iterator.hasNext();){
			Post post = (Post) iterator.next();
			String username;
			
			if(post.getUserId() == null){
				username = "Guest";
			} else {
			
			factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(User.class).buildSessionFactory();
			
			try{
				session = factory.getCurrentSession();
				session.beginTransaction();
				user = session.createQuery("from User u where u.id="+ post.getUserId()).uniqueResult();
				session.getTransaction().commit();
			} finally {
				factory.close();
			}
			
			username = ((User)user).getUsername();
			
			}
		
			modifiedPosts.add(new ModifiedPost(post.getId() ,post.getTitle(), post.getText(), username, post.getDate()));
		}
		
		return modifiedPosts;
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Login login(ValidateLogin vl, @Context HttpServletRequest req ) {
		Object requestedUser;
		Session session;
		SessionFactory factory;
		Login login;
		
		factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(User.class).buildSessionFactory();
		
		try{
			
			session = factory.getCurrentSession();
			session.beginTransaction();
			requestedUser = session.createQuery("from User u where u.username='"+ vl.getUser() +"'").uniqueResult();
			session.getTransaction().commit();
			
		} finally {
			
			factory.close();
		}
		
		if(requestedUser == null) {
			login = new Login(false, "Uneli ste nepostojeæe korisnièko ime!");
		} else {
			if(! ((User)requestedUser).getPassword().trim().equals(vl.getPass().trim()) ){
				login = new Login(false, "Uneli ste nepostojeæu lozinku!");
			} else {
				login = new Login(true, "Uspešno logovanje!");
				HttpSession httpSession = req.getSession(true);
				httpSession.setAttribute("username", vl.getUser());
				httpSession.setAttribute("userId", ((User)requestedUser).getId());
			}
		}
		
		return login;
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public CheckLogin register(ValidateRegistration vr, @Context HttpServletRequest req) {
		
		if(req.getSession().getAttribute("username") != null){
			return new CheckLogin(false, "Korisnik je veæ ulogovan!");
		} else {
			List<User> users;
			SessionFactory factory;
			Session session;
	
			factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(User.class).buildSessionFactory();
			
			try {
			session = factory.getCurrentSession();
			session.beginTransaction();
			users = session.createQuery("from User").list();
			session.getTransaction().commit();
			} finally {
				factory.close();
			}
			
			vr.setEmail(vr.getEmail().trim());
			vr.setPass(vr.getPass().trim());
			vr.setUser(vr.getUser().trim());
			
			for(User user : users) {
				if(user.getUsername().equals(vr.getUser())) {
					return new CheckLogin(false, "Uneto korisnièko ime je veæ u upotrebi!");
				}
				if(user.getEmail().equals(vr.getEmail())) {
					return new CheckLogin(false, "Uneti email je veæ u upotrebi!");
				}
			}
			
			factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(User.class).buildSessionFactory();
			
			try {
				session = factory.getCurrentSession();
				session.beginTransaction();
				session.save(new User(vr.getUser(), vr.getPass(), vr.getEmail()));
				session.getTransaction().commit();
			} finally {
				factory.close();
			}
			
			return new CheckLogin(true, "Registracija uspešna!");
		}
		
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public CheckLogin loadHomepage(@Context HttpServletRequest req) {
		boolean status;
		String username;
		CheckLogin cl;
		
		username = (String) req.getSession().getAttribute("username");
		
		if(username == null){
			status = false;
		} else {
			status = true;
		}
		
		cl = new CheckLogin(status, username);
		
		return cl;		
	}
	
	@POST
	@Path("/newpost")
	@Consumes(MediaType.APPLICATION_JSON)
	public void newPost(PostData postData, @Context HttpServletRequest req) {
		Session session;
		SessionFactory factory;
		Object country;
		Post post;
		Date date;
		Timestamp currentTime;
		Integer userId;
		
		// getting the country id
		factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Country.class).buildSessionFactory();
		
		try{
			session = factory.getCurrentSession();
			session.beginTransaction();
			country = session.createQuery("from Country c where c.name='"+ postData.getCountry() +"'").uniqueResult();
			session.getTransaction().commit();
			
			System.out.println(((Country)country).getId());
		} finally {
			factory.close();
		}
		
		// inserting new post into database
		date = new Date();
		currentTime = new Timestamp(date.getTime());
		userId = (Integer) req.getSession().getAttribute("userId");
		
		post = new Post(((Country)country).getId(), currentTime, postData.getText(), userId, postData.getTitle());
		
		System.out.println("TEST");
		
		factory = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Post.class).buildSessionFactory();
		
		try{
			session = factory.getCurrentSession();
			session.beginTransaction();
			session.save(post);
			session.getTransaction().commit();
		} finally {
			factory.close();
		}
	}
}
