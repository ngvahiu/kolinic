package com.ngvahiu.kolinicserver;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ngvahiu.kolinicserver.blog.BlogData;
import com.ngvahiu.kolinicserver.blog.entities.Blog;
import com.ngvahiu.kolinicserver.blog.entities.BlogType;
import com.ngvahiu.kolinicserver.blog.repositories.BlogRepository;
import com.ngvahiu.kolinicserver.blog.repositories.BlogTypeRepository;
import com.ngvahiu.kolinicserver.department.Department;
import com.ngvahiu.kolinicserver.department.DepartmentRepository;
import com.ngvahiu.kolinicserver.doctor.Doctor;
import com.ngvahiu.kolinicserver.doctor.DoctorData;
import com.ngvahiu.kolinicserver.doctor.DoctorRepository;
import com.ngvahiu.kolinicserver.drug.DrugData;
import com.ngvahiu.kolinicserver.drug.entities.Drug;
import com.ngvahiu.kolinicserver.drug.entities.DrugCategory;
import com.ngvahiu.kolinicserver.drug.repositories.DrugCategoryRepository;
import com.ngvahiu.kolinicserver.drug.repositories.DrugRepository;
import com.ngvahiu.kolinicserver.service.Service;
import com.ngvahiu.kolinicserver.service.ServiceRepository;
import com.ngvahiu.kolinicserver.user.Gender;
import com.ngvahiu.kolinicserver.user.Role;
import com.ngvahiu.kolinicserver.user.User;
import com.ngvahiu.kolinicserver.user.UserData;
import com.ngvahiu.kolinicserver.user.UserRepository;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@SpringBootApplication
@RequiredArgsConstructor
public class KolinicServerApplication {
	private final UserRepository userRepo;
	private final ServiceRepository serviceRepo;
	private final DepartmentRepository departmentRepo;
	private final DoctorRepository doctorRepo;
	private final DrugCategoryRepository drugCatRepo;
	private final DrugRepository drugRepo;
	private final BlogTypeRepository blogTypeRepo;
	private final BlogRepository blogRepo;

