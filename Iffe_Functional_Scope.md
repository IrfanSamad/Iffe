## Functional Scope & Development Plan

### 1. Application Overview

The application will be developed using the following technology stack:

-   **Backend:** PHP 8.2+ Core
-   **Database:** MySQL 8
-   **Frontend:** Bootstrap 5 , esponsive
-   **UI/UX:** Modern, responsive interface for desktop, tablet, and mobile devices

## 2. Confirmed Application Modules

  -----------------------------------------------------------------------
  \#                      Module                  Submodules / Key
                                                  Features
  ----------------------- ----------------------- -----------------------
  1                       Customer Management     Customer profiles,
                                                  contact details, and
                                                  city

  2                       Product Management      Ingredients,
                                                  BOM/Recipes, Costing,
                                                  and Weight-based
                                                  Pricing

  3                       Sales Management        Quick Quote, Cost
                                                  Calculation, and
                                                  Quotation Management

  4                       Vendor Management       Vendor profiles,
                                                  addresses, banking, and
                                                  NTN

  5                       Company Management      Company profile,
                                                  address, NTN, banking,
                                                  and contact details
  -----------------------------------------------------------------------

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

  Weight Range   Pricing
  -------------- --------------
  1--5 KG        Configurable
  6--10 KG       Configurable
  11--15 KG      Configurable
  16--20 KG      Configurable
  21--30 KG      Configurable
  Above 30 KG    Configurable

**Configuration note:** Pricing slabs should be configurable rather than
hardcoded. The original ranges included an overlap at 20 KG (16--20 KG
and 20--30 KG). This specification uses 21--30 KG to avoid the overlap;
confirm the intended boundary before implementation.

### 3.3 Sales Management

#### 3.3.1 Quick Quote

The Quick Quote module should capture the following information:

  \#   Field
  ---- ---------------------
  1    Date and Time Stamp
  2    Customer
  3    Product
  4    Quantity Range
  5    Actual Quantity
  6    Total Quantity
  7    Total Units
  8    ML / G
  9    Per Unit
  10   Labour Cost
  11   Design Cost
  12   Bottle / Jar / Tube
  13   Label Cost
  14   Box Cost
  15   Carton
  16   Transportation
  17   Per Unit Cost
  18   Total Cost

Recommended quotation functionality:

-   Customer selection
-   Product and recipe selection
-   Quantity and weight selection
-   Automatic costing
-   Quotation PDF generation
-   Quotation approval workflow
-   Quotation history

#### 3.3.2 Cost Calculation

The system should calculate and present:

1.  Ingredient cost
2.  Labour cost
3.  Design cost
4.  Bottle / Jar / Tube cost
5.  Label cost
6.  Box cost
7.  Carton cost
8.  Transportation cost
9.  Total production cost
10. Per-unit cost
11. Selling price
12. Profit amount and profit margin

The costing formula and profit calculation method should be confirmed
before implementation. The system should clearly distinguish cost,
selling price, and profit.

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

  Phase     Development Scope
  --------- --------------------------------------------
  Phase 1   Login, Dashboard, User Roles & Permissions
  Phase 2   Customer, Vendor & Company Management
  Phase 3   Ingredient Management
  Phase 4   Product, BOM & Recipe Management
  Phase 5   Costing & Weight-Based Pricing
  Phase 6   Quick Quote & PDF Generation
  Phase 7   Approval Workflow & Reports

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

The following points should be confirmed to avoid assumptions during
implementation:

1.  Whether the same contact can be both a customer and a vendor.
2.  Whether weight-based price slabs should be configurable by
    administrators.
3.  Whether the 20 KG boundary belongs to the 16--20 KG slab or the next
    slab.
4.  Whether recipe quantities are entered in KG, grams, or both.
5.  The required method for calculating profit and selling price.
6.  Who can approve quotations and whether approval limits are required.
7.  Whether quotations should support multiple products.
8.  Whether multiple companies and currencies are required.
9.  Whether taxes should be included in quotation costing.
10. Whether quotation revisions and expiry dates are required.

## 8. Functional Baseline

This document defines the initial functional scope for the Iffi ERP & Business Application. The modules and requirements
listed above will serve as the baseline for detailed database design,
UI/UX development, and implementation. Items listed in the decision
section should be finalized before the related functionality is
developed.