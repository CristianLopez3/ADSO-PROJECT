package edu.menueasy.adso.domain.menu;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import edu.menueasy.adso.domain.category.CategoryRepository;
import edu.menueasy.adso.infra.exceptions.ResourceNotFoundException;
import edu.menueasy.adso.infra.exceptions.menu.CategoryNotFoundException;
import edu.menueasy.adso.infra.exceptions.menu.InvalidMenuException;
import edu.menueasy.adso.s3.S3Buckets;
import edu.menueasy.adso.s3.S3Service;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class MenuServiceImpl implements MenuService {


    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;

    private final S3Service s3Service;
    private final S3Buckets s3Buckets;


    public MenuServiceImpl(MenuRepository menuRepository, CategoryRepository categoryRepository,
                           S3Service s3Service, S3Buckets s3Buckets) {
        this.menuRepository = menuRepository;
        this.categoryRepository = categoryRepository;
        this.s3Service = s3Service;
        this.s3Buckets = s3Buckets;
    }

    @Override
    public MenuListDTO getMenu(Integer id) {
        Menu menu = menuRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Error to find menu with id : " + id));
        return new MenuListDTO(menu);
    }

    @Override
    public List<Menu> getAll() {
        return menuRepository.findAll();

    }

    @Transactional
    @Override
    public MenuListDTO create(MenuCreateDTO menuDto, MultipartFile image) {

        validateMenuDto(menuDto);

        String menuImageId = UUID.randomUUID().toString();
        Menu menu = createMenuFromDto(menuDto, menuImageId);
        Menu menuSaved = menuRepository.save(menu);

        try {
            s3Service.putObject(
                    s3Buckets.getImages(),
                    "/menu-images/%s/%s".formatted(menuSaved.getId(), menuImageId),
                    image.getBytes()
            );
            menu.setImageName(menuImageId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new MenuListDTO(menuSaved);
    }

    @Override
    public MenuListDTO updateMenu(MenuCreateDTO menuDto, Integer id) {
        Menu menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find menu with id: " + id));
        menu.setTitle(menuDto.title());
        menu.setDescription(menuDto.description());
        menu.setPrice(menuDto.price());
        menu.setCategory(categoryRepository.findById(menuDto.idCategory()).orElseThrow(() ->
                new RuntimeException("Can't find category with id: " + menuDto.idCategory())));
        menu.setState(menuDto.state());
        menuRepository.save(menu);
        return new MenuListDTO(menu);
    }


    @Override
    public Menu updateMenuImageUrl(Integer menuId, MultipartFile image) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new RuntimeException("Can't find menu with id: " + menuId));

        String eventImageId = UUID.randomUUID().toString();
        try {
            s3Service.putObject(
                    s3Buckets.getImages(),
                    "/menu-images/%s/%s".formatted(menuId, eventImageId),
                    image.getBytes()
            );
            menu.setImageName(eventImageId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        menuRepository.updateImageUrl(menuId, eventImageId);
        return menu;
    }


    @Override
    public byte[] getMenuImage(Integer menuId) {
        var menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Event with id " + menuId + " not found"));

        if (menu.getImageName().isBlank()) {
            throw new ResourceNotFoundException(
                    "menu with id [%s] has no image".formatted(menuId));
        }

        return s3Service.getObject(
                s3Buckets.getImages(),
                "/menu-images/%s/%s".formatted(menuId, menu.getImageName()));

    }


    @Override
    public void deleteMenu(Integer id) {
        menuRepository.deleteById(id);
    }


    @Override
    public List<MenuListDTO> findByCategory(Integer idCategory) {
        return menuRepository.findByCategoryId(idCategory)
                .stream()
                .map(MenuListDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public Long countMenus() {
        return menuRepository.count();
    }

    public MenuListDTO changeState(Integer id, DTOUpdateStateMenu dtoState) {
        Menu menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Can't find this reservation, try again"));
        menu.setState(dtoState.state());

        return new MenuListDTO(menuRepository.save(menu));
    }


    /**
     * UTILS METHODS
     *
     * @validteMenuDto
     * @uploadImage
     * @createMenuFromDto
     * @saveMenu
     */

    private void validateMenuDto(MenuCreateDTO menuDto) {
        if (menuDto.title() == null || menuDto.title().isEmpty()) {
            throw new InvalidMenuException("Title is required");
        }

    }


    private Menu createMenuFromDto(MenuCreateDTO menuDto, String fileName) {
        Menu menu = new Menu();
        menu.setTitle(menuDto.title());
        menu.setDescription(menuDto.description());
        menu.setPrice(menuDto.price());
        menu.setState(menuDto.state());
        menu.setImageName(fileName);
        menu.setCategory(categoryRepository.findById(menuDto.idCategory()).orElseThrow(() ->
                new CategoryNotFoundException(menuDto.idCategory())));
        return menu;
    }


}
