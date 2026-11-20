## Functional Scope & Development Plan

### 1. Application Overview

The initial implementation baseline is:

- **Backend:** PHP 8.2+ (core PHP)
- **Database:** MySQL 8
- **Frontend:** Bootstrap 5, responsive
- **UI/UX:** Modern interface for desktop, tablet, and mobile devices
- **Assets:** Include Bootstrap, JavaScript, and CSS files in the project and serve them locally. Do not depend on external JavaScript or CSS/CDN files.

## 2. Confirmed Application Modules

| # | Module | Baseline scope |
|---|---|---|
| 1 | Customer Management | Customer profiles, contact details, and city |
| 2 | Product and Recipe Management | Products, ingredients, BOM/recipes, and costing |
| 3 | Weight-Based Pricing | Configurable weight ranges and prices |
| 4 | Sales and Quotations | Quick Quote, quotation management, and approval |
| 5 | Sales Orders | Create orders from approved quotations |
| 6 | Invoices and Payments | Create invoices from sales orders and track payment balances |
| 7 | Vendor Management | Vendor profiles, addresses, banking, and NTN |
| 8 | Company Management | Company profile, address, NTN, banking, and contact details |
| 9 | Administration | Dashboard, users, and roles |

## 3. Functional Requirements

### 3.1 Customer Management

Maintain customer records with the following fields:

-   Name
-   Number
-   Email
-   City

### 3.2 Product Management

#### 3.2.1 Ingredient Management

Maintain an ingredient master with:

-   Ingredient Name
-   Price per KG
-   Vendor
-   Supported file uploads (COA / Literature)
-   Last Ordered
-   Added On
-   Last Updated By

Recommended additional functionality:

-   Ingredient price history
-   Purchase date and price tracking
-   Created by / Updated by audit tracking
-   Document upload and download

#### 3.2.2 Product (BOM) / Recipe Management

The recipe and Bill of Materials (BOM) module should support:

-   Customer Reference
-   Costing Management
-   Weight-based Recipe
-   Ingredient selection and quantities
-   Automatic ingredient costing
-   Total recipe cost calculation
-   Recipe version history
-   Recipe approval workflow

#### 3.2.3 Weight-Based Price Management

| Weight range | Pricing |
|---|---|
| 1–5 kg | Configurable |
| 6–10 kg | Configurable |
| 11–15 kg | Configurable |
| 16–20 kg | Configurable |
| 21–30 kg | Configurable |
| Above 30 kg | Configurable |

**Configuration note:** Pricing slabs must be configurable rather than hardcoded. The demo currently assigns exactly 20 kg to the 16–20 kg slab; confirm this boundary before production implementation.

### 3.3 Sales Management

#### 3.3.1 Quick Quote

Quick Quote is the first functional baseline for the PHP/MySQL implementation. It should:

- Start with a blank customer and product entry. Customer selection is required and searchable; product, quantity, and cost entry stay disabled until an active customer is selected.
- Initialize numeric entry fields to zero after customer selection. Reset returns the form to the blank initial state; selecting a customer does not load an older quotation.
- Support multiple product/recipe lines, searchable product selection, product unit pricing, and selectable weight-based price slabs.
- Capture total units, ML/G per unit, wastage in grams, and a read-only actual quantity in kilograms for each product line.
- Calculate actual quantity as **((total units × ML/G per unit) + wastage in grams) ÷ 1,000**, rounded to three decimal places; use that displayed quantity for weight-based pricing.
- Calculate a product-priced line as **total units × unit price**. Calculate a weight-priced line as **actual quantity in kg × selected price per kg**. Displayed line totals are rounded to whole rupees; the quotation total is the sum of those displayed line totals.
- Capture labour, design, bottle/jar/tube, label, box, carton, and transportation costs, plus an open description/additional-requirements field.
- Provide predictable keyboard tabbing through product, rate, quantity, size, wastage, and cost entry; read-only calculated fields are skipped.
- Show a summary with total quantity and units, ingredient and production costs, per-unit cost, average selling price, quotation total, estimated profit, and the latest approved quotation. Estimates are exclusive of tax unless a tax requirement is agreed.
- Capture quotation date/time and support quotation PDF generation and history.

#### 3.3.2 Cost Calculation

The quotation should clearly distinguish cost, selling price, and profit:

