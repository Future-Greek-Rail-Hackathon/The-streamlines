--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: clusters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clusters (
    "ID" integer NOT NULL,
    "Name" character(20) NOT NULL,
    "Package_ids" integer[],
    "Starts" character(5) NOT NULL
);


ALTER TABLE public.clusters OWNER TO postgres;

--
-- Name: Clusters_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Clusters_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clusters_ID_seq" OWNER TO postgres;

--
-- Name: Clusters_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Clusters_ID_seq" OWNED BY public.clusters."ID";


--
-- Name: drivers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drivers (
    "ID" integer NOT NULL,
    "Name" character(20) NOT NULL,
    "Cluster_name" character(20) NOT NULL
);


ALTER TABLE public.drivers OWNER TO postgres;

--
-- Name: drivers_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."drivers_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."drivers_ID_seq" OWNER TO postgres;

--
-- Name: drivers_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."drivers_ID_seq" OWNED BY public.drivers."ID";


--
-- Name: packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages (
    id integer NOT NULL,
    voucher character varying(20) NOT NULL,
    postcode integer NOT NULL,
    scanned boolean,
    delivered boolean
);


ALTER TABLE public.packages OWNER TO postgres;

--
-- Name: packages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_id_seq OWNER TO postgres;

--
-- Name: packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_id_seq OWNED BY public.packages.id;


--
-- Name: clusters ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clusters ALTER COLUMN "ID" SET DEFAULT nextval('public."Clusters_ID_seq"'::regclass);


--
-- Name: drivers ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivers ALTER COLUMN "ID" SET DEFAULT nextval('public."drivers_ID_seq"'::regclass);


--
-- Name: packages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages ALTER COLUMN id SET DEFAULT nextval('public.packages_id_seq'::regclass);


--
-- Data for Name: clusters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clusters ("ID", "Name", "Package_ids", "Starts") FROM stdin;
2	B                   	{13,15,16}	11   
1	A                   	{12,14,19}	10   
3	C                   	{17,18,20,21,25}	16   
\.


--
-- Data for Name: drivers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.drivers ("ID", "Name", "Cluster_name") FROM stdin;
2	Moe                 	A                   
3	larry               	B                   
4	Curly               	C                   
\.


--
-- Data for Name: packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages (id, voucher, postcode, scanned, delivered) FROM stdin;
14	C3C	10042	f	f
16	E5E	11444	f	f
18	G7G	16788	f	f
20	I9I	16800	f	f
12	A1A	10041	f	f
13	B2B	11332	f	f
15	D4D	11342	f	f
19	H8H	10043	f	f
21	J0J	16801	f	f
17	F6F	16788	f	f
25	W3W	16775	f	f
\.


--
-- Name: Clusters_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Clusters_ID_seq"', 3, true);


--
-- Name: drivers_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."drivers_ID_seq"', 4, true);


--
-- Name: packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_id_seq', 25, true);


--
-- Name: clusters clusters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clusters
    ADD CONSTRAINT clusters_pkey PRIMARY KEY ("ID");


--
-- Name: drivers drivers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_pkey PRIMARY KEY ("ID");


--
-- Name: packages packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages
    ADD CONSTRAINT packages_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

