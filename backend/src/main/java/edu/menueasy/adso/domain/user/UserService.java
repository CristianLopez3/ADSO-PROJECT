package edu.menueasy.adso.domain.user;

import edu.menueasy.adso.dto.AuthenticationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

	 Page<UserDto> getAll(Pageable pageable);
	
	 UserDto getUserById(Long id);
	
	 void createUser(UserDto userDto);
	
	 void updateUser(UserDto userDto, Long id);
	
	 void deleteUser(Long id);

	Long countUser();
	
}