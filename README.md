<div align="center">

# KasRW

### Digital RT/RW Cash Management System

A cloud-based financial management application for RT/RW organizations, built with modern web technologies and deployed on Amazon Web Services (AWS).

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS-EC2-FF9900?logo=amazonaws&logoColor=white)
![Ubuntu](https://img.shields.io/badge/Ubuntu-24.04-E95420?logo=ubuntu&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?logo=pm2&logoColor=white)

</div>

---

# Overview

KasRW is a cloud-based web application designed to simplify financial management for neighborhood organizations (RT/RW).

The application enables administrators to manage income, expenses, and financial reports through a modern web interface while utilizing cloud infrastructure for reliability and scalability.

This project was developed as the **Final Project for the Cloud Computing Course** at **Telkom University**.

---

# Key Features

- Secure User Authentication
- Dashboard Overview
- Income Management
- Expense Management
- Cash Balance Monitoring
- Financial Reports
- Transaction History
- RESTful API
- Responsive User Interface
- Cloud Deployment using AWS EC2

---

# System Architecture

```text
                   Client Browser
                          │
                          ▼
                React + Vite Frontend
                          │
                 HTTP / REST API
                          │
                          ▼
               Express.js Backend API
                          │
                     Prisma ORM
                          │
                          ▼
                  PostgreSQL Database
```

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Node.js |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL 15 |
| Reverse Proxy | Nginx |
| Process Manager | PM2 |
| Operating System | Ubuntu Server 24.04 LTS |
| Cloud Platform | Amazon EC2 |
| Version Control | Git & GitHub |

---

# Project Structure

```text
KasRW-cloud-computing
│
├── backend
│   ├── prisma
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── package.json
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── backup_data.sql
├── README.md
└── .gitignore
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/taufiksrg017/KasRW-cloud-computing.git
```

```bash
cd KasRW-cloud-computing
```

---

# Backend Setup

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

Run migration

```bash
npx prisma migrate deploy
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Run frontend

```bash
npm run dev
```

---

# Deployment

This application was deployed using:

- Amazon EC2
- Ubuntu Server 24.04 LTS
- Nginx Reverse Proxy
- PM2 Process Manager
- PostgreSQL
- Prisma ORM

---

# API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | User Login |
| GET | `/api/dashboard` | Dashboard Data |
| GET | `/api/income` | Get Income |
| POST | `/api/income` | Add Income |
| GET | `/api/expense` | Get Expense |
| POST | `/api/expense` | Add Expense |

> Update this table according to your actual API routes.

---

# Screenshots

## Login Page

```
---
```

## Dashboard

```
---
```

## Income Management

```
---
```

## Expense Management

```
---
```

## Reports

```
---
```

---

# Learning Outcomes

This project demonstrates practical implementation of:

- Cloud Computing
- AWS EC2 Deployment
- Linux Server Administration
- Nginx Reverse Proxy
- PM2 Process Management
- REST API Development
- PostgreSQL Database
- Prisma ORM
- React Development
- Express.js Backend Development

---

# Future Improvements

- JWT Refresh Token
- Docker Deployment
- CI/CD using GitHub Actions
- HTTPS with SSL Certificate
- Automated Database Backup
- Multi-user Role Management
- Dashboard Analytics
- Unit & Integration Testing

---

# Team

| Name | Role |
|------|------|
| Taufik Hidayat Siregar | Full Stack Developer |
| Wina Permata Sari Manurung | Backend Developer |
| Muhammad Fakhril Miqdad | Frontend Developer |

---

# Repository

GitHub Repository

https://github.com/taufiksrg017/KasRW-cloud-computing

---

# License

This project was developed for educational purposes as part of the Cloud Computing course at Telkom University.

---

<div align="center">

Made with ❤️ using React, Node.js, PostgreSQL, Prisma and AWS EC2.

</div>