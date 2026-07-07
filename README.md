# KasRW

> **Cloud-Based RT/RW Financial Management System**
>
> Final Project — Cloud Computing Course  
> Faculty of Electrical Engineering, Telkom University

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![AWS](https://img.shields.io/badge/AWS-EC2-FF9900?logo=amazonaws&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-24.04-E95420?logo=ubuntu&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation Guide](#installation-guide)
- [Deployment](#deployment)
- [REST API Overview](#rest-api-overview)
- [Application Screenshots](#application-screenshots)
- [Learning Outcomes](#learning-outcomes)
- [Future Improvements](#future-improvements)
- [Team Members](#team-members)
- [Repository](#repository)
- [License](#license)

---

# Overview

KasRW is a cloud-based financial management system developed to assist RT/RW organizations in managing their financial transactions efficiently, transparently, and securely.

The application provides a modern web interface that enables administrators to record income, expenses, monitor cash balance, and generate financial reports. Residents can also access transparent financial information through the system.

This project was developed as the Final Project for the **Cloud Computing Course** at **Telkom University**, emphasizing cloud deployment, backend development, RESTful APIs, and Linux server administration using Amazon Web Services (AWS).

---

# Features

- Secure administrator authentication using JWT
- Dashboard with financial summary
- Income transaction management
- Expense transaction management
- Cash balance monitoring
- Financial reporting
- Transaction history
- RESTful API architecture
- Responsive web interface
- Cloud deployment on AWS EC2

---

# System Architecture

```
                           Internet
                               │
                               ▼
                        Client Browser
                               │
                               ▼
                     Nginx Reverse Proxy
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
          ▼                                         ▼
 React + Vite Frontend                 Express.js REST API
                                                  │
                                                  ▼
                                            Prisma ORM
                                                  │
                                                  ▼
                                          PostgreSQL Database
                                                  │
                                                  ▼
                                           AWS EC2 Ubuntu
```

---

# Technology Stack

| Category | Technology |
|------------|-----------------------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | PostgreSQL 15 |
| ORM | Prisma ORM |
| Authentication | JSON Web Token (JWT) |
| Reverse Proxy | Nginx |
| Process Manager | PM2 |
| Operating System | Ubuntu Server 24.04 LTS |
| Cloud Platform | Amazon EC2 |
| Version Control | Git & GitHub |

---

# Project Structure

```
KasRW-cloud-computing
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   └── services
│   └── package.json
│
├── backup_data.sql
├── README.md
└── .gitignore
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/taufiksrg017/KasRW-cloud-computing.git

cd KasRW-cloud-computing
```

---

## 2. Backend Setup

Install dependencies

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL=

JWT_SECRET=

PORT=3001
```

Run database migration

```bash
npx prisma migrate deploy
```

Start backend

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd ../frontend

npm install

npm run dev
```

---

# Deployment

The application was deployed on **Amazon Web Services (AWS)** using the following infrastructure:

- Amazon EC2
- Ubuntu Server 24.04 LTS
- Nginx Reverse Proxy
- PM2 Process Manager
- PostgreSQL Database
- Prisma ORM

Deployment architecture enables reliable hosting, process management, and scalable web service delivery.

---

# REST API Overview

| Method | Endpoint | Description |
|----------|--------------------------|---------------------------|
| POST | /api/auth/login | User Login |
| GET | /api/dashboard | Dashboard Summary |
| GET | /api/income | Get Income Data |
| POST | /api/income | Add Income |
| GET | /api/expense | Get Expense Data |
| POST | /api/expense | Add Expense |
| GET | /api/report | Generate Financial Report |

> **Note:** Update this table according to the actual API routes implemented in the backend.

---

# Application Screenshots

## Login Page

*(Insert Screenshot Here)*

---

## Dashboard

*(Insert Screenshot Here)*

---

## Income Management

*(Insert Screenshot Here)*

---

## Expense Management

*(Insert Screenshot Here)*

---

## Financial Report

*(Insert Screenshot Here)*

---

## AWS EC2 Deployment

*(Insert Screenshot Here)*

---

# Learning Outcomes

Through this project, the development team gained practical experience in:

- Cloud Computing Deployment
- Amazon EC2 Management
- Linux Server Administration
- Reverse Proxy Configuration using Nginx
- Process Management using PM2
- RESTful API Development
- PostgreSQL Database Management
- Prisma ORM Integration
- React Single Page Application Development
- Express.js Backend Development
- Git & GitHub Collaboration

---

# Future Improvements

Future enhancements planned for this project include:

- JWT Refresh Token
- Docker Containerization
- GitHub Actions CI/CD Pipeline
- HTTPS using SSL Certificate
- Automated Database Backup
- Multi-user Role Management
- Financial Analytics Dashboard
- Unit Testing & Integration Testing

---

# Team Members

| Name | Role |
|------|------|
| **Taufik Hidayat Siregar** | Full Stack Developer |
| Wina Permata Sari Manurung | Backend Developer |
| Muhammad Fakhril Miqdad | Frontend Developer |

---

# Repository

GitHub Repository

https://github.com/taufiksrg017/KasRW-cloud-computing

---

# License

This project was developed for educational purposes as the Final Project for the Cloud Computing course at **Telkom University**.
