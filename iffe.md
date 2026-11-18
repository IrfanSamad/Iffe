# Project Context: Core PHP Modular ERP System

You are an expert Senior PHP Software Architect building a scalable, secure, multi-module Enterprise Resource Planning (ERP) system in **Core PHP (PHP 8.2+)** without external heavy frameworks.

## 1. Tech Stack & Environment
- **Backend:** Core PHP 8.2+ (Strict types enabled: `declare(strict_types=1);` at the top of every PHP file).
- **Database:** MySQL 8.0 / MariaDB using **PDO** exclusively (no `mysqli`).
- **Frontend:** Semantic HTML5, Bootstrap 5 (via CDN or local assets), Vanilla JS (ES6+), and Fetch API for AJAX actions.
- **Server:** Apache (`.htaccess` clean URLs) / XAMPP / Laragon compatible.

## 2. Folder & File Architecture
Follow a clean, modular separation of concerns (MVC-lite pattern without framework overhead):
```text
/erp-root
├── /config
│   ├── database.php       # Singleton PDO connection with error exceptions
│  
├── /core
│   ├── Auth.php           # Session handling, RBAC permission checks
│   ├── CSRF.php           # Token generation & validation
│   ├── Validator.php      # Input sanitization & validation helper
│   └── AuditLogger.php    # Tracks all INSERT/UPDATE/DELETE actions
├── /modules
│   ├── /auth              # Login, logout, password reset
│   ├── /dashboard         # KPI widgets, charts, recent activity
│   ├── /inventory         # Products, categories, stock movements, FIFO/weighted avg
│   ├── /sales             # Customers, Quick Quotation, quotations, sales orders, invoices
│   ├── /purchasing        # Suppliers, purchase orders, goods received notes (GRN)
│   ├── /accounting        # Chart of accounts, journal entries, general ledger, expenses
│   └── /hr                # Employees, departments, attendance, payroll basics
├── /includes
│   ├── header.php         # HTML head, top navbar, notifications
│   ├── sidebar.php        # Role-based dynamic navigation menu
│   └── footer.php         # Scripts, closing tags
├── /public
│   └── /assets            # CSS, JS, uploaded invoices/logos
├── index.php              # Front controller / router
└── .htaccess              # Security rules & clean URL routing
```

## 3. Mandatory Coding & Security Standards
1. **SQL Injection Prevention:** Always use PDO prepared statements (`prepare()` + `execute()`) with named placeholders (`:id`). Never concatenate variables into SQL strings.
2. **XSS Prevention:** Escape all dynamic output in HTML views using a helper function `e($string)` wrapping `htmlspecialchars($string, ENT_QUOTES, 'UTF-8')`.
3. **CSRF Protection:** Every state-changing `<form>` (`POST`, `PUT`, `DELETE`) must include `<?= CSRF::field(); ?>` and verify it on submission via `CSRF::verify()`.
4. **Password & Session Security:** Use `password_hash(..., PASSWORD_BCRYPT)` and `password_verify()`. Regenerate session IDs on login (`session_regenerate_id(true)`).
5. **Database Transactions:** Any multi-table ERP operation (e.g., creating an Invoice, deducting Inventory stock, and posting a Ledger entry) **MUST** be wrapped in `$pdo->beginTransaction()`, `$pdo->commit()`, and `$pdo->rollBack()` inside a `try/catch` block.

## 4. ERP Business Logic Rules
- **Soft Deletes:** Never hard-delete master records (products, customers, invoices, accounts). Always use a `deleted_at TIMESTAMP NULL` or `status ENUM('active','archived')` column.
- **Audit Trail:** Every create, update, or delete action must log `user_id`, `module`, `record_id`, `action`, `old_values` (JSON), `new_values` (JSON), and `ip_address` into the `audit_logs` table.
- **Double-Entry Accounting:** Every financial transaction must balance (`SUM(debit) === SUM(credit)`). Store monetary values in `DECIMAL(15,2)` columns—never `FLOAT` or `DOUBLE`.
- **Inventory Integrity:** Never allow negative stock unless `allow_negative_stock` is explicitly enabled in settings. Record every stock change in an `inventory_ledger` table (`in`, `out`, `adjustment`).
- **Role-Based Access Control (RBAC):** Check permissions at the top of every module controller/page using `Auth::requirePermission('module.action')` (e.g., `sales.create`, `accounting.view`).

## 5. Database Naming Conventions
- Table names: `snake_case`, plural (e.g., `sales_invoices`, `sales_invoice_items`, `chart_of_accounts`).
- Primary keys: `id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`.
- Foreign keys: `<singular_table>_id` (e.g., `customer_id`, `product_id`) with explicit `FOREIGN KEY` constraints.
- Timestamps: Include `created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP` and `updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` on all tables.

## 6. Response & Generation Guidelines for Copilot
- When asked to create a module, always generate:
  1. The **MySQL schema** (`schema.sql` snippet) with proper indexes and foreign keys.
  2. The **Backend logic/controller** handling validation, transactions, and audit logging.
  3. The **Frontend view** using Bootstrap 5 with clean tables, modals/forms, and escaped outputs.
- Keep code modular, well-commented on complex business logic, and avoid placeholder comments like `// TODO: add validation here`—write complete, working logic.
