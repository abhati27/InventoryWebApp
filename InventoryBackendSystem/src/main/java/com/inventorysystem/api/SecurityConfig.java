package com.inventorysystem.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.inventorysystem.api.service.MyUserService;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private MyUserService myUserService;
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		/*  
		auth.inMemoryAuthentication()
		 .withUser("harry@gmail.com").password(getEncoder().encode("potter@123"))
		 .authorities("CUSTOMER")
		 .and()
		 .withUser("albus@gmail.com").password(getEncoder().encode("albus@123"))
		 .authorities("EXECUTIVE");
		 */
		auth.authenticationProvider(getAuthenticationProvider());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
//		.antMatchers(HttpMethod.POST,"/customer/add").permitAll()
//		.antMatchers(HttpMethod.GET,"/product/category/{catId}").permitAll()
//		.antMatchers(HttpMethod.GET,"/product/all").authenticated()
//		.antMatchers(HttpMethod.GET,"/product/purchase/{cid}").hasAnyAuthority("CUSTOMER","EXECUTIVE")
//		.antMatchers(HttpMethod.GET,"/auth/login").authenticated()
//		.antMatchers(HttpMethod.POST,"/category/add").hasAuthority("EXECUTIVE")
//		.antMatchers(HttpMethod.POST,"/order/post").hasAuthority("EXECUTIVE")
//		.antMatchers(HttpMethod.GET,"/order/all").hasAuthority("EXECUTIVE")
//		.antMatchers(HttpMethod.GET,"/order/supplier/all").hasAnyAuthority("SUPPLIER","EXECUTIVE")
//		.antMatchers(HttpMethod.PUT,"/order/status/update").hasAnyAuthority("SUPPLIER","EXECUTIVE","MANAGER")

		.anyRequest().permitAll()
 		.and().httpBasic()
		.and().csrf().disable(); 

	}
	@Bean
	public PasswordEncoder getEncoder() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder; 
	}
	
	private DaoAuthenticationProvider getAuthenticationProvider(){
		DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
		dao.setPasswordEncoder(getEncoder());
		dao.setUserDetailsService(myUserService);
		return dao;
	}
}





