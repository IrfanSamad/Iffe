# Business Requirements Document

## Iffi ERP & Business Application

| Document control | Details |
|---|---|
| Document owner | Product / Business Owner |
| Version | 2.0 Final |
| Status | Finalized functional baseline |
| Source document | `Iffe_Functional_Scope.md` |
| Target platform | Core PHP 8.2+, MySQL 8, Bootstrap 5 |
| Last updated | 2026-11-18 |

## 1. Executive Summary

Iffi ERP is a modular, secure business application for managing customers, products and recipes, sales quotations, invoices, payments, vendors, companies, users, and reporting. The application will use Core PHP 8.2 or later, MySQL 8, Bootstrap 5, and vanilla JavaScript.

The initial application is focused on seven confirmed modules:

1. Customer Management
2. Product Management
3. Sales Management
4. Vendor Management
5. Company Management
6. Invoice Management
7. Payment Management

The system will support role-based access, multiple company profiles, active-company selection, audit tracking, document uploads, PDF quotations, approval workflows, and configurable price slabs.

## 2. Business Objectives

1. Maintain accurate customer and vendor information.
2. Standardize ingredient, product, and recipe/BOM costing.
3. Generate accurate quick quotations using approved recipes and configurable pricing.
4. Maintain quotation history, revisions, approval status, and supporting documents.
5. Support multiple company profiles with separate business and tax details.
6. Prevent unauthorized access through authentication and role-based permissions.
7. Preserve complete audit information for master and transaction changes.
8. Manage customer invoices and record payments against approved financial transactions.

## 3. Technology and Architecture

- Backend: Core PHP 8.2 or later
- Database: MySQL 8
- Frontend: Bootstrap 5 and responsive HTML
- Client behavior: Vanilla JavaScript and Fetch API
- Database access: PDO with prepared statements and named parameters
- Server: Apache compatible with `.htaccess` clean URLs
- UI: Desktop, tablet, and mobile responsive
- Architecture: Modular MVC-lite with separate modules, core services, configuration, and shared views

## 4. Confirmed Modules

| Module | Confirmed scope |
|---|---|
| Customer Management | Customer profiles, contact details, city, and transaction history |
| Product Management | Ingredient management, BOM/recipe management, costing, and configurable weight-based pricing |
| Sales Management | Quick Quote, cost calculation, quotation management, PDF generation, approval, and history |
| Vendor Management | Vendor profiles, address, city, phone, bank, country, email, and NTN |
| Company Management | Company profile, address, NTN, phone, email, bank, city, country, and multiple company support |
| Invoice Management | Invoice creation from quotations or sales, customer invoices, due dates, status, PDF, and payment balance |
| Payment Management | Customer receipts and vendor payments, allocation, payment methods, references, reversals, and receipts |

## 5. Users and Roles

### 5.1 Standard Roles

| Role | Responsibilities |
|---|---|
| Platform Administrator | Manage companies, users, roles, permissions, and platform settings |
| Company Administrator | Manage users and master records for assigned companies |
| Customer Manager | Create and maintain customer records |
| Product Manager | Maintain ingredients, recipes, BOMs, costing, and weight prices |
| Sales User | Create, edit, print, submit, and review quotations |
| Approver | Approve or reject submitted quotations within assigned authority |
| Vendor Manager | Create and maintain vendor records |
| Invoice User | Create, issue, void, and view invoices |
| Finance User | Receive or allocate payments, issue receipts, and view balances |
| Management User | View approved quotations, reports, KPIs, and recent activity |

### 5.2 User Management Requirements

- Users shall have a unique username or email address.
- Authorized administrators shall create, edit, activate, deactivate, and reset users.
- Users may be assigned to one or more companies.
- Roles and permissions shall be assigned separately for each company.
- Deactivated users shall not be able to log in or use an existing session.
- Role or permission changes shall be audited.
- The system shall enforce permissions at the controller, action, and navigation levels.
- Unauthorized data access shall be denied.

## 6. Functional Requirements

### FR-01 Authentication

- Authorized users shall log in using valid credentials.
- Passwords shall be stored using `password_hash()` with BCRYPT.
- Successful login shall regenerate the session identifier.
- Logout shall invalidate the authenticated session.
- Password reset shall use a secure expiring reset mechanism.
- Failed authentication shall be subject to configurable lockout or rate controls.

### FR-02 Multi-Company Management

