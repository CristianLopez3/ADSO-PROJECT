package edu.menueasy.adso.domain.event;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.*;
import javax.lang.model.element.Name;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Event")
@Table(name = "tb_events")
public class Event {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column ( name = "title")
    private String title;

    @Column( name = "description", length = 1000)
    private String description;

    @Column( name = "discount")
    private Integer discount;

    @Column (name = "image_url")
    private String url;


}

