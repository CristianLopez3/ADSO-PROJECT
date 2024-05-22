package edu.menueasy.adso.domain.category;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceImplTest {
    
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryServiceImpl;

    @Test
    void getCategories(){
        // Dato de prueba
        List<Category> categories = new ArrayList<>();
        categories.add(new Category(1, "Bebidas"));
        categories.add(new Category(2, "Comida"));
        
        // Simular el comportamiento del repositorio
        when(categoryRepository.findAll()).thenReturn(categories);

        // Llamar al método a probar
        List<Category> dataToTest = categoryServiceImpl.getCategories();

        // Verificar el resultado
        verify(categoryRepository).findAll();
        assertNotNull(dataToTest);
        assertEquals(2, dataToTest.size());
        assertThat(3).isNotEqualTo(dataToTest.size());
    }

    @Test
    @DisplayName("Get Category Throws Exception")
    void getCategoryThrowsException(){
        // simulo el comportamiento
        given(categoryRepository.findById(2))
            .willThrow(new RuntimeException("Can't find category with the given id: 2"));

        // Llamar al método a probar
        assertThrows(RuntimeException.class, () -> 
            categoryServiceImpl.getCategory(2)
        );

    }


}



