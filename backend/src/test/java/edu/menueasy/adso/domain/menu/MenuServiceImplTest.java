package edu.menueasy.adso.domain.menu;

import edu.menueasy.adso.domain.category.Category;
import edu.menueasy.adso.domain.category.CategoryRepository;
import edu.menueasy.adso.infra.exceptions.ResourceNotFoundException;
import edu.menueasy.adso.s3.S3Buckets;
import edu.menueasy.adso.s3.S3Service;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@DisplayName("Menu Service Implementation Test")
@ExtendWith(MockitoExtension.class)
class MenuServiceImplTest {

    @InjectMocks
    private MenuServiceImpl menuService;

    @Mock
    private MenuRepository menuRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private S3Service s3Service;

    @Mock
    private S3Buckets s3Buckets;

    @Mock
    private MultipartFile image;


    @Test
    @DisplayName("Test create menu")
    void create() throws IOException {
        // Arrange
        byte[] mockImage = new byte[0];
        String mockImageName = "fileName";
        String mockBucketName = "bucketName";
        MenuCreateDTO menuDto = new MenuCreateDTO(
                1,
                "Test Title",
                "Test Description",
                10.0,
                true,
                1
        );
        Menu expectedMenu = new Menu();
        expectedMenu.setTitle(menuDto.title());
        expectedMenu.setDescription(menuDto.description());
        expectedMenu.setPrice(menuDto.price());
        expectedMenu.setState(menuDto.state());
        expectedMenu.setImageName(mockImageName);

        Category category = new Category();
        when(categoryRepository.findById(any())).thenReturn(Optional.of(category));

        when(image.getBytes()).thenReturn(mockImage);
        when(s3Buckets.getImages()).thenReturn(mockBucketName);
        doNothing().when(s3Service).putObject(eq(mockBucketName), anyString(), eq(mockImage));
        when(menuRepository.save(any(Menu.class))).thenReturn(expectedMenu);

        // Act
        MenuListDTO result = menuService.create(menuDto, image);

        // Assert
        assertNotNull(result, "The result should not be null");
        assertEquals(menuDto.title(), result.title(), "The title should match the DTO");
        assertEquals(menuDto.description(), result.description(), "The description should match the DTO");
        assertEquals(menuDto.price(), result.price(), "The price should match the DTO");
        assertEquals(menuDto.state(), result.state(), "The state should match the DTO");

        verify(image, times(1)).getBytes();
        verify(s3Service, times(1)).putObject(eq(mockBucketName), anyString(), eq(mockImage));
        verify(menuRepository, times(1)).save(any(Menu.class));
    }



    @Test
    @DisplayName("Test return image")
    void getMenuImage_MenuExistsAndHasImage_ReturnsImageBytes() {
        Integer menuId = 1;
        Menu menu = new Menu();
        menu.setImageName("imageName");
        byte[] expectedImageBytes = new byte[0];

        when(menuRepository.findById(menuId)).thenReturn(Optional.of(menu));
        when(s3Service.getObject(any(), any())).thenReturn(expectedImageBytes);


        byte[] result = menuService.getMenuImage(menuId);


        assertArrayEquals(expectedImageBytes, result);
        verify(menuRepository, times(1)).findById(menuId);
        verify(s3Service, times(1)).getObject(any(), any());
    }

    @Test
    @DisplayName("Test Menu Image does not exists")
    void getMenuImage_MenuExistsAndHasNoImage_ThrowsResourceNotFoundException() {
        Integer menuId = 1;
        Menu menu = new Menu();
        menu.setImageName("");

        when(menuRepository.findById(menuId)).thenReturn(Optional.of(menu));

        assertThrows(ResourceNotFoundException.class, () -> menuService.getMenuImage(menuId));
        verify(menuRepository, times(1)).findById(menuId);
    }

    @Test
    @DisplayName("Test Menu does not exists")
    void getMenuImage_MenuDoesNotExist_ThrowsIllegalArgumentException() {
        Integer menuId = 1;

        when(menuRepository.findById(menuId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> menuService.getMenuImage(menuId));
        verify(menuRepository, times(1)).findById(menuId);
    }


}