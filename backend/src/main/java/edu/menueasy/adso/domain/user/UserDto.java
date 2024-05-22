package edu.menueasy.adso.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserDto(
		Long id,
		String name,
		String lastname,
		@Email String email,
		String identification,
		String password,
		Long cellphone,
		Role role) {
	public UserDto(User user) {
		this(
				user.getId(),
				user.getName(),
				user.getLastname(),
				user.getUsername(),
				user.getIdentification(),
				user.getPassword(),
				user.getCellphone(),
				user.getRole()
		);
	}
}