	public static void main(String[] args) {
		SpringApplication.run(KolinicServerApplication.class, args);
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                	.addMapping("/**")
                	.allowedOrigins("*")
                	.allowedMethods(CorsConfiguration.ALL)
                    .allowedHeaders(CorsConfiguration.ALL)
                    .allowedOriginPatterns(CorsConfiguration.ALL);
            }
        };
    }

	@Bean
	CommandLineRunner runner() {
		return args -> {
//			if(userRepo.findAll().isEmpty()) seedingUserData();
//			if(serviceRepo.findAll().isEmpty())seedingServiceData();
//			if(departmentRepo.findAll().isEmpty())seedingDepartmentData();
//			if(doctorRepo.findAll().isEmpty())seedingDoctorData();
//			if(drugCatRepo.findAll().isEmpty())seedingDrugCategoryData();
//			if(drugRepo.findAll().isEmpty())seedingDrugData();
//			if(blogTypeRepo.findAll().isEmpty())seedingBlogTypeData();
//			if(blogRepo.findAll().isEmpty())seedingBlogData();
			
//			seedingUserData();
//			seedingServiceData();
//			seedingDepartmentData();
//			seedingDoctorData();
//			seedingDrugCategoryData();
//			seedingDrugData();
//			seedingBlogTypeData();
//			seedingBlogData();
		};
	}

	private void seedingUserData() throws ParseException {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<UserData>> userTypeReference = new TypeReference<List<UserData>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/users.json");
		try {
			List<UserData> userDatas = mapper.readValue(inputStream, userTypeReference);
			List<User> users = new ArrayList<User>();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
			for(UserData userData : userDatas) {
				User user = User.builder()
									.fullName(userData.getFullName())
									.email(userData.getEmail())
									.phoneNumber(userData.getPhoneNumber())
									.role(Role.valueOf(userData.getRole()))
									.active(userData.isActive())
									.password(userData.getPassword())
									.gender(Gender.valueOf(userData.getGender()))
									.address(userData.getAddress())
									.dob(formatter.parse(userData.getDob()))
									.build();
				
				users.add(user);
			}
			userRepo.saveAll(users);
			System.out.println("Users Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save users: " + e.getMessage());
		}
	}
	
	private void seedingServiceData() {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<Service>> userTypeReference = new TypeReference<List<Service>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/services.json");
		try {
			List<Service> services = mapper.readValue(inputStream, userTypeReference);
			serviceRepo.saveAll(services);
			System.out.println("Services Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save services: " + e.getMessage());
		}
	}
	
	private void seedingDepartmentData() {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<Department>> userTypeReference = new TypeReference<List<Department>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/departments.json");
		try {
			List<Department> departments = mapper.readValue(inputStream, userTypeReference);
			departmentRepo.saveAll(departments);
			System.out.println("Departments Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save departments: " + e.getMessage());
		}
	}
	
	private void seedingDoctorData() throws ParseException {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<DoctorData>> userTypeReference = new TypeReference<List<DoctorData>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/doctors.json");
		try {
			List<DoctorData> doctorDatas = mapper.readValue(inputStream, userTypeReference);
			List<Doctor> doctors = new ArrayList<Doctor>();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
			for(DoctorData doctorData : doctorDatas) {
				Department dep = departmentRepo.findById(doctorData.getDepartmentId()).orElse(null);
				Doctor doctor = Doctor.builder()
									.name(doctorData.getName())
									.description(doctorData.getDescription())
									.about(doctorData.getAbout())
									.education(doctorData.getEducation())
									.workingYear(doctorData.getWorkingYear())
									.dob(formatter.parse(doctorData.getDob()))
									.avatar(doctorData.getAvatar())
									.department(dep)
									.build();
				
				doctors.add(doctor);
			}
			doctorRepo.saveAll(doctors);
			System.out.println("Doctors Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save doctors: " + e.getMessage());
		}
	}
	
	private void seedingDrugCategoryData() {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<DrugCategory>> userTypeReference = new TypeReference<List<DrugCategory>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/drug-categories.json");
		try {
			List<DrugCategory> drugCategories = mapper.readValue(inputStream, userTypeReference);
			drugCatRepo.saveAll(drugCategories);
			System.out.println("Drug categories Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save drug categories: " + e.getMessage());
		}
	}
	
	private void seedingDrugData() {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<DrugData>> userTypeReference = new TypeReference<List<DrugData>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/drugs.json");
		try {
			List<DrugData> drugDatas = mapper.readValue(inputStream, userTypeReference);
			List<Drug> drugs = new ArrayList<Drug>();
			for(DrugData drugData : drugDatas) {
				DrugCategory category = drugCatRepo.findById(drugData.getCategoryId()).orElse(null);
				Drug drug = Drug.builder()
									.name(drugData.getName())
									.description(drugData.getDescription())
									.packSize(drugData.getPackSize())
									.remaining(drugData.getRemaining())
									.price(drugData.getPrice())
									.img(drugData.getImg())
									.category(category)
									.build();
				
				drugs.add(drug);
			}
			drugRepo.saveAll(drugs);
			System.out.println("Drugs Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save drugs: " + e.getMessage());
		}
	}
	
	private void seedingBlogTypeData() {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<BlogType>> userTypeReference = new TypeReference<List<BlogType>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/blog-types.json");
		try {
			List<BlogType> blogTypes = mapper.readValue(inputStream, userTypeReference);
			blogTypeRepo.saveAll(blogTypes);
			System.out.println("Blog types Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save blog types: " + e.getMessage());
		}
	}
	
	private void seedingBlogData() throws ParseException {
		// read json and write to db
		ObjectMapper mapper = new ObjectMapper();
		TypeReference<List<BlogData>> userTypeReference = new TypeReference<List<BlogData>>() {};
		InputStream inputStream = TypeReference.class.getResourceAsStream("/data/blogs.json");
		try {
			List<BlogData> blogDatas = mapper.readValue(inputStream, userTypeReference);
			List<Blog> blogs = new ArrayList<Blog>();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
			for(BlogData blogData : blogDatas) {
				BlogType type = blogTypeRepo.findById(blogData.getTypeId()).orElse(null);
				Blog blog = Blog.builder()
								.title(blogData.getTitle())
								.content(blogData.getContent())
								.thumbnail(blogData.getThumbnail())
								.postedAt(formatter.parse(blogData.getPostedAt()))
								.type(type)
								.build();
				
				blogs.add(blog);
			}
			blogRepo.saveAll(blogs);
			System.out.println("Blogs Saved!");
		} catch (IOException e) {
			System.out.println("Unable to save blogs: " + e.getMessage());
		}
	}
}
