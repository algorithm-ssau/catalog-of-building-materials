--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.category (
    category_id bigint NOT NULL,
    name character varying(255),
    parent_id bigint
);


ALTER TABLE public.category OWNER TO admin;

--
-- Name: category_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.category_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_seq OWNER TO admin;

--
-- Name: manufacturer; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.manufacturer (
    manufacturer_id bigint NOT NULL,
    country character varying(255),
    name character varying(255)
);


ALTER TABLE public.manufacturer OWNER TO admin;

--
-- Name: manufacturer_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.manufacturer_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.manufacturer_seq OWNER TO admin;

--
-- Name: product; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.product (
    product_id bigint NOT NULL,
    description character varying(255),
    image_url character varying(255),
    name character varying(255),
    price double precision,
    stock_quantity integer,
    category_id bigint,
    manufacturer_id bigint
);


ALTER TABLE public.product OWNER TO admin;

--
-- Name: product_attribute; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.product_attribute (
    product_attribute_id bigint NOT NULL,
    name character varying(255),
    value character varying(255),
    product_id bigint
);


ALTER TABLE public.product_attribute OWNER TO admin;

--
-- Name: product_attribute_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.product_attribute_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_attribute_seq OWNER TO admin;

--
-- Name: product_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.product_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_seq OWNER TO admin;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.category (category_id, name, parent_id) FROM stdin;
1	Обои	\N
2	Плитка	\N
52	Лакокрасочные	\N
53	Клеи	\N
54	Пол	\N
55	Смеси	\N
\.


--
-- Data for Name: manufacturer; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.manufacturer (manufacturer_id, country, name) FROM stdin;
1	Россия	ООО Артём
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.product (product_id, description, image_url, name, price, stock_quantity, category_id, manufacturer_id) FROM stdin;
2	Обои белые, виниловые	http://5.35.83.89:9000/images/wallpaper1.jpg	Обои белые	2430	100	1	1
3	Обои бежевые, виниловые	http://5.35.83.89:9000/images/wallpaper2.jpg	Обои бежевые	2430	100	1	1
4	Плитка серая, квадратная	http://5.35.83.89:9000/images/tile1.jpeg	Плитка серая	580	100	1	1
5	Плитка светло-серая, квадратная	http://5.35.83.89:9000/images/tile2.jpeg	Плитка светло-серая	580	100	1	1
6	Краска фасадная, белая	http://5.35.83.89:9000/images/paint1.jpg	Краска фасадная	1350	100	1	1
7	Краска фасадная, белая	http://5.35.83.89:9000/images/paint2.jpg	Краска фасадная	4000	100	1	1
\.


--
-- Data for Name: product_attribute; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.product_attribute (product_attribute_id, name, value, product_id) FROM stdin;
52	Цвет	Белый	2
53	Цвет	Бежевый	3
54	Основание	Флизелин	2
55	Основание	Флизелин	3
56	Покрытие	Винил	2
57	Покрытие	Винил	3
58	Рисунок	Однотонные	2
59	Рисунок	Однотонные	3
60	Ширина, мм	600	4
61	Ширина, мм	600	5
62	Высота, мм	600	4
63	Высота, мм	600	5
64	Толщина, мм	9	4
65	Толщина, мм	9	5
66	Цвет	Белый	6
67	Цвет	Белый	7
68	Фасовка, л	0,9	6
69	Фасовка, л	2,7	7
70	Тип поверхности	Дерево	6
71	Тип поверхности	Дерево	7
\.


--
-- Name: category_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.category_seq', 101, true);


--
-- Name: manufacturer_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.manufacturer_seq', 1, true);


--
-- Name: product_attribute_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.product_attribute_seq', 101, true);


--
-- Name: product_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.product_seq', 51, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: manufacturer manufacturer_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.manufacturer
    ADD CONSTRAINT manufacturer_pkey PRIMARY KEY (manufacturer_id);


--
-- Name: product_attribute product_attribute_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT product_attribute_pkey PRIMARY KEY (product_attribute_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- Name: product fk1mtsbur82frn64de7balymq9s; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk1mtsbur82frn64de7balymq9s FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- Name: category fk2y94svpmqttx80mshyny85wqr; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk2y94svpmqttx80mshyny85wqr FOREIGN KEY (parent_id) REFERENCES public.category(category_id);


--
-- Name: product fk89igr5j06uw5ps04djxgom0l1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk89igr5j06uw5ps04djxgom0l1 FOREIGN KEY (manufacturer_id) REFERENCES public.manufacturer(manufacturer_id);


--
-- Name: product_attribute fklefs59y5kmsbu017n1wp10gf2; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product_attribute
    ADD CONSTRAINT fklefs59y5kmsbu017n1wp10gf2 FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- PostgreSQL database dump complete
--