- The system shall support multiple company profiles.
- A company shall maintain its own name, address, NTN, phone, email, bank, city, and country.
- Company records shall be separated logically using `company_id`.
- Users shall select an active company when assigned to multiple companies.
- All company-specific data and reports shall use the active company context.
- An unauthorized user shall not view or change another company's data.
- Customer, vendor, ingredient, product, recipe, quotation, and document records shall belong to the active company.
- Direct record or company identifier manipulation shall not bypass company authorization.
- Switching companies shall reset navigation and loaded company data.

### FR-03 Customer Management

- The system shall maintain customer records with:
  - Name
  - Number
  - Email
  - City
- Customer records shall support create, view, update, activate, archive, and search operations.
- Required fields and duplicate customer numbers or identifiers shall be validated.
- The customer screen shall show customer quotation history.
- Customer records used in quotations shall use archive or soft-delete status rather than hard deletion.
- The system may allow the same internal contact entity to represent both a customer and vendor, subject to final business confirmation.

### FR-04 Ingredient Management

- The system shall maintain an ingredient master with:
  - Ingredient name
  - Price per KG
  - Vendor
  - COA / literature document uploads
  - Last ordered date
  - Added date
  - Last updated by
- The system shall support ingredient creation, editing, archiving, searching, and viewing.
- Ingredient files shall support secure upload, download, and attachment reference storage.
- The system shall maintain ingredient price history.
- Each price change shall record purchase date, price, vendor, user, and timestamp.
- The latest or dated selected ingredient price shall be used according to the approved costing rule.
- An ingredient used in recipes shall not be permanently deleted.

### FR-05 Product, BOM, and Recipe Management

- The system shall maintain product or BOM records.
- A recipe shall support:
  - Customer reference
  - Product or recipe name
  - Weight-based recipe
  - Ingredient selection
  - Ingredient quantities
  - Automatic ingredient costing
  - Total recipe cost
  - Version history
  - Approval status
- The user shall be able to add, update, and remove ingredients in a recipe draft.
- The system shall calculate the current ingredient cost from ingredient quantities and approved prices.
- Recipe saving shall create a version record and shall not overwrite previous versions.
- The system shall support configurable units of measure. The final confirmed unit may be KG, grams, or both.
- Recipe changes shall be logged with old values, new values, user, and timestamp.
- A recipe shall require approval if the approved workflow is enabled.

### FR-06 Weight-Based Price Management

- Weight-based pricing shall be configurable by authorized administrators.
- Initial configured ranges are:
  - 1--5 KG
  - 6--10 KG
  - 11--15 KG
  - 16--20 KG
  - 21--30 KG
  - Above 30 KG
- The 16--20 and 21--30 ranges avoid overlap at 20 KG.
- The 20 KG boundary and range assignment shall be confirmed before implementation.
- The system shall prevent overlapping configured weight ranges.
- The system shall select exactly one applicable pricing slab for a quotation quantity.
- Weight ranges, prices, effective dates, and status shall be maintained and audited.

### FR-07 Quick Quote

- The Quick Quote screen shall capture:
  1. Date and time stamp
  2. Customer
  3. Product
  4. Quantity range
  5. Actual quantity
  6. Total quantity
  7. Total units
  8. ML / G
  9. Per unit
  10. Labour cost
  11. Design cost
  12. Bottle / jar / tube cost
  13. Label cost
  14. Box cost
  15. Carton
  16. Transportation
  17. Per unit cost
  18. Total cost
- The user shall select an active-company customer before quotation entry.
- The system shall allow product and recipe selection.
- The system shall support quantity and weight selection.
- The system shall calculate ingredient, labour, design, packaging, label, box, carton, and transportation costs.
- The system shall calculate per-unit cost and total production cost.
- The system shall clearly display cost, selling price, profit amount, and profit margin.
- The costing formula and selling-price/profit method shall be approved before implementation.
- The loaded or entered values shall be recalculated after relevant field changes.
- A quotation with incomplete required fields shall not be saved or submitted.
- Quotation saving shall create a unique reference number for the active company.

### FR-08 Customer-Based Quick Quote Loading

- After a customer is selected, the system shall retrieve that customer's latest saved Quick Quote.
- The latest quotation shall be presented as an editable copy for a new quotation.
- Existing saved quotation values shall not be changed by loading the copy.
- Loaded data shall include applicable customer, product, recipe, quantity, packaging, labour, design, transportation, and cost values.
- If no previous quotation exists, the system shall open a blank quotation with the selected customer pre-filled.
- Changing the selected customer shall reload or clear quotation data according to the selected customer.
- The system shall preserve unsaved screen values until navigation or an explicit reset.
- A successful save shall create a new quotation record and confirmation message.

