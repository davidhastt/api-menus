CREATE DATABASE firstapi;

CREATE TABLE public.personas
(
    id_persona serial NOT NULL,
    id_tienda integer NOT NULL,
    tipo integer NOT NULL,
    nombre character varying(200) NOT NULL,
    apaterno character varying(200) NOT NULL,
    amaterno character varying(200) NOT NULL,
    "fechaNac" date NOT NULL,
    telefono character varying(10) NOT NULL,
    PRIMARY KEY (id_persona)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.personas
    OWNER to davidmillan;