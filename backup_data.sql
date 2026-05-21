--
-- PostgreSQL database dump
--

\restrict UnGwz3DjR5gC4GbrARPH1dUVocdOefAQJXPiKv3jdq6fxVjHYmpcI4bvS4a1oaf

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-05-21 13:08:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5031 (class 0 OID 32874)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: kasrw_admin
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('8b16c2ae-ff4a-496f-9146-60bb98035e12', '1d9a83d942ff9b3ddf0fd29de768352a5df91282779e83d1ccd4cfd75bc1f7ae', '2026-05-20 13:06:53.580483+07', '20260520060653_init', NULL, NULL, '2026-05-20 13:06:53.543162+07', 1);


--
-- TOC entry 5033 (class 0 OID 32894)
-- Dependencies: 221
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: kasrw_admin
--

INSERT INTO public.admin (id, nama, username, password, created_at, updated_at) VALUES (1, 'Bendahara RW 25', 'admin', '$2b$10$Ci2ef74yd2EgjH5t628Uru44LWAojQpV/Nosl6zkUXTi9ItXOqzeC', '2026-05-20 06:09:26.336', '2026-05-21 04:09:41.311');


--
-- TOC entry 5035 (class 0 OID 32908)
-- Dependencies: 223
-- Data for Name: transaksi; Type: TABLE DATA; Schema: public; Owner: kasrw_admin
--

INSERT INTO public.transaksi (id, admin_id, jenis, nominal, keterangan, tanggal, created_at, updated_at) VALUES (7, 1, 'PEMASUKAN', 1000000, 'Uang kas bulanan RW', '2026-05-21 00:00:00', '2026-05-21 04:08:10.456', '2026-05-21 04:08:10.456');
INSERT INTO public.transaksi (id, admin_id, jenis, nominal, keterangan, tanggal, created_at, updated_at) VALUES (8, 1, 'PENGELUARAN', 200000, 'Beli alat 17 an', '2026-05-21 00:00:00', '2026-05-21 04:08:27.673', '2026-05-21 04:08:27.673');


--
-- TOC entry 5044 (class 0 OID 0)
-- Dependencies: 220
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kasrw_admin
--

SELECT pg_catalog.setval('public.admin_id_seq', 1, true);


--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 222
-- Name: transaksi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kasrw_admin
--

SELECT pg_catalog.setval('public.transaksi_id_seq', 8, true);


-- Completed on 2026-05-21 13:08:29

--
-- PostgreSQL database dump complete
--

\unrestrict UnGwz3DjR5gC4GbrARPH1dUVocdOefAQJXPiKv3jdq6fxVjHYmpcI4bvS4a1oaf