### FR-09 Quotation Management

- The system shall create, view, edit, duplicate, archive, print, and submit quotations.
- Quotation records shall preserve status history.
- Supported status values shall include Draft, Submitted, Approved, Rejected, Archived, and Revisions if approved.
- Approved quotations shall not be edited without creating a new revision.
- Quotation revisions and expiry dates shall be implemented only after business confirmation.
- A submitted quotation shall follow the configured approval workflow.
- Quotation approval shall record approver, date, status, comments, and timestamp.
- The system shall support single- or multiple-product quotations after the business decision is confirmed.
- The system shall generate a PDF quotation from finalized quotation data.
- PDF generation shall use the active company's profile and branding details.
- Taxes shall be applied only according to the confirmed tax calculation method.

### FR-10 Cost Calculation

- The system shall calculate and present:
  1. Ingredient cost
  2. Labour cost
  3. Design cost
  4. Bottle / jar / tube cost
  5. Label cost
  6. Box cost
  7. Carton cost
  8. Transportation cost
  9. Total production cost
  10. Per-unit cost
  11. Selling price
  12. Profit amount
  13. Profit margin
- Cost calculations shall use decimal values and shall not use floating-point database types.
- The system shall distinguish cost, selling price, profit, and tax amounts.
- Calculation formulas shall be testable and configurable where approved.

### FR-11 Vendor Management

- The system shall maintain vendor records with:
  - Name
  - Address
  - City
  - Phone number
  - Bank
  - Country
  - Email
  - NTN
- Vendor records shall support create, view, update, activate, archive, and search operations.
- Vendors shall be isolated to the active company.
- Vendor records referenced by ingredients or transactions shall not be hard-deleted.

### FR-12 Company Management

- The system shall maintain company records with:
  - Name
  - Address
  - NTN
  - Phone
  - Email
  - Bank
  - City
  - Country
- The system shall support multiple company profiles.
- Each company shall maintain its own address, tax details, bank accounts or banking details, contact information, quotation numbering, and branding.
- Company users shall not access another company's records.

### FR-13 Invoice Management

- The system shall create invoices from approved quotations or approved sales transactions.
- An invoice shall belong to the active company and one selected customer.
- An invoice shall include invoice number, issue date, due date, customer, line items, quantity, unit price, discount, tax, total amount, and status.
- The system shall calculate invoice subtotal, tax amount, discount amount, invoice total, paid amount, and outstanding balance.
- The invoice number shall be unique within the active company unless global uniqueness is confirmed.
- An invoice may contain only active-company customers and products.
- An invoice shall use Draft, Issued, Partially Paid, Paid, Overdue, Cancelled, or Refunded status as applicable.
- The system shall prevent issuance of an invoice with incomplete required lines or invalid totals.
- Issued invoices shall require a revision or credit adjustment rather than direct deletion.
- Cancelled or corrected invoices shall preserve their original number and audit history.
- The system shall generate a PDF invoice using the active company's branding and tax details.
- Invoice PDF output shall include invoice number, dates, customer, items, totals, payment terms, bank details, and outstanding balance.
- The system shall update invoice balance after validated payment allocation.
- The system shall support invoice due-date and overdue reporting.

### FR-14 Payment Management

- The system shall record customer receipt payments and, where used, vendor payments.
- A payment shall include payment date, payee or payer, company, amount, currency, payment method, reference or cheque number, bank, and notes.
- Supported payment methods shall include cash, bank transfer, card, cheque, and configured electronic methods.
- A customer payment shall be allocated to one or more issued invoices.
- A vendor payment shall be allocated to one or more vendor payables or purchase references where vendor payable functionality is implemented.
- The system shall prevent payment allocation above the invoice or payable outstanding balance.
- The system shall calculate and display total paid, unapplied, and outstanding amounts.
- The system shall issue a customer receipt or payment voucher after successful payment entry.
- A payment shall use Draft, Confirmed, Reversed, or Cancelled status as defined.
- Confirmed payments shall require reversal or an authorized adjustment rather than deletion.
- Reversal shall restore the affected invoice or payable balance and shall be audited.
- Payment details shall be included in invoice and vendor statement history.
- The system shall protect payment references and bank details according to role-based permissions.

### FR-15 Dashboard and Reports

