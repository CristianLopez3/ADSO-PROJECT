package edu.menueasy.adso.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.menueasy.adso.domain.menu.Menu;
import edu.menueasy.adso.domain.menu.MenuCreateDTO;
import edu.menueasy.adso.domain.menu.MenuListDTO;
import edu.menueasy.adso.domain.menu.DTOUpdateStateMenu;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.menueasy.adso.domain.menu.MenuServiceImpl;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menus")
public class MenuController {


    private final MenuServiceImpl menuService;

    @Autowired
    public MenuController(MenuServiceImpl menuService) {
        this.menuService = menuService;
    }


    @GetMapping
    public ResponseEntity<List<Menu>> getMenus() {
        return ResponseEntity.ok(menuService.getAll());
    }


    @GetMapping("/category/{id}")
    public ResponseEntity<List<MenuListDTO>> getMenusByCategory(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(menuService.findByCategory(id));
    }


    @PostMapping
    @Transactional
    public ResponseEntity<MenuListDTO> createMenu(
            @RequestParam("image") MultipartFile image,
            @RequestPart("menu") String menuStr
    ) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        MenuCreateDTO menu = objectMapper.readValue(menuStr, MenuCreateDTO.class);
        return ResponseEntity.ok(menuService.create(menu, image));
    }


    @PutMapping("/{id}")
    public ResponseEntity<MenuListDTO> updateMenu(@RequestBody MenuCreateDTO menu, @PathVariable Integer id) {
        return ResponseEntity.ok(menuService.updateMenu(menu, id));
    }


    @GetMapping("/{id}")
    public ResponseEntity<MenuListDTO> getMenu(@PathVariable Integer id) {
        return ResponseEntity.ok(menuService.getMenu(id));
    }


    @PutMapping(
            value = "{id}/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Transactional
    public ResponseEntity<Menu> updateMenuImage(@PathVariable Integer id, @RequestParam("image") MultipartFile image) {
        return ResponseEntity.ok(menuService.updateMenuImageUrl(id, image));
    }


    @GetMapping(
            value = "/{id}/image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public ResponseEntity<byte[]> getMenuImage(@PathVariable Integer id) {
        return ResponseEntity.ok(menuService.getMenuImage(id));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMenu(@PathVariable Integer id) {
        menuService.deleteMenu(id);
        return ResponseEntity.ok("Menu deleted with success!");
    }


    @PatchMapping("/state/{id}")
    public ResponseEntity<MenuListDTO> changeState(@PathVariable("id") Integer id, @RequestBody DTOUpdateStateMenu menuState) {
        return ResponseEntity.ok(menuService.changeState(id, menuState));
    }


    @GetMapping("/count")
    public ResponseEntity<Long> countMenus() {
        return ResponseEntity.ok(menuService.countMenus());
    }

    // TODO: Implement method to update image of a menu


}
