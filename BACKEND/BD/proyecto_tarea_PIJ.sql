drop database if exists proyecto_tarea_PIJ;
create database proyecto_tarea_PIJ;
use proyecto_tarea_PIJ;

create table tareas(
	id int primary key auto_increment,
	descripcion varchar(255),
    fecha_inicio date,
    fecha_fin date,
    Estado_tarea varchar(255)
   ); 
   
   select * from tareas;