The dashboard shall display:

- Total customers
- Total vendors
- Total ingredients
- Total products
- Pending quotations
- Approved quotations
- Total quotation value
- Total invoices
- Paid and outstanding invoice amounts
- Recent payments
- Recent activities
- Ingredient price updates

Reporting shall support:

- Sales or quotations by customer, product, status, and period
- Pending and approved quotation totals
- Customer quotation history
- Ingredient price history
- Recipe or version history
- Quotation approval history
- Invoice status and outstanding balances
- Payment receipts and payment allocation history
- Overdue customer invoices
- Export and PDF output where confirmed

## 7. Data and Audit Requirements

- Customer and vendor records may use a unified contact structure to avoid duplicate entities.
- The application shall maintain created-by and updated-by fields for audited records.
- The application shall maintain record creation and modification timestamps.
- Ingredient price history shall retain the previous and new values.
- Recipe version history shall retain complete approved or submitted versions.
- Quotation records shall retain status and approval history.
- Invoice and payment records shall retain status, allocation, reversal, and approval or confirmation history.
- Document attachments shall store a reference and shall not embed files in business records.
- COA / literature documents shall support upload and download.
- Audit records shall include user, module, record, action, old values, new values, IP address, and timestamp.
- Passwords and sensitive credentials shall not appear in audit values.

## 8. Database Requirements

- Tables shall use plural `snake_case` names.
- Primary keys shall use `id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY`.
- Company-owned tables shall include `company_id`.
- Foreign-key columns shall follow `<singular_table>_id`.
- All tables shall include `created_at` and `updated_at` timestamps.
- Monetary values shall use `DECIMAL(15,2)`.
- Queries shall use PDO prepared statements with named parameters.
- Foreign keys and indexes shall include company and frequently filtered fields.
- Invoice tables shall store header, line, tax, discount, status, paid, and outstanding values.
- Payment tables shall store payment header and invoice or payable allocation records.
- Invoice and payment changes shall use database transactions.

## 9. Development Phases

| Phase | Development scope |
|---|---|
| 1 | Login, dashboard, users, roles, and permissions |
| 2 | Customer, vendor, and company management |
| 3 | Ingredient management |
| 4 | Product, BOM, and recipe management |
| 5 | Costing and configurable weight-based pricing |
| 6 | Quick Quote and PDF generation |
| 7 | Quotation approval workflow and reports |
| 8 | Invoice generation and invoice PDFs |
| 9 | Customer and vendor payment management |

### 9.1 Invoice and Payment Workflows

#### Invoice Workflow

1. Create or select an approved quotation or approved sales transaction.
2. Verify that the customer, products, company, and pricing data belong to the active company.
3. Generate invoice header and invoice line records.
4. Calculate totals, taxes, discounts, paid amount, and outstanding balance.
5. Save the invoice as Draft or Issue it according to the approved workflow.
6. Generate a unique invoice number.
7. Generate the invoice PDF after issuing.
8. Update the invoice status and overdue status as payments and due dates change.
9. Preserve all issued invoice, cancellation, adjustment, and audit history.

#### Customer Payment Workflow

1. Select an active-company customer.
2. Select one or more issued invoices with outstanding balances.
3. Enter payment date, amount, method, reference, bank, and notes.
4. Validate that the payment is for the active company and that the allocation does not exceed balances.
5. Start a database transaction.
6. Confirm the payment and allocate it to selected invoices.
7. Recalculate paid and outstanding balances.
8. Generate the customer receipt.
9. Write payment and allocation audit records and commit the transaction.
10. Roll back all linked changes if validation or transaction processing fails.

#### Payment Reversal Workflow

1. An authorized finance or system user selects a confirmed payment.
2. The system validates reversal permission and requires confirmation or approval if configured.
3. The system starts a database transaction.
4. The reversal removes or reverses each allocation and restores the invoice outstanding balance.
5. The payment receives Reversed status and retains the original payment record.
6. The reversal reason, user, date, and affected values are audited.

## 10. Security Requirements

- SQL queries shall use PDO prepared statements.
- Dynamic HTML output shall use an escaping helper.
- State-changing forms shall use and validate CSRF tokens.
- Passwords shall use secure PHP password functions.
- Sessions shall regenerate IDs after login.
- File uploads shall validate type and size and shall use a controlled storage location.
- Session cookies shall use Secure, HttpOnly, and appropriate SameSite settings.
- Company, role, and record authorization shall be checked for every protected action.

