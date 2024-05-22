package edu.menueasy.adso.domain.user;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserServiceImpTest {

  @Mock
  UserRepository userRepository;
  @Mock
  PasswordEncoder encoder;
  @InjectMocks
  UserServiceImp serviceImp;


  @Test
  public void testGetUserById() {
    // BDD
    Long id = 1L;
    User user = User.builder()
                    .username("test")
                    .role(Role.ADMIN)
                    .password("test")
                    .build();

    given(userRepository.findById(id)).willReturn(Optional.of(user));

    UserDto userDto = serviceImp.getUserById(id);

    then(userRepository).should(times(1)).findById(id);
    assertEquals(Role.ADMIN, user.getRole());
    assertThat(userDto).isNotNull();

  }


  @Test
  public void testGetUserByIdThrowException() {
    // BDD
    Long id = 1L;
    User user = User.builder()
            .username("test")
            .role(Role.ADMIN)
            .password("test")
            .build();

    given(userRepository.findById(id)).willThrow(new UsernameNotFoundException("User not found"));

    assertThrows(UsernameNotFoundException.class, () ->
      serviceImp.getUserById(id)
    );

  }

  @Test
  void getUsers() {
  }

  @Test
  void getUserById() {
  }

  @Test
  void createUser() {
  }

  @Test
  void updateUser() {
  }

  @Test
  void deleteUser() {
  }
}