1. Ingredient cost is calculated from product/recipe cost and quoted units.
2. Total cost is ingredient cost plus labour, design, packaging, label, box, carton, and transportation costs.
3. Per-unit cost is total cost divided by total units; show zero when there are no units.
4. Selling price is the sum of the product line totals.
5. Estimated profit is selling price minus total cost. The displayed profit margin is profit divided by selling price; show zero when the selling price is zero.

The production implementation must preserve the baseline calculations and record any approved change to costing or rounding rules.

#### 3.3.3 Quotation Approval and Sales Orders

- A saved quotation starts as a draft and can be submitted for approval.
- Only submitted quotations can be approved.
- Only an approved quotation can be converted to a sales order.
- Create no more than one sales order from a quotation.
- Copy the approved quotation's customer, products, quantities, prices, and total to the sales order.

#### 3.3.4 Invoices and Payments

- Create an invoice only from an uninvoiced sales order; each sales order can be invoiced once.
- Copy the sales order's customer, line items, and total to the invoice.
- Require an issue date and a due date that is not earlier than the issue date.
- Track invoice status, amount paid, and outstanding balance. Support invoice viewing and PDF output.
- Record customer receipts and vendor payments, including date, party, amount, payment method, reference, and notes.
- Allow customer receipts to be allocated to an invoice or left unapplied. Reject allocations above the invoice balance; update paid amount, status, and balance for allocated receipts.

### 3.4 Vendor Management

Maintain vendor records with:

-   Name
-   Address
-   City
-   Phone Number
-   Bank
-   Country
-   Email
-   NTN

### 3.5 Company Management

Maintain company records with:

-   Name
-   Address
-   NTN
-   Phone
-   Email
-   Bank
-   City
-   Country

The system may support multiple company profiles, each with its own tax
details, bank accounts, contact information, and address.

## 4. Recommended Dashboard

The dashboard should display:

-   Total Customers
-   Total Vendors
-   Total Ingredients
-   Total Products
-   Pending Quotations
-   Approved Quotations
-   Total Quotation Value
-   Recent Activities
-   Ingredient Price Updates

## 5. Recommended Development Phases

| Phase | Development scope |
|---|---|
| 1 | Project foundation, login, dashboard, users, roles, and permissions |
| 2 | Customer, vendor, and company management |
| 3 | Ingredient management and document attachments |
| 4 | Product, BOM, and recipe management |
| 5 | Costing and weight-based pricing |
| 6 | Quick Quote, quotation management, and PDF generation |
| 7 | Quotation approval, sales orders, invoices, and payments |
| 8 | Reports, audit history, and remaining agreed enhancements |

## 6. Recommended Data Architecture

Customer and Vendor records should use a unified contact structure
internally. This will allow the same business entity to act as both a
customer and a vendor without creating duplicate records.

The application should also maintain:

-   User and role-based permissions
-   Created-by and updated-by audit fields
-   Record creation and modification timestamps
-   Ingredient price history
-   Recipe version history
-   Quotation status and approval history
-   Document attachment references

## 7. Decisions to Confirm Before Development

Confirm these items before implementing the related production functionality:

1. Whether one contact can act as both a customer and a vendor.
2. Which roles can manage weight-price slabs and prices.
3. The 20 kg slab boundary. The demo currently assigns 20 kg to the 16–20 kg slab; confirm whether production should do the same.
4. The units and conversions supported by recipes and ingredients.
5. The quotation approver roles and any approval limits.
6. Whether multiple companies require separate data access and whether currencies beyond PKR are required.
7. Tax handling for quotations and invoices; the current quotation estimate is exclusive of tax.
8. Quotation revisions, expiry dates, and approval/rejection history.
9. File upload types, size limits, and storage location for ingredient documents.

## 8. Functional Baseline

- **Baseline ID:** IFFI-FB-001
- **Version:** 1.0
- **Recorded:** 19 November 2026
- **Status:** Baseline for the PHP/MySQL implementation kickoff

This document records the functional scope to use for database design, UI/UX, and phased implementation. The current browser demo is the reference for Quick Quote behavior and the quotation approval → sales order → invoice flow. The demo is an in-memory prototype; production behavior must persist in MySQL and enforce the agreed permissions and validations on the server.

Sections 1–3 define the technology and functional baseline. Sections 4–6 are recommendations for planning and architecture, not additional confirmed requirements unless agreed. Items in Section 7 remain open and must be confirmed before implementing the related functionality. Any later change to baseline behavior should be agreed and recorded before implementation.