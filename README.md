# 🛒 E-Commerce Enterprise Application (WIP)

![.NET 8](https://img.shields.io/badge/.NET%208-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Angular](https://img.shields.io/badge/Angular%2019-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Status](https://img.shields.io/badge/Status-Work%20In%20Progress-orange?style=for-the-badge)

> **Current Status:** Active Development (Implementing Storage Architecture & Azure Blob Storage Integration)

## 🚀 Project Overview

This project is an **Enterprise-level E-Commerce System** built with **Clean Architecture (Onion Architecture)** principles. It separates concerns into distinct layers to ensure maintainability, testability, and scalability.

While based on a standard curriculum, **this project is being actively refactored and modernized** to meet 2025 industry standards.

### 🛠 Modernization Initiative (Refactoring)
Unlike the base tutorial (which uses .NET 6 & Angular Modules), this project implements:
* **Backend:** Migrated to **.NET 8** (LTS) utilizing latest C# 12 features.
* **Frontend:** Refactored from Legacy Modules to **Angular 19 Standalone Components** for better performance and tree-shaking.
* **Code Quality:** Applying **Clean Code** principles and **SOLID** patterns under Senior Mentorship review.

---

## 🏗 Architecture & Tech Stack

The solution follows the **Onion Architecture** to decouple dependencies:

* **Core Layer:** Entities, Domain Interfaces, DTOs (No external dependencies).
* **Application Layer:** CQRS Implementation (Upcoming), Repository Interfaces, Validators, DTO Mappings.
* **Infrastructure Layer:** External services (Storage, Mail, SignalR).
* **Persistence Layer:** Entity Framework Core implementation, DbContext, Migrations.
* **Presentation Layer:** ASP.NET Core Web API.

### Technologies
* **Backend:** .NET 8, ASP.NET Core Web API, Entity Framework Core (Code-First).
* **Frontend:** Angular 19 (Standalone), TypeScript, Bootstrap, AlertifyJS.
* **Database:** MS SQL Server.
* **Validation:** FluentValidation.
* **Logging:** Serilog (Structured Logging).
* **Storage:** Local Storage & Azure Blob Storage (In Progress).

---

## ✅ Progress Checklist

### Core & Infrastructure
- [x] **Onion Architecture** Setup (Core, App, Infra, Persistence Layers).
- [x] **Generic Repository Pattern** Implementation (Read/Write Repos).
- [x] **Entity Framework Core** Configuration & Migrations.
- [x] **Global Exception Handling** Middleware.
- [x] **Interceptor** implementation for `SaveChangesAsync` (Tracking Created/Updated Dates).
- [x] **CORS** Policy Configuration.

### Product & File Management
- [x] Product CRUD Operations.
- [x] **File Upload Mechanism** (Streaming/Buffered).
- [x] **Table Per Hierarchy (TPH)** Inheritance Strategy for Files (Product Image, Invoice, etc.).
- [x] SEO Friendly URL Generation.

### Upcoming Features (Roadmap)
- [ ] **Azure Blob Storage** Integration.
- [ ] **CQRS** Pattern & **MediatR** Implementation.
- [ ] **Identity** & **JWT** Authentication.
- [ ] **SignalR** for Real-Time Notifications.
- [ ] **CI/CD** Pipeline to Azure Web App.

---

## 📂 Project Structure

```text
src
├── Core
│   ├── ETicaretAPI.Application  # Interfaces, Features (CQRS), Validators
│   └── ETicaretAPI.Domain       # Entities (Product, Order, Customer)
├── Infrastructure
│   ├── ETicaretAPI.Infrastructure # Services (Storage, Token, Mail)
│   ├── ETicaretAPI.Persistence    # DbContext, Repositories, Migrations
│   └── ETicaretAPI.SignalR        # Real-time hubs
└── Presentation
    └── ETicaretAPI.API          # Controllers, Middleware