## 11. Acceptance Criteria

The application shall be accepted when:

1. Users can log in and perform operations only within assigned roles and companies.
2. Customer, vendor, company, ingredient, and product records use complete required fields.
3. Ingredient price history and recipe versions are retained.
4. Weight-based slabs are configurable and do not overlap.
5. Quick Quote loads the selected customer's latest saved quotation or opens a blank quote.
6. Loading a previous quotation does not overwrite the saved quotation.
7. Cost calculations produce correct ingredient and production totals.
8. Quotation PDF output reflects current approved data and active-company details.
9. Quotation approval records approver and status history.
10. Customer, vendor, ingredient, and product records are protected from cross-company access.
11. Uploaded COA / literature files can be securely uploaded and downloaded.
12. Dashboard totals and report totals match stored records.
13. Unauthorized actions are denied and audited where applicable.
14. Master records use archive or soft-delete behavior where transaction history exists.
15. Invoices are generated only for approved or valid sales transactions.
16. Invoice balances equal invoice totals less confirmed payment allocations.
17. Payments cannot be allocated above invoice or payable balances.
18. Reversed payments restore the related outstanding balances and preserve audit history.
19. Invoice and receipt PDFs include the active company's details.

## 12. Assumptions

- Core PHP, MySQL, Bootstrap, and Apache are the confirmed technical platforms.
- The seven confirmed modules are the initial application scope.
- Customer and vendor may share a unified contact structure, subject to implementation approval.
- Multiple companies are required, and one active company is used at a time.
- Weight-based slabs are configurable by authorized administrators.
- Initial weight slab boundaries use 1--5, 6--10, 11--15, 16--20, 21--30, and above 30 KG.
- Quotation values, currencies, and tax rules require final business confirmation.
- PDF generation and approval workflows are in scope.
- Invoice creation from approved quotations or sales and payment recording are in scope.

## 13. Decisions to Confirm

The following items shall be finalized before the affected functionality is developed:

1. Whether the same contact can be both a customer and a vendor.
2. Whether weight-based price slabs are configurable by administrators.
3. Whether 20 KG belongs to the 16--20 KG slab or the 21--30 KG slab.
4. Whether recipe quantities are entered in KG, grams, or both.
5. The required formula for profit and selling price.
6. Who can approve quotations and whether approval limits are required.
7. Whether quotations support multiple products.
8. Whether multiple currencies are required.
9. Whether taxes are included in quotation costing.
10. Whether quotation revisions and expiry dates are required.
11. Whether quotation numbering is unique per company or globally unique.
12. Required PDF layout, company branding, and quotation validity period.
13. Whether invoices require a separate approval workflow.
14. Whether partial payments and overpayments are allowed.
15. Whether payments may be entered without immediate invoice allocation.
16. Supported payment methods and required reference fields.
17. Whether vendor payable payments are included in this release or limited to customer receipts.
18. Required invoice due-date and overdue rules.
19. Whether invoice reversals require higher-role approval.

## 14. Constraints

- Core PHP 8.2 or later
- PDO exclusively
- MySQL 8
- Bootstrap 5
- Apache and `.htaccess`
- Responsive desktop, tablet, and mobile interface
- MVC-lite modular structure
- No placeholders or incomplete business workflows

## 15. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Undefined profit formula | Incorrect quotation values | Obtain formula approval before costing implementation |
| Ambiguous weight boundaries | Wrong applicable price slab | Define exact boundaries and prevent overlap |
| Inconsistent recipe versions | Costing discrepancies | Use immutable versions and approval history |
| Cross-company record access | Data leakage | Enforce company context on every query and action |
| Unclear quotation approval authority | Unauthorized approval | Configure an approved role and limit matrix |
| Document upload exposure | Unauthorized file access | Use controlled storage and authenticated download |
| Tax or currency misconfiguration | Incorrect final quotations | Confirm tax, currency, and display rules before build |
| Incorrect payment allocation | Customer balances and invoice totals become inaccurate | Validate allocations against outstanding balances and use transactions |
| Unauthorized payment reversal | Loss or manipulation of financial history | Require elevated role approval and preserve reversal audit records |

## 16. Final Functional Baseline

This BRD is the finalized functional baseline derived from `Iffe_Functional_Scope.md`. It covers the seven confirmed modules and identifies remaining business decisions for detailed design. Items in the Decisions to Confirm section shall not be implemented with assumptions until an authorized approval is recorded.
