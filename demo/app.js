/* Iffe ERP browser-only prototype. All records live in memory and reset on refresh. */
(() => {
  const companies = [
    { name: "Iffe Naturals (Pvt.) Ltd.", city: "Lahore", ntn: "7128456-2", phone: "+92 42 3576 8012", email: "hello@Iffenaturals.pk", bank: "HBL — Gulberg Branch", country: "Pakistan", address: "28-B, Gulberg III, Lahore" },
    { name: "Iffe Labs", city: "Karachi", ntn: "4382190-8", phone: "+92 21 3452 0090", email: "ops@Iffelabs.pk", bank: "Meezan Bank", country: "Pakistan", address: "Suite 402, Clifton, Karachi" }
  ];
  let activeCompany = companies[0];
  const customers = [
    { name:"Sana Beauty Co.", number:"CUS-00031", email:"orders@sanabeauty.pk", city:"Lahore", status:"Active", quotes:5 },
    { name:"The Botanica Store", number:"CUS-00028", email:"procurement@botanica.pk", city:"Islamabad", status:"Active", quotes:3 },
    { name:"Glow & Grace", number:"CUS-00024", email:"hello@glowgrace.pk", city:"Karachi", status:"Active", quotes:4 },
    { name:"Nura Organics", number:"CUS-00019", email:"team@nura.pk", city:"Faisalabad", status:"Active", quotes:2 },
    { name:"Olive & Oak Retail", number:"CUS-00015", email:"buying@oliveoak.pk", city:"Lahore", status:"Archived", quotes:1 }
  ];
  const vendors = [
    { name:"Pak Aroma Ingredients", number:"VEN-00016", email:"sales@pakaroma.com", city:"Lahore", phone:"+92 42 3722 4018", bank:"UBL", country:"Pakistan", ntn:"3276154-1", status:"Active" },
    { name:"PureChem Traders", number:"VEN-00012", email:"orders@purechem.pk", city:"Karachi", phone:"+92 21 3231 6670", bank:"Bank Alfalah", country:"Pakistan", ntn:"7120669-8", status:"Active" },
    { name:"GlassPak Packaging", number:"VEN-00009", email:"info@glasspak.pk", city:"Gujranwala", phone:"+92 55 325 9980", bank:"HBL", country:"Pakistan", ntn:"1849320-4", status:"Active" },
    { name:"LabelCraft", number:"VEN-00006", email:"hello@labelcraft.pk", city:"Lahore", phone:"+92 42 3588 2160", bank:"Meezan Bank", country:"Pakistan", ntn:"6931208-2", status:"Active" }
  ];
  const ingredients = [
    { name:"Aloe Vera Extract", code:"ING-0018", price:1850, vendor:"Pak Aroma Ingredients", updated:"18 Nov 2026", status:"Active" },
    { name:"Shea Butter (Refined)", code:"ING-0015", price:2640, vendor:"PureChem Traders", updated:"16 Nov 2026", status:"Active" },
    { name:"Jojoba Oil", code:"ING-0012", price:4280, vendor:"Pak Aroma Ingredients", updated:"12 Nov 2026", status:"Active" },
    { name:"Vitamin E (Tocopherol)", code:"ING-0009", price:6900, vendor:"PureChem Traders", updated:"10 Nov 2026", status:"Active" },
    { name:"Lavender Essential Oil", code:"ING-0007", price:8750, vendor:"Pak Aroma Ingredients", updated:"08 Nov 2026", status:"Active" },
    { name:"Glycerin, Vegetable", code:"ING-0004", price:720, vendor:"PureChem Traders", updated:"02 Nov 2026", status:"Active" }
  ];
  const products = [
    { name:"Botanical Glow Serum", code:"PRD-0011", category:"Skincare", recipe:"RC-0011 · v3", cost:412, unitPrice:748, status:"Approved" },
    { name:"Aloe Daily Moisturizer", code:"PRD-0008", category:"Skincare", recipe:"RC-0008 · v2", cost:286, unitPrice:768, status:"Approved" },
    { name:"Lavender Hand Cream", code:"PRD-0005", category:"Body care", recipe:"RC-0005 · v1", cost:198, unitPrice:652.5, status:"In review" },
    { name:"Rose Hydration Mist", code:"PRD-0003", category:"Skincare", recipe:"RC-0003 · v4", cost:154, unitPrice:489.17, status:"Approved" }
  ];
  let roles = [
    { name:"Administrator", users:2, permissions:["All modules","User management","Role management","Approvals"] },
    { name:"Sales Manager", users:3, permissions:["Customers","Quotations","Invoices","PDF documents"] },
    { name:"Accounts", users:2, permissions:["Invoices","Payments","Financial reports"] },
    { name:"Inventory", users:1, permissions:["Ingredients","Products","Weight pricing"] }
  ];
  let users = [
    { name:"Ayesha Siddiqui", email:"ayesha@Iffenaturals.pk", role:"Administrator", company:"Iffe Naturals (Pvt.) Ltd.", status:"Active", initials:"AS" },
    { name:"Hamza Ali", email:"hamza@Iffenaturals.pk", role:"Sales Manager", company:"Iffe Naturals (Pvt.) Ltd.", status:"Active", initials:"HA" },
    { name:"Mariam Khan", email:"mariam@Iffenaturals.pk", role:"Accounts", company:"Iffe Naturals (Pvt.) Ltd.", status:"Active", initials:"MK" },
    { name:"Usman Tariq", email:"usman@Iffelabs.pk", role:"Inventory", company:"Iffe Labs", status:"Inactive", initials:"UT" }
  ];
  const slabs = [
    { min:1,max:5,label:"1–5 kg",unit:790 },
    { min:6,max:10,label:"6–10 kg",unit:720 },
    { min:11,max:15,label:"11–15 kg",unit:675 },
    { min:16,max:20,label:"16–20 kg",unit:640 },
    { min:21,max:30,label:"21–30 kg",unit:610 },
    { min:31,max:9999,label:"Above 30 kg",unit:580 }
  ];
  let quotes = [
    { ref:"QT-2026-0048", customer:"Sana Beauty Co.", product:"Botanical Glow Serum", quantity:10, units:100, date:"18 Nov 2026", total:74800, status:"Submitted", recipe:"Botanical Glow Serum" },
    { ref:"QT-2026-0047", customer:"The Botanica Store", product:"Aloe Daily Moisturizer", quantity:5, units:50, date:"17 Nov 2026", approvedAt:"2026-11-17T11:00:00", total:38400, status:"Approved", recipe:"Aloe Daily Moisturizer" },
    { ref:"QT-2026-0046", customer:"Glow & Grace", product:"Lavender Hand Cream", quantity:8, units:80, date:"16 Nov 2026", total:52200, status:"Draft", recipe:"Lavender Hand Cream" },
    { ref:"QT-2026-0045", customer:"Sana Beauty Co.", product:"Botanical Glow Serum", quantity:6, units:60, date:"13 Nov 2026", approvedAt:"2026-11-13T10:00:00", total:45900, status:"Approved", recipe:"Botanical Glow Serum" },
    { ref:"QT-2026-0044", customer:"Nura Organics", product:"Rose Hydration Mist", quantity:12, units:120, date:"12 Nov 2026", total:58700, status:"Rejected", recipe:"Rose Hydration Mist" }
  ];
  let quickQuotes = [
    { ref:"QQ-2026-0003", customer:"Sana Beauty Co.", product:"Botanical Glow Serum", quantity:10, units:100, date:"18 Nov 2026", approvedAt:"2026-11-18T10:30:00", total:74800, ingredientCost:41200, productionPackagingCost:17900, totalCost:59100, labour:1800, design:500, packaging:9000, label:1200, box:1800, carton:2600, transport:1000, status:"Approved", recipe:"Botanical Glow Serum", items:[{product:"Botanical Glow Serum",units:100,size:100,sizeUnit:"ml",wastage:0,quantity:10,unitPrice:748,priceChoice:"product",total:74800}] },
    { ref:"QQ-2026-0002", customer:"The Botanica Store", product:"Aloe Daily Moisturizer", quantity:5, units:50, date:"17 Nov 2026", approvedAt:"2026-11-17T11:00:00", total:38400, ingredientCost:14300, productionPackagingCost:10250, totalCost:24550, labour:1000, design:300, packaging:5000, label:800, box:900, carton:1500, transport:750, status:"Approved", recipe:"Aloe Daily Moisturizer", items:[{product:"Aloe Daily Moisturizer",units:50,size:100,sizeUnit:"ml",wastage:0,quantity:5,unitPrice:768,priceChoice:"product",total:38400}] }
  ];
  let salesOrders = [];
  let invoices = [
    { no:"INV-2026-0028", customer:"The Botanica Store", date:"10 Nov 2026", due:"10 Dec 2026", total:38400, paid:20000, status:"Partially Paid", item:"Aloe Daily Moisturizer · 50 units" },
    { no:"INV-2026-0027", customer:"Sana Beauty Co.", date:"02 Nov 2026", due:"02 Dec 2026", total:74800, paid:74800, status:"Paid", item:"Botanical Glow Serum · 100 units" },
    { no:"INV-2026-0026", customer:"Glow & Grace", date:"28 Oct 2026", due:"12 Nov 2026", total:52200, paid:0, status:"Overdue", item:"Lavender Hand Cream · 80 units" },
    { no:"INV-2026-0025", customer:"Nura Organics", date:"21 Oct 2026", due:"20 Nov 2026", total:58700, paid:0, status:"Issued", item:"Rose Hydration Mist · 120 units" }
  ];
  let payments = [
    { ref:"PAY-2026-0033", date:"14 Nov 2026", party:"Sana Beauty Co.", invoice:"INV-2026-0027", method:"Bank transfer", amount:74800, status:"Confirmed" },
    { ref:"PAY-2026-0031", date:"13 Nov 2026", party:"The Botanica Store", invoice:"INV-2026-0028", method:"Cheque", amount:20000, status:"Confirmed" },
    { ref:"PAY-2026-0029", date:"06 Nov 2026", party:"Pak Aroma Ingredients", invoice:"Vendor payment", method:"Bank transfer", amount:32500, status:"Confirmed", type:"Vendor" }
  ];
  let currentPage = "dashboard";
  let selectedInvoice = null;
  let quickQuoteViewRef = "";
  let quotationViewRef = "";
  let quotationEditRef = null;
  let ingredientRows = [];
  let quoteProductRows = [];
  let quotationDraft = null;
  let toastBootstrap;
  const app = document.getElementById("app");
  const money = n => "Rs " + Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits:0 });
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const statusClass = s => ({ "Approved":"", "Paid":"", "Confirmed":"", "Active":"", "Submitted":"warning", "Partially Paid":"warning", "In review":"info", "Issued":"info", "Draft":"neutral", "Archived":"neutral", "Overdue":"danger", "Rejected":"danger", "Reversed":"danger", "Cancelled":"neutral" }[s] ?? "neutral");
  const statusPill = s => `<span class="status ${statusClass(s)}"><span>●</span>${esc(s)}</span>`;
  const selectOptions = (items, selected) => items.map(v => `<option ${v===selected?"selected":""}>${esc(v)}</option>`).join("");
  function showToast(message) {
    const node = document.createElement("div");
    node.className = "toast align-items-center text-bg-white";
    node.setAttribute("role","status");
    node.innerHTML = `<div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle-fill text-success me-2"></i>${esc(message)}</div><button class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    document.getElementById("toast-container").appendChild(node);
    const toast = new bootstrap.Toast(node,{delay:2600}); toast.show();
    node.addEventListener("hidden.bs.toast",()=>node.remove());
  }
  function navItem(id,label,icon) { return `<a class="nav-link ${currentPage===id?"active":""}" data-page="${id}"><i class="bi ${icon}"></i><span>${label}</span></a>`; }
  function appShell(content) {
    app.innerHTML = `<div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand"><div class="brand-mark">i</div><div><div class="brand-name">Iffe</div><div class="brand-tag">Business workspace</div></div></div>
        <div class="side-nav">
          <div class="nav-caption">Workspace</div>${navItem("dashboard","Overview","bi-grid-1x2")}
          <div class="nav-caption">Sales & finance</div>${navItem("quickquotes","Quick Quote","bi-lightning-charge")}${navItem("quotations","Quotations","bi-file-earmark-text")}${navItem("salesorders","Sales Orders","bi-cart-check")}${navItem("invoices","Invoices","bi-receipt")}${navItem("payments","Payments","bi-wallet2")}
          <div class="nav-caption">Catalogue</div>${navItem("customers","Customers","bi-people")}${navItem("vendors","Vendors","bi-truck")}${navItem("products","Products & recipes","bi-box-seam")}${navItem("ingredients","Ingredients","bi-droplet")}${navItem("slabs","Weight pricing","bi-sliders")}
          <div class="nav-caption">Administration</div>${navItem("companies","Companies","bi-buildings")}
          ${navItem("users","Users & roles","bi-person-gear")}
        </div>
        <div class="side-bottom"><div class="workspace-note"><div class="avatar">AS</div><div><div style="font-size:11px;font-weight:700">Ayesha Siddiqui</div><div style="font-size:10px;color:#87928c">Company administrator</div></div><i class="bi bi-three-dots ms-auto text-secondary"></i></div></div>
      </aside>
      <main class="main-area">
        <header class="topbar"><div class="top-left"><button class="icon-btn mobile-menu" id="mobile-menu" aria-label="Toggle menu"><i class="bi bi-list"></i></button><select class="company-select" id="company-select" aria-label="Active company">${companies.map((c,i)=>`<option value="${i}" ${c===activeCompany?"selected":""}>${esc(c.name)}</option>`).join("")}</select><span class="date-label"><i class="bi bi-calendar3 me-1"></i> Wednesday, 18 November 2026</span></div>
          <div class="top-right"><button class="icon-btn" title="Notifications" id="notifications"><i class="bi bi-bell"></i></button><div class="user-chip"><div class="avatar">AS</div><div class="top-user-name"><div style="font-size:11px;font-weight:700">Ayesha Siddiqui</div><div style="font-size:10px;color:#87928c">Administrator</div></div><button class="icon-btn" id="logout" title="Log out"><i class="bi bi-box-arrow-right"></i></button></div></div>
        </header><div class="content ${["newquickquote","newquotation","quickquoteview"].includes(currentPage)?"content-quickquote":""}">${content}</div>
      </main>
    </div>`;
    app.querySelectorAll("[data-page]").forEach(el => el.addEventListener("click",()=>navigate(el.dataset.page)));
    document.getElementById("company-select").addEventListener("change",e=>{activeCompany=companies[Number(e.target.value)];currentPage="dashboard";render();showToast(`Switched workspace to ${activeCompany.name}`);});
    document.getElementById("mobile-menu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
    document.getElementById("logout").addEventListener("click",renderLogin);
    document.getElementById("notifications").addEventListener("click",()=>showToast("You're all caught up."));
  }
  function navigate(page) { currentPage=page; selectedInvoice=null; render(); window.scrollTo({top:0,behavior:"smooth"}); }
  function renderQuoteAndFocus(selector,index=0) {
    render();
    const target=document.querySelectorAll(selector)[index];
    if(target&&!target.disabled)target.focus();
  }
  function heading(eyebrow,title,subtitle,action="") { return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action}</div>`; }
  function pageAction(label,icon,id) { return `<button class="btn btn-primary" id="${id}"><i class="bi ${icon} me-1"></i>${label}</button>`; }
  function dashboard() {
    const pending=quotes.filter(q=>q.status==="Submitted").length;
    return `${heading("Wednesday, 18 November 2026","Good morning, Ayesha <span style='color:var(--green)'>👋</span>","Here’s what’s happening across your business today.",pageAction("Create quick quote","bi-plus-lg","dash-quote"))}
      <div class="stat-grid">
        ${statCard("Customers",customers.length,"bi-people","+2 this month","up")}${statCard("Vendors",vendors.length,"bi-truck","Across 4 categories","")}
        ${statCard("Ingredients",ingredients.length,"bi-droplet","2 price updates this week","")}${statCard("Products",products.length,"bi-box-seam","3 approved recipes","")}
      </div>
      <div class="stat-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-top:-5px">
        ${statCard("Pending quotations",pending,"bi-file-earmark-text","Needs review","up")}${statCard("Approved this month","12","bi-patch-check","Rs 486,200 total","")}
        ${statCard("Outstanding invoices",money(128900),"bi-receipt","3 invoices due","")}${statCard("Received this month",money(193500),"bi-wallet2","+12.8% vs last month","up")}
      </div>
      <div class="dashboard-grid">
        <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Sales overview</h3><div class="panel-sub">Quotation value · last 6 months</div></div><div class="chart-legend"><span><i class="legend-dot"></i>Quoted</span><span><i class="legend-dot gold"></i>Invoiced</span></div></div>
          <div class="chart-area"><div class="bar-chart">${[[45,27],[63,39],[51,34],[76,54],[66,43],[91,68]].map(v=>`<div class="bar-group"><div class="bar" style="height:${v[0]}%"></div><div class="bar alt" style="height:${v[1]}%"></div></div>`).join("")}</div><div class="chart-labels"><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span></div></div></section>
        <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Recent activity</h3><div class="panel-sub">Latest updates in your workspace</div></div><button class="btn btn-light" id="activity-view">View all</button></div>
          <div class="activity-list">${activity("bi-file-earmark-plus","<b>New quotation</b> QT-2026-0048 created for Sana Beauty Co.","10 min ago")}${activity("bi-wallet2","<b>Payment received</b> Rs 20,000 from The Botanica Store.","2 hours ago")}${activity("bi-droplet","<b>Ingredient price updated</b> Aloe Vera Extract · Rs 1,850/kg","Yesterday")}${activity("bi-patch-check","<b>Quotation approved</b> QT-2026-0047 is ready for a sales order.","Yesterday")}</div></section>
      </div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Recent quotations</h3><div class="panel-sub">Track your latest sales opportunities</div></div><button class="btn btn-light" id="all-quotes">View quotations <i class="bi bi-arrow-right ms-1"></i></button></div>${quoteTable(quotes.slice(0,4))}</section>`;
  }
  function statCard(label,value,icon,foot,trend) { return `<div class="card-panel stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon"><i class="bi ${icon}"></i></span></div><div class="stat-value">${value}</div><div class="stat-foot">${trend?`<span class="trend"><i class="bi bi-arrow-up-right"></i> ${foot.split(" ")[0]}</span>${foot.substring(foot.indexOf(" "))}`:foot}</div></div>`; }
  function activity(icon,text,time) { return `<div class="activity-item"><div class="activity-icon"><i class="bi ${icon}"></i></div><div class="activity-copy">${text}</div><span class="activity-time">${time}</span></div>`; }
  function quoteTable(rows) {
    return `<div class="table-wrap"><table class="table" id="quotation-table"><thead><tr><th>Quotation</th><th>Customer</th><th>Product</th><th>Date</th><th>Value</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(q=>{
      const order=salesOrders.find(o=>o.quoteRef===q.ref);
      return `<tr><td><span class="table-name">${q.ref}</span>${q.sourceQuickQuote?`<span class="table-muted">From ${esc(q.sourceQuickQuote)}</span>`:""}</td><td>${esc(q.customer)}</td><td>${esc(q.product)}</td><td>${q.date}</td><td class="table-name">${money(q.total)}</td><td>${statusPill(q.status)}</td><td><div class="d-flex gap-1"><button class="btn btn-light quote-view" data-ref="${q.ref}">View</button><button class="btn btn-light quote-pdf" data-ref="${q.ref}" title="Generate PDF"><i class="bi bi-file-earmark-pdf me-1"></i>PDF</button>${q.status==="Draft"?`<button class="btn btn-light quote-submit" data-ref="${q.ref}">Submit</button>`:""}${q.status==="Submitted"?`<button class="btn btn-light quote-approve" data-ref="${q.ref}">Approve</button>`:""}${q.status==="Approved"?(order?`<button class="btn btn-light" disabled>${order.no}</button>`:`<button class="btn btn-primary quote-sales-order" data-ref="${q.ref}">Create sales order</button>`):""}</div></td></tr>`;
    }).join("")}</tbody></table></div>`;
  }
  function quickQuoteTable(rows) {
    return `<div class="table-wrap"><table class="table" id="quotation-table"><thead><tr><th>Quick Quote</th><th>Customer</th><th>Product</th><th>Date</th><th>Value</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(q=>`<tr><td><span class="table-name">${q.ref}</span></td><td>${esc(q.customer)}</td><td>${esc(q.product)}</td><td>${q.date}</td><td class="table-name">${money(q.total)}</td><td>${statusPill(q.status)}</td><td><div class="d-flex gap-1"><button class="btn btn-light quickquote-view" data-ref="${q.ref}">View</button>${q.status==="Draft"?`<button class="btn btn-light quickquote-submit" data-ref="${q.ref}">Submit</button>`:""}${q.status==="Submitted"?`<button class="btn btn-light quickquote-approve" data-ref="${q.ref}">Approve</button>`:""}${q.status==="Approved"?`<button class="btn btn-primary quickquote-create-quotation" data-ref="${q.ref}">Create quotation</button>`:""}</div></td></tr>`).join("")}</tbody></table></div>`;
  }
  function genericListPage(kind) {
    const config={
      customers:{title:"Customer Management",sub:"Manage customer profiles and follow their quotation history.",data:customers,cols:["Customer","Customer no.","Email","City","Quotes","Status"],action:"Add customer"},
      vendors:{title:"Vendor Management",sub:"Keep your vendor contacts and business details up to date.",data:vendors,cols:["Vendor","Vendor no.","Email","City","Phone","Status"],action:"Add vendor"},
      companies:{title:"Company Management",sub:"Manage company profiles and the details used on business documents.",data:companies,cols:["Company","NTN","Email","City","Phone","Country"],action:"Add company"}
    }[kind];
    const rows=config.data.map(x=>{
      if(kind==="customers") return [x.name,x.number,x.email,x.city,x.quotes,statusPill(x.status)];
      if(kind==="vendors") return [x.name,x.number,x.email,x.city,x.phone,statusPill(x.status)];
      return [x.name,x.ntn,x.email,x.city,x.phone,x.country];
    });
    const headers=`<tr>${config.cols.map(x=>`<th>${x}</th>`).join("")}<th></th></tr>`;
    return `${heading("Administration",config.title,config.sub,pageAction(config.action,"bi-plus-lg","add-record"))}
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">${config.data.length} records</h3><div class="panel-sub">Search, view and maintain your ${kind}</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input id="record-search" class="form-control" placeholder="Search ${kind}..."></div><button class="btn btn-light" id="export-list"><i class="bi bi-download me-1"></i>Export</button></div></div>
      <div class="table-wrap"><table class="table" id="records-table"><thead>${headers}</thead><tbody>${rows.map((r,i)=>`<tr>${r.map((v,j)=>`<td>${j===0?`<span class="table-name">${esc(v)}</span>`:v}</td>`).join("")}<td><button class="icon-btn record-view" data-index="${i}" title="View details"><i class="bi bi-arrow-up-right"></i></button></td></tr>`).join("")}</tbody></table></div></section>
      ${kind==="customers"?`<div class="help-copy mt-3"><i class="bi bi-info-circle me-1"></i>Archived customers remain available in transaction history and can’t be hard-deleted.</div>`:""}`;
  }
  function catalogPage(kind) {
    if(kind==="ingredients") return `${heading("Catalogue","Ingredient management","Manage your raw materials, vendor pricing and price history.",pageAction("Add ingredient","bi-plus-lg","add-ingredient"))}
      <div class="d-flex gap-2 flex-wrap mb-3"><div class="card-panel mini-kpi"><div class="mini-kpi-label">Active ingredients</div><div class="mini-kpi-value">${ingredients.length}</div></div><div class="card-panel mini-kpi"><div class="mini-kpi-label">Price updates this month</div><div class="mini-kpi-value">8</div></div><div class="card-panel mini-kpi"><div class="mini-kpi-label">Linked vendors</div><div class="mini-kpi-value">2</div></div></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Ingredients</h3><div class="panel-sub">Prices shown in PKR per kilogram · latest vendor price</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search ingredients..."></div><button class="btn btn-light" id="price-history"><i class="bi bi-clock-history me-1"></i>Price history</button></div></div>
      <div class="table-wrap"><table class="table" id="records-table"><thead><tr><th>Ingredient</th><th>Code</th><th>Price / kg</th><th>Vendor</th><th>Last updated</th><th>Status</th><th></th></tr></thead><tbody>${ingredients.map((x,i)=>`<tr><td class="table-name">${x.name}</td><td>${x.code}</td><td class="table-name">${money(x.price)}</td><td>${x.vendor}</td><td>${x.updated}</td><td>${statusPill(x.status)}</td><td><button class="icon-btn ingredient-edit" data-index="${i}"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div></section>`;
    if(kind==="products") return `${heading("Catalogue","Products & recipes","Build approved BOMs and understand ingredient cost at a glance.",pageAction("New recipe","bi-plus-lg","new-recipe"))}
      <div class="d-flex gap-2 mb-3"><button class="btn btn-primary" id="product-tab">Products & recipes</button></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Product catalogue</h3><div class="panel-sub">Products link to versioned, costed ingredient recipes</div></div><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search products..."></div></div>
      <div class="table-wrap"><table class="table" id="records-table"><thead><tr><th>Product</th><th>Code</th><th>Category</th><th>Recipe version</th><th>Cost / unit</th><th>Selling price / unit</th><th>Approval</th><th></th></tr></thead><tbody>${products.map((p,i)=>`<tr><td class="table-name">${p.name}</td><td>${p.code}</td><td>${p.category}</td><td>${p.recipe}</td><td class="table-name">${money(p.cost)}</td><td class="table-name">${money(p.unitPrice)}</td><td>${statusPill(p.status)}</td><td><button class="icon-btn product-edit" data-index="${i}" title="Edit recipe"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div></section>
      <div class="help-copy mt-3"><i class="bi bi-shield-check me-1"></i>Recipe edits create a new version. Approved recipes are preserved for quotation and audit history.</div>`;
  }
  function slabsPage() {
    return `${heading("Pricing configuration","Weight-based price slabs","Configure non-overlapping quantity ranges and their selling price per kilogram.",pageAction("Add price slab","bi-plus-lg","add-slab"))}
      <div class="alert alert-success py-2 px-3" style="font-size:11px;border:0;background:#eaf4ee;color:#356b50"><i class="bi bi-info-circle me-1"></i>Exactly one active slab is applied using the actual order weight. Prices are illustrative and configurable.</div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Active pricing schedule</h3><div class="panel-sub">PKR per kg · valid from 01 Oct 2026</div></div><span class="status">6 active slabs</span></div>
      <div class="table-wrap"><table class="table"><thead><tr><th>Quantity range</th><th>Lower bound</th><th>Upper bound</th><th>Price / kg</th><th>Effective from</th><th>Status</th><th></th></tr></thead><tbody>${slabs.map((s,i)=>`<tr><td><span class="slab-range">${s.label}</span></td><td>${s.min} kg</td><td>${s.max===9999?"No limit":s.max+" kg"}</td><td class="table-name">${money(s.unit)}</td><td>01 Oct 2026</td><td>${statusPill("Active")}</td><td><button class="icon-btn slab-edit" data-index="${i}"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div></section>
      <div class="help-copy mt-3"><i class="bi bi-exclamation-circle me-1"></i>Business confirmation is needed for the 20 kg boundary; current prototype assigns 20 kg to the 16–20 kg slab.</div>`;
  }
  function quickQuoteListPage() {
    return `${heading("Sales · Quick Quote","Quick Quote list","Review saved quick quotes or create a quotation for a customer.",pageAction("Add Quick Quote","bi-plus-lg","quickquote-add"))}
      <div class="filter-row mb-3"><div class="search-box"><i class="bi bi-search"></i><input id="record-search" class="form-control" placeholder="Search quick quotes..."></div><select class="form-select" id="status-filter" style="width:155px"><option>All statuses</option>${["Draft","Submitted","Approved","Rejected"].map(status=>`<option>${status}</option>`).join("")}</select></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Quick quote history</h3><div class="panel-sub">${quickQuotes.length} quick quotes</div></div></div>${quickQuoteTable(quickQuotes)}</section>`;
  }
  function quickQuoteViewPage() {
    const quickQuote=quickQuotes.find(q=>q.ref===quickQuoteViewRef);
    if(!quickQuote) return `${heading("Sales · Quick Quote","Quick Quote not found","The requested Quick Quote is no longer available.",`<button class="btn btn-light" id="quickquote-view-back"><i class="bi bi-arrow-left me-1"></i>Back to Quick Quotes</button>`)}`;
    const items=quickQuote.items?.length?quickQuote.items:[{product:quickQuote.product,quantity:quickQuote.quantity,units:quickQuote.units,unitPrice:quickQuote.units?quickQuote.total/quickQuote.units:quickQuote.total,total:quickQuote.total}];
    const costs=productionPackagingCosts(quickQuote);
    const totalUnits=items.reduce((sum,item)=>sum+(Number(item.units)||0),0);
    return `${heading("Sales · Quick Quote",quickQuote.ref,`${quickQuote.customer} · ${quickQuote.date}`,`<div class="quote-header-actions"><button class="btn btn-light" id="quickquote-view-back"><i class="bi bi-arrow-left me-1"></i>Back to Quick Quotes</button>${quickQuote.status==="Draft"?`<button class="btn btn-primary" id="quickquote-view-submit">Submit for approval</button>`:""}${quickQuote.status==="Submitted"?`<button class="btn btn-primary" id="quickquote-view-approve">Approve</button>`:""}${quickQuote.status==="Approved"?`<button class="btn btn-primary" id="quickquote-view-create-quotation">Create quotation</button>`:""}</div>`)}
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Quick Quote details</h3><div class="panel-sub">${esc(quickQuote.product)}</div></div>${statusPill(quickQuote.status)}</div>
        <div class="px-3 pb-3">
          <div class="detail-grid mb-4"><div class="detail-box"><div class="detail-label">Quick Quote reference</div><div class="detail-value">${esc(quickQuote.ref)}</div></div><div class="detail-box"><div class="detail-label">Customer</div><div class="detail-value">${esc(quickQuote.customer)}</div></div><div class="detail-box"><div class="detail-label">Total units</div><div class="detail-value">${totalUnits}</div></div></div>
          <div class="section-label">Selected product${items.length===1?"":"s"}</div>
          <div class="table-wrap line-items-box"><table class="table"><thead><tr><th>Product</th><th>Actual quantity</th><th>Units</th><th>Rate</th><th>Line total</th></tr></thead><tbody>${items.map(item=>`<tr><td class="table-name">${esc(item.product)}</td><td>${Number(item.quantity)||0} kg</td><td>${Number(item.units)||0}</td><td>${money(item.unitPrice)} / ${quotePriceBasis(item)}</td><td class="table-name">${money(Number(item.total)||quoteLineTotal(item))}</td></tr>`).join("")}</tbody></table></div>
          <div class="section-label mt-4">Production & packaging costs</div><div class="quote-cost-grid">${costs.map(cost=>`<div class="detail-box"><div class="detail-label">${cost.label}</div><div class="detail-value">${money(cost.value)}</div></div>`).join("")}</div>
          ${quickQuote.openField?`<div class="quote-section mt-3"><div class="form-label">Additional information / requirements</div><div class="help-copy">${esc(quickQuote.openField)}</div></div>`:""}
          <div class="quote-view-total"><span>Quick Quote total</span><strong>${money(quickQuote.total)}</strong></div>
        </div>
      </section>`;
  }
  function quickQuote() {
    if (window.quoteLoadedCustomer === undefined && !window.quoteDraft) window.quoteLoadedCustomer = null;
    const enteredCustomer=window.quoteDraft?.customer ?? (window.quoteLoadedCustomer===null?"":document.getElementById("quote-customer")?.value.trim()||"");
    const customer=customers.find(c=>c.status==="Active"&&c.name.toLowerCase()===enteredCustomer.toLowerCase())?.name||"";
    const data=window.quoteDraft || blankQuoteDraft("",Boolean(customer));
    if(!quoteProductRows.length) quoteProductRows=quoteRowsFromData(data);
    else quoteProductRows=quoteProductRows.slice(0,1);
    const ingredientCost=quoteProductRows.reduce((sum,row)=>{
      const p=products.find(x=>x.name===row.product);
      return p?sum+Math.round(p.cost*(Number(row.units)||0)):sum;
    },0);
    const labour=Number(data.labour)||0, design=Number(data.design)||0, packaging=Number(data.packaging)||0, label=Number(data.label)||0, box=Number(data.box)||0, carton=Number(data.carton)||0, transport=Number(data.transport)||0;
    const productionPackagingCost=labour+design+packaging+label+box+carton+transport;
    const total=ingredientCost+productionPackagingCost;
    const units=quoteProductRows.reduce((sum,row)=>sum+(Number(row.units)||0),0);
    const quantity=quoteProductRows.reduce((sum,row)=>sum+actualQuantity(row),0);
    const sellTotal=quoteProductRows.reduce((sum,row)=>sum+quoteLineTotal(row),0);
    const profit=sellTotal-total;
    const priceSlab=Array.from(new Set(quoteProductRows.map(row=>slabFor(actualQuantity(row))?.label||"No slab"))).join(", ");
    const priceSlabBadge=priceSlab==="No slab"?"":`<span class="ms-auto status">${esc(priceSlab)}</span>`;
    const productionCosts=[["Labour cost",labour],["Design cost",design],["Bottle / jar / tube cost",packaging],["Label cost",label],["Box cost",box],["Carton cost",carton],["Transportation",transport]];
    const latestApproved=latestApprovedQuote();
    return `${heading("Sales · Quick Quote","Create Quick Quote","Select a customer to start a new Quick Quote, then add products and costs.",`<div class="quote-header-actions"><button class="btn btn-light" id="quickquote-back"><i class="bi bi-arrow-left me-1"></i>Back to list</button><button class="btn btn-light" id="reset-quote"><i class="bi bi-arrow-counterclockwise me-1"></i>Reset</button><button class="btn btn-primary" id="save-quote" ${customer?"":"disabled"}>SAVE</button></div>`)}
      <div class="quote-layout"><section class="card-panel">
        <div class="quote-section"><div class="section-label"><span class="section-number">1</span>Customer & product</div><div class="row g-3">
          <div class="col-md-6"><label class="form-label" for="quote-customer">Customer <span class="text-danger">*</span></label><input class="form-control" id="quote-customer" list="quote-customer-options" value="${esc(customer)}" placeholder="Search customers..." autocomplete="off" required><datalist id="quote-customer-options">${customers.filter(c=>c.status==="Active").map(c=>`<option value="${esc(c.name)}"></option>`).join("")}</datalist><div class="form-hint">${customer?"Customer selected. Add products and enter quantities and costs.":"Select a customer to enable quotation entry."}</div></div>
          <div class="col-md-6"><label class="form-label">Quote date & time</label><input class="form-control readonly" value="18 Nov 2026 · 05:09 PM" readonly tabindex="-1"></div>
          <div class="col-12">
            <div class="quote-entry-columns">
              <div class="quote-entry-product">
                <div class="split-heading mb-2"><div><div class="form-label mb-0">Products</div><div class="form-hint">Weight selects the price slab. Actual quantity = (units × ML/G + wastage in grams) ÷ 1,000.</div></div></div>
                <div id="quote-product-rows"></div>
              </div>
              <div class="quote-entry-costs">
                <div class="section-label"><span class="section-number">2</span>Production & packaging costs ${priceSlabBadge}</div>
                <div class="quote-cost-grid">
                  ${costInput("Labour cost","labour",data.labour??"",!customer)}${costInput("Design cost","design",data.design??"",!customer)}${costInput("Bottle / jar / tube cost","packaging",data.packaging??"",!customer)}${costInput("Label cost","label",data.label??"",!customer)}${costInput("Box cost","box",data.box??"",!customer)}${costInput("Carton cost","carton",data.carton??"",!customer)}${costInput("Transportation","transport",data.transport??"",!customer)}
                </div>
              </div>
            </div>
            <div class="detail-grid quote-total-metrics mt-3"><div class="detail-box"><div class="detail-label">Total quantity</div><div class="detail-value">${quantity.toFixed(3)} kg</div></div><div class="detail-box"><div class="detail-label">Total units</div><div class="detail-value">${units}</div></div><div class="detail-box"><div class="detail-label">Total cost</div><div class="detail-value">${money(total)}</div></div></div>
          </div>
        </div></div>
        <div class="quote-section"><label class="form-label" for="quote-open-field">Open description / additional requirement</label><textarea class="form-control" id="quote-open-field" rows="3" placeholder="Enter custom product details, specifications, special instructions or an additional requirement" ${customer?"":"disabled"}>${esc(data.openField||"")}</textarea></div>
      </section>
      <aside class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Quotation summary</h3><div class="panel-sub">Estimate · ex. tax</div></div><i class="bi bi-receipt text-success fs-5"></i></div>
        <div class="px-3 pb-3">
          ${productionCosts.map(([label,value])=>`<div class="total-row"><span>${label}</span><b>${money(value)}</b></div>`).join("")}
          <div class="total-row total-cost"><span>Production & packaging total</span><b>${money(productionPackagingCost)}</b></div>
          <div class="total-row"><span>Per-unit cost</span><b>${money(units?total/units:0)}</b></div><div class="total-row"><span>Average selling price / unit</span><b>${money(units?sellTotal/units:0)}</b></div><div class="total-row grand"><span>Quotation total<br><small>${units} units · ${quantity.toFixed(3)} kg</small></span><strong>${money(sellTotal)}</strong></div>
          <div class="quote-summary-profit mt-3 pt-2"><span>Estimated profit</span><b class="${profit<0?"text-danger":"text-success"}">${money(profit)} (${sellTotal?Math.round(profit/sellTotal*100):0}%)</b></div>
        </div>
        <section class="latest-approved-quote mx-3 mb-3">
          <div class="latest-approved-heading"><span class="latest-approved-icon"><i class="bi bi-patch-check"></i></span><div><div class="detail-label">Latest approved quotation</div><div class="table-name">${latestApproved?esc(latestApproved.ref):"No approved quotations"}</div></div></div>
          ${latestApproved?`<div class="latest-approved-details"><span>${esc(latestApproved.customer)}</span><strong>${money(latestApproved.total)}</strong></div><div class="help-copy">${esc(latestApproved.product)} · ${latestApproved.date}</div><button type="button" class="btn btn-light btn-sm mt-2" id="latest-approved-open">View approved quotations <i class="bi bi-arrow-up-right ms-1"></i></button>`:`<div class="help-copy">Approved quotations will appear here for quick reference.</div>`}
        </section>
      </aside></div>`;
  }
  function newQuotationPage() {
    if(!quotationDraft) quotationDraft={customer:"",quickQuoteRef:"",extraInfo:""};
    const editingQuote=quotationEditRef?quotes.find(q=>q.ref===quotationEditRef):null;
    const editing=Boolean(editingQuote);
    const enteredCustomer=quotationDraft.customer.trim();
    const customer=customers.find(c=>c.status==="Active"&&c.name.toLowerCase()===enteredCustomer.toLowerCase())?.name||"";
    const approvedQuickQuotes=quickQuotes.filter(q=>q.status==="Approved"&&q.customer===customer);
    const sourceRef=editingQuote?.sourceQuickQuote||quotationDraft.quickQuoteRef;
    const source=approvedQuickQuotes.find(q=>q.ref===sourceRef);
    const items=quotationDraft.items||[];
    const total=items.reduce((sum,item)=>sum+quoteLineTotal(item),0);
    return `${heading("Sales · Quotations",editing?"Edit Quotation":"Create Quotation",editing?`${editingQuote.ref} · Changes are allowed until approval.`:"Select an approved Quick Quote and the products to include. Quick Quote costs are not copied.",`<div class="quote-header-actions"><button class="btn btn-light" id="quotation-back"><i class="bi bi-arrow-left me-1"></i>${editing?"Back to quotation":"Back to quotations"}</button>${editing?"":`<button class="btn btn-light" id="quotation-reset"><i class="bi bi-arrow-counterclockwise me-1"></i>Reset</button>`}<button class="btn btn-primary" id="save-formal-quotation" ${source||editing?"":"disabled"}>${editing?"Save changes":"Save Quotation"}</button></div>`)}
      <section class="card-panel">
        <div class="quote-section"><div class="section-label"><span class="section-number">1</span>Customer & Quick Quote reference</div><div class="row g-3">
          <div class="col-md-6"><label class="form-label" for="quotation-customer">Customer <span class="text-danger">*</span></label><input class="form-control" id="quotation-customer" list="quotation-customer-options" value="${esc(customer)}" placeholder="Search customers..." autocomplete="off" ${editing?"disabled":""} required><datalist id="quotation-customer-options">${customers.filter(c=>c.status==="Active").map(c=>`<option value="${esc(c.name)}"></option>`).join("")}</datalist></div>
          <div class="col-md-6"><label class="form-label" for="quotation-source-quickquote">Quick Quote reference ${editing?"":`<span class="text-danger">*</span>`}</label>${editing?`<input class="form-control" value="${esc(editingQuote.sourceQuickQuote||"Legacy quotation — no Quick Quote reference")}" disabled>`:`<select class="form-select" id="quotation-source-quickquote" ${customer?"":"disabled"}><option value="">${customer?"Select an approved Quick Quote":"Select a customer first"}</option>${approvedQuickQuotes.map(q=>`<option value="${q.ref}" ${source?.ref===q.ref?"selected":""}>${q.ref} · ${esc(q.product)}</option>`).join("")}</select>`}<div class="form-hint">${!editing&&customer&&!approvedQuickQuotes.length?"No approved Quick Quotes are available for this customer.":""}</div></div>
        </div></div>
        <div class="quote-section"><div class="section-label"><span class="section-number">2</span>Quotation products</div>
              ${source||editing?`<div class="quotation-product-list">${items.map((item,index)=>quotationProductRow(item,index,items.length)).join("")}</div><div class="quotation-product-actions"><button type="button" class="btn btn-light" id="quotation-add-product"><i class="bi bi-plus-lg me-1"></i>Add a product</button><div class="quotation-product-total"><span>Quotation total</span><strong id="quotation-total">${money(total)}</strong></div></div>`:`<div class="empty-note">Select a customer and an approved Quick Quote to add its product to this quotation.</div>`}
        </div>
        <div class="quote-section"><label class="form-label" for="quotation-extra-info">Additional information / requirements</label><textarea class="form-control" id="quotation-extra-info" rows="3" placeholder="${source||editing?"Add extra information or requirements for this quotation":"Select an approved Quick Quote first"}" ${source||editing?"":"disabled"}>${source||editing?esc(quotationDraft.extraInfo??""):""}</textarea></div>
      </section>`;
  }
  function quotationItems(quote) {
    const items=quote.items?.length?quote.items:[{product:quote.product,quantity:quote.quantity,units:quote.units||1,unitPrice:quote.units?quote.total/quote.units:quote.total,total:quote.total}];
    return items.map(item=>{
      const row={...item,units:Number(item.units)||0,unitPrice:Number(item.unitPrice)||0,priceChoice:item.priceChoice||"product"};
      row.total=Number(item.total)||quoteLineTotal(row);
      return row;
    });
  }
  function quotationDetailPage() {
    const quote=quotes.find(item=>item.ref===quotationViewRef);
    if(!quote)return `${heading("Sales · Quotations","Quotation not found","This quotation may have been removed.",`<button class="btn btn-light" id="quotation-view-back"><i class="bi bi-arrow-left me-1"></i>Back to quotations</button>`)}`;
    const items=quotationItems(quote);
    const order=salesOrders.find(item=>item.quoteRef===quote.ref);
    const editable=["Draft","Submitted"].includes(quote.status);
    const actions=`<div class="quote-header-actions"><button class="btn btn-light" id="quotation-view-back"><i class="bi bi-arrow-left me-1"></i>Back to quotations</button><button class="btn btn-light" id="quotation-view-pdf"><i class="bi bi-file-earmark-pdf me-1"></i>PDF</button>${editable?`<button class="btn btn-light" id="quotation-view-edit">Edit</button>`:""}${quote.status==="Draft"?`<button class="btn btn-primary" id="quotation-view-submit">Submit</button>`:""}${quote.status==="Submitted"?`<button class="btn btn-primary" id="quotation-view-approve">Approve</button>`:""}${quote.status==="Approved"?(order?`<button class="btn btn-light" disabled>${order.no}</button>`:`<button class="btn btn-primary" id="quotation-view-sales-order">Create sales order</button>`):""}</div>`;
    return `${heading("Sales · Quotations",quote.ref,`${quote.customer} · ${quote.date} · ${quote.status}`,actions)}
      <section class="card-panel"><div class="quote-section"><div class="detail-grid"><div class="detail-box"><div class="detail-label">Customer</div><div class="detail-value">${esc(quote.customer)}</div></div><div class="detail-box"><div class="detail-label">Status</div><div class="detail-value">${statusPill(quote.status)}</div></div><div class="detail-box"><div class="detail-label">Quick Quote reference</div><div class="detail-value">${esc(quote.sourceQuickQuote||"—")}</div></div><div class="detail-box"><div class="detail-label">Date</div><div class="detail-value">${esc(quote.date)}</div></div></div></div>
        <div class="quote-section"><div class="section-label">Quotation products</div><div class="table-wrap"><table class="table"><thead><tr><th>Product / recipe</th><th>Units</th><th>Rate</th><th>Line total</th></tr></thead><tbody>${items.map(item=>`<tr><td class="table-name">${esc(item.product)}</td><td>${Number(item.units)||0}</td><td>${money(item.unitPrice)} / ${quotePriceBasis(item)}</td><td class="table-name">${money(Number(item.total)||quoteLineTotal(item))}</td></tr>`).join("")}</tbody></table></div><div class="quote-view-total"><span>Quotation total</span><strong>${money(quote.total)}</strong></div></div>
        <div class="quote-section"><div class="detail-label mb-2">Additional information / requirements</div><div class="help-copy">${quote.openField?esc(quote.openField):"None"}</div></div>
      </section>`;
  }
  function quotationProductRow(item,index,count) {
    const rateUnit=quotePriceBasis(item);
    return `<div class="quotation-product-row">
      <div><label class="form-label" for="quotation-product-select-${index}">Product / recipe</label><input class="form-control quotation-product-select" id="quotation-product-select-${index}" data-index="${index}" list="quotation-products-${index}" value="${esc(item.product||"")}" placeholder="Search products..." autocomplete="off" required><datalist id="quotation-products-${index}">${products.map(product=>`<option value="${esc(product.name)}"></option>`).join("")}</datalist></div>
      <div><label class="form-label" for="quotation-product-units-${index}">Units</label><input type="number" min="0" step="1" class="form-control quotation-product-units" id="quotation-product-units-${index}" data-index="${index}" value="${Number(item.units)||0}"></div>
      <div><label class="form-label" for="quotation-product-rate-${index}">Rate / ${rateUnit}</label><input type="number" min="0" step="0.01" class="form-control quotation-product-rate" id="quotation-product-rate-${index}" data-index="${index}" value="${Number(item.unitPrice)||0}" ${item.product?"":"disabled"}></div>
      <div><label class="form-label">Line total</label><div class="quotation-line-total" data-index="${index}">${money(quoteLineTotal(item))}${rateUnit==="kg"&&item.size?`<span>${actualQuantity(item).toFixed(3)} kg</span>`:""}</div></div>
      ${count>1?`<button type="button" class="icon-btn quotation-product-remove" data-index="${index}" title="Remove product"><i class="bi bi-trash"></i></button>`:`<span class="quotation-product-remove-space"></span>`}
    </div>`;
  }
  function productionPackagingCosts(record) {
    return [
      {label:"Labour cost",value:Number(record.labour)||0},
      {label:"Design cost",value:Number(record.design)||0},
      {label:"Bottle / jar / tube cost",value:Number(record.packaging)||0},
      {label:"Label cost",value:Number(record.label)||0},
      {label:"Box cost",value:Number(record.box)||0},
      {label:"Carton cost",value:Number(record.carton)||0},
      {label:"Transportation",value:Number(record.transport)||0}
    ];
  }
  function quickQuoteItems(quickQuote) {
    const items=quickQuote.items?.length?quickQuote.items:[{product:quickQuote.product,quantity:quickQuote.quantity,units:quickQuote.units,unitPrice:quickQuote.units?quickQuote.total/quickQuote.units:quickQuote.total,total:quickQuote.total}];
    return items.map(item=>{
      const row={...item,units:Number(item.units)||0,unitPrice:Number(item.unitPrice)||0,priceChoice:item.priceChoice||"product"};
      row.total=Number(item.total)||quoteLineTotal(row);
      return row;
    });
  }
  function actualQuantity(row) {
    const quantity=((Number(row.units)||0)*(Number(row.size)||0)+(Number(row.wastage)||0))/1000;
    return Number(quantity.toFixed(3));
  }
  function quotePriceBasis(row) { return String(row.priceChoice||"").startsWith("slab:")?"kg":"unit"; }
  function quoteLineTotal(row) {
    const quantity=quotePriceBasis(row)==="kg"?actualQuantity(row):(Number(row.units)||0);
    return Math.round(quantity*(Number(row.unitPrice)||0));
  }
  function quoteUnitSize(data) {
    const units=Number(data.units)||0, quantity=Number(data.quantity)||0;
    return Number(data.size)||((units>0&&quantity>0)?quantity*1000/units:30);
  }
  function blankQuoteDraft(customer="",showZeros=Boolean(customer)) {
    const value=showZeros?0:"";
    return {customer,product:"",units:value,size:value,sizeUnit:"ml",wastage:value,labour:value,design:value,packaging:value,label:value,box:value,carton:value,transport:value,selling:value,openField:""};
  }
  function blankQuoteItem(showZeros=false) {
    const value=showZeros?0:"";
    return {product:"",units:value,size:value,sizeUnit:"ml",wastage:value,unitPrice:0,priceChoice:""};
  }
  function quoteRowsFromData(data) {
    if(data.items?.length) return [{...data.items[0],wastage:Number(data.items[0].wastage)||0,priceChoice:data.items[0].priceChoice||(data.selling?"saved":"product")}];
    if(!data.product) return [blankQuoteItem(Boolean(data.customer))];
    return [{product:data.product,units:Number(data.units)||1,size:quoteUnitSize(data),sizeUnit:data.sizeUnit||"ml",wastage:Number(data.wastage)||0,unitPrice:Number(data.selling)||productUnitPrice(data.product),priceChoice:data.selling?"saved":"product"}];
  }
  function productUnitPrice(productName) { return Number(products.find(p=>p.name===productName)?.unitPrice)||0; }
  function slabFor(quantity) {
    const actualKilograms=Number(quantity)||0;
    if(actualKilograms<1)return undefined;
    const wholeKilograms=Math.ceil(actualKilograms);
    return slabs.find(s=>wholeKilograms>=s.min&&wholeKilograms<=s.max);
  }
  function latestApprovedQuote() {
    return quotes.filter(q=>q.status==="Approved").sort((a,b)=>Date.parse(b.approvedAt||b.date)-Date.parse(a.approvedAt||a.date))[0];
  }
  function costInput(label,id,value,disabled=false) { return `<div class="quote-cost-field"><label class="form-label" for="quote-${id}">${label}</label><div class="input-group input-group-sm"><span class="input-group-text">Rs</span><input id="quote-${id}" type="number" min="0" step="1" class="form-control quote-cost" value="${value}" ${disabled?"disabled":""}></div></div>`; }
  function quotationsPage() { return `${heading("Sales","Quotation management","Review quote history, status and value across your active company.",pageAction("Create quotation","bi-plus-lg","new-quote"))}
    <div class="filter-row mb-3"><div class="search-box"><i class="bi bi-search"></i><input id="record-search" class="form-control" placeholder="Search quotations..."></div><select class="form-select" id="status-filter" style="width:155px"><option>All statuses</option>${["Draft","Submitted","Approved","Rejected"].map(s=>`<option>${s}</option>`).join("")}</select></div>
    <section class="card-panel">${quoteTable(quotes)}</section>
    <div class="help-copy mt-3"><i class="bi bi-info-circle me-1"></i>Draft and submitted quotations can be edited. Approval locks the quotation; later changes require a new revision. Create a sales order only after approval.</div>`;
  }
  function salesOrdersPage() {
    const available=quotes.some(q=>q.status==="Approved"&&!salesOrders.some(o=>o.quoteRef===q.ref));
    return `${heading("Sales","Sales order management","Create orders from approved quotations, then invoice each sales order.",pageAction("Create sales order","bi-plus-lg","new-sales-order"))}
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Sales orders</h3><div class="panel-sub">${salesOrders.length} orders · only approved quotations can be converted</div></div></div>
      ${salesOrders.length?`<div class="table-wrap"><table class="table" id="sales-order-table"><thead><tr><th>Sales order</th><th>Quotation</th><th>Customer</th><th>Product</th><th>Date</th><th>Total</th><th>Invoice</th><th></th></tr></thead><tbody>${salesOrders.map(o=>{const invoice=invoices.find(i=>i.salesOrder===o.no);return `<tr><td class="table-name">${o.no}</td><td>${o.quoteRef}</td><td>${esc(o.customer)}</td><td>${esc(o.product)}</td><td>${o.date}</td><td class="table-name">${money(o.total)}</td><td>${invoice?invoice.no:"Not invoiced"}</td><td>${invoice?`<button class="btn btn-light" disabled>Invoiced</button>`:`<button class="btn btn-primary order-invoice" data-no="${o.no}">Create invoice</button>`}</td></tr>`;}).join("")}</tbody></table></div>`:`<div class="empty-note">No sales orders yet. Approve a quotation, then create its sales order here.</div>`}</section>
      ${available?"":`<div class="help-copy mt-3"><i class="bi bi-info-circle me-1"></i>${quotes.some(q=>q.status==="Approved")?"All approved quotations have already been converted to sales orders.":"Approve a quotation before creating a sales order."}</div>`}`;
  }
  function invoicesPage() {
    if(selectedInvoice) return invoiceDetail(selectedInvoice);
    return `${heading("Finance","Invoice management","Create invoices from sales orders and keep an eye on payment status.",pageAction("New invoice","bi-plus-lg","new-invoice"))}
      <div class="invoice-summary"><div class="card-panel"><div class="mini-kpi-label">Invoice total</div><div class="mini-kpi-value">${money(invoices.reduce((a,x)=>a+x.total,0))}</div></div><div class="card-panel"><div class="mini-kpi-label">Paid</div><div class="mini-kpi-value text-success">${money(invoices.reduce((a,x)=>a+x.paid,0))}</div></div><div class="card-panel"><div class="mini-kpi-label">Outstanding</div><div class="mini-kpi-value">${money(invoices.reduce((a,x)=>a+x.total-x.paid,0))}</div></div><div class="card-panel"><div class="mini-kpi-label">Overdue</div><div class="mini-kpi-value text-danger">1 invoice</div></div></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Invoices</h3><div class="panel-sub">${invoices.length} invoices · balances update when payments are allocated</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search invoices..."></div></div></div>
      <div class="table-wrap"><table class="table" id="invoice-table"><thead><tr><th>Invoice</th><th>Sales order</th><th>Customer</th><th>Issue date</th><th>Due date</th><th>Total</th><th>Balance</th><th>Status</th><th></th></tr></thead><tbody>${invoices.map((i,n)=>`<tr><td class="table-name">${i.no}</td><td>${i.salesOrder||"—"}</td><td>${i.customer}</td><td>${i.date}</td><td>${i.due}</td><td class="table-name">${money(i.total)}</td><td class="${i.total-i.paid?"text-danger":"text-success"}">${money(i.total-i.paid)}</td><td>${statusPill(invoiceStatus(i))}</td><td><div class="d-flex gap-1"><button class="btn btn-light invoice-open" data-index="${n}">View</button><button class="btn btn-light invoice-pdf" data-index="${n}" title="Generate PDF"><i class="bi bi-file-earmark-pdf"></i></button></div></td></tr>`).join("")}</tbody></table></div></section>`;
  }
  function invoiceStatus(i) { if(i.paid>=i.total)return "Paid";if(i.paid>0)return "Partially Paid";return i.status; }
  function invoiceItems(invoice) {
    if(invoice.items?.length) return invoice.items;
    const match=invoice.item.match(/ · (\d+) units$/);
    const units=Number(match?.[1])||1;
    return [{product:invoice.item.split(" · ")[0],units,unitPrice:invoice.total/units,total:invoice.total}];
  }
  function invoiceDetail(i) {
    const balance=i.total-i.paid;
    return `${heading("Finance · Invoices",`Invoice ${i.no}`,`${i.customer} · Issued ${i.date}`,`<button class="btn btn-light me-1" id="back-invoices"><i class="bi bi-arrow-left me-1"></i>Back</button><button class="btn btn-light me-1" id="detail-invoice-pdf"><i class="bi bi-file-earmark-pdf me-1"></i>Generate PDF</button><button class="btn btn-primary" id="invoice-pay" ${balance<=0?"disabled":""}><i class="bi bi-wallet2 me-1"></i>Record payment</button>`)}
      <div class="quote-layout"><section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Invoice details</h3><div class="panel-sub">Payment due ${i.due}</div></div>${statusPill(invoiceStatus(i))}</div><div class="px-3 pb-3">
        <div class="detail-grid mb-4"><div class="detail-box"><div class="detail-label">Customer</div><div class="detail-value">${i.customer}</div></div><div class="detail-box"><div class="detail-label">Invoice date</div><div class="detail-value">${i.date}</div></div><div class="detail-box"><div class="detail-label">Due date</div><div class="detail-value">${i.due}</div></div></div>
        <div class="help-copy mb-2">Sales order: ${i.salesOrder||"Existing invoice"}</div><div class="line-items-box"><div class="table-wrap"><table class="table"><thead><tr><th>Description</th>${i.salesOrder?`<th>Actual qty (kg)</th><th>Units</th>`:`<th>Qty</th>`}<th>Rate</th><th>Amount</th></tr></thead><tbody>${invoiceItems(i).map(item=>`<tr><td class="table-name">${esc(item.product)}<span class="table-muted">From sales order ${i.salesOrder||"—"}</span></td>${i.salesOrder?`<td>${Number(item.quantity)>0?Number(item.quantity).toFixed(3):"—"}</td><td>${item.units}</td>`:`<td>${item.units}</td>`}<td>${money(item.unitPrice)} / ${quotePriceBasis(item)}</td><td class="table-name">${money(item.total)}</td></tr>`).join("")}</tbody></table></div></div>
        <div class="d-flex justify-content-end"><div style="width:250px"><div class="total-row"><span>Subtotal</span><b>${money(i.total)}</b></div><div class="total-row"><span>Tax</span><b>${money(0)}</b></div><div class="total-row grand"><span>Invoice total</span><strong>${money(i.total)}</strong></div><div class="total-row"><span>Paid</span><b class="text-success">${money(i.paid)}</b></div><div class="total-row"><span>Outstanding</span><b class="text-danger">${money(balance)}</b></div></div></div>
      </div></section><aside class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Company details</h3><div class="panel-sub">Printed on invoice</div></div></div><div class="px-3 pb-3"><div class="detail-value">${esc(activeCompany.name)}</div><div class="help-copy mt-2">${esc(activeCompany.address)}<br>NTN ${activeCompany.ntn}<br>${activeCompany.email}<br>${activeCompany.bank}</div><hr><div class="section-label">Payment history</div>${payments.filter(p=>p.invoice===i.no).length?payments.filter(p=>p.invoice===i.no).map(p=>`<div class="activity-item"><div class="activity-icon"><i class="bi bi-check2"></i></div><div class="activity-copy"><b>${money(p.amount)}</b><br>${p.method} · ${p.date}</div>${statusPill(p.status)}</div>`).join(""):`<div class="help-copy">No payments allocated yet.</div>`}</div></aside></div>`;
  }
  function usersRolesPage() {
    return `${heading("Administration","User & role management","Create workspace users and assign permissions by role.",`<button class="btn btn-light me-1" id="add-role"><i class="bi bi-shield-lock me-1"></i>Add role</button><button class="btn btn-primary" id="add-user"><i class="bi bi-person-plus me-1"></i>Add user</button>`)}
      <div class="admin-grid">
        <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Users</h3><div class="panel-sub">${users.length} workspace users</div></div><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="user-search" placeholder="Search users..."></div></div>
          <div class="table-wrap"><table class="table" id="user-table"><thead><tr><th>User</th><th>Role</th><th>Company</th><th>Status</th><th></th></tr></thead><tbody>${users.map((u,i)=>`<tr><td><div class="user-list-cell"><div class="avatar">${esc(u.initials)}</div><div><span class="table-name">${esc(u.name)}</span><span class="table-muted">${esc(u.email)}</span></div></div></td><td>${esc(u.role)}</td><td>${esc(u.company)}</td><td>${statusPill(u.status)}</td><td><button class="icon-btn edit-user" data-index="${i}" title="Edit user"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div>
        </section>
        <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Roles</h3><div class="panel-sub">${roles.length} configured roles</div></div></div>
          <div class="role-list">${roles.map((r,i)=>`<div class="role-card"><div class="role-card-heading"><div><div class="table-name">${esc(r.name)}</div><div class="table-muted">${r.users} assigned user${r.users===1?"":"s"}</div></div><button class="icon-btn edit-role" data-index="${i}" title="Edit role"><i class="bi bi-pencil"></i></button></div><div class="permission-list">${r.permissions.map(p=>`<span>${esc(p)}</span>`).join("")}</div></div>`).join("")}</div>
        </section>
      </div>`;
  }
  function openUserModal(index) {
    const u=index===undefined?{name:"",email:"",role:roles[0].name,company:activeCompany.name,status:"Active"}:users[index];
    modalShell(index===undefined?"Create user":"Edit user",`<div class="row g-3"><div class="col-md-6"><label class="form-label">Full name *</label><input class="form-control" id="user-name" value="${esc(u.name)}"></div><div class="col-md-6"><label class="form-label">Email address *</label><input type="email" class="form-control" id="user-email" value="${esc(u.email)}"></div><div class="col-md-6"><label class="form-label">Role *</label><select class="form-select" id="user-role">${selectOptions(roles.map(r=>r.name),u.role)}</select></div><div class="col-md-6"><label class="form-label">Company *</label><select class="form-select" id="user-company">${selectOptions(companies.map(c=>c.name),u.company)}</select></div><div class="col-md-6"><label class="form-label">Status</label><select class="form-select" id="user-status">${selectOptions(["Active","Inactive"],u.status)}</select></div>${index===undefined?`<div class="col-md-6"><label class="form-label">Temporary password *</label><input type="password" class="form-control" id="user-password" placeholder="Minimum 8 characters"></div>`:""}</div>`,"Save user",modal=>{
      const name=document.getElementById("user-name").value.trim(),email=document.getElementById("user-email").value.trim();
      const password=document.getElementById("user-password");
      if(!name||!email||(password&&password.value.length<8)){showToast("Enter a name, valid email and password of at least 8 characters.");return;}
      const record={name,email,role:document.getElementById("user-role").value,company:document.getElementById("user-company").value,status:document.getElementById("user-status").value,initials:name.split(" ").map(v=>v[0]).slice(0,2).join("").toUpperCase()};
      if(index===undefined)users.unshift(record);else users[index]=record;
      modal.hide();render();showToast(index===undefined?"User created successfully.":"User updated successfully.");
    });
  }
  function openRoleModal(index) {
    const r=index===undefined?{name:"",permissions:["Quotations"]}:roles[index];
    const options=["All modules","User management","Role management","Approvals","Customers","Quotations","Invoices","Payments","PDF documents","Ingredients","Products","Weight pricing","Financial reports"];
    modalShell(index===undefined?"Create role":"Edit role",`<div class="row g-3"><div class="col-12"><label class="form-label">Role name *</label><input class="form-control" id="role-name" value="${esc(r.name)}"></div><div class="col-12"><label class="form-label">Permissions</label><div class="permission-checks">${options.map(p=>`<label><input type="checkbox" class="role-permission" value="${esc(p)}" ${r.permissions.includes(p)?"checked":""}> ${esc(p)}</label>`).join("")}</div></div></div>`,"Save role",modal=>{
      const name=document.getElementById("role-name").value.trim();
      const permissions=[...document.querySelectorAll(".role-permission:checked")].map(el=>el.value);
      if(!name||!permissions.length){showToast("Enter a role name and select at least one permission.");return;}
      const record={name,permissions,users:index===undefined?0:roles[index].users};
      if(index===undefined)roles.unshift(record);else roles[index]=record;
      modal.hide();render();showToast("Role saved successfully.");
    });
  }
  function paymentsPage() {
    return `${heading("Finance","Payment management","Record customer receipts and vendor payments with allocation references.",pageAction("Record payment","bi-plus-lg","add-payment"))}
      <div class="invoice-summary"><div class="card-panel"><div class="mini-kpi-label">Receipts this month</div><div class="mini-kpi-value">${money(114800)}</div></div><div class="card-panel"><div class="mini-kpi-label">Customer receipts</div><div class="mini-kpi-value">${payments.filter(p=>p.type!=="Vendor").length}</div></div><div class="card-panel"><div class="mini-kpi-label">Vendor payments</div><div class="mini-kpi-value">${payments.filter(p=>p.type==="Vendor").length}</div></div><div class="card-panel"><div class="mini-kpi-label">Unapplied</div><div class="mini-kpi-value">${money(0)}</div></div></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Payment activity</h3><div class="panel-sub">Confirmed payments remain in the audit trail</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search payments..."></div><select class="form-select" id="payment-type" style="width:145px"><option>All payments</option><option>Customer receipt</option><option>Vendor payment</option></select></div></div>
      <div class="table-wrap"><table class="table" id="payment-table"><thead><tr><th>Payment ref.</th><th>Date</th><th>Party</th><th>Type</th><th>Allocation</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead><tbody>${payments.map(p=>`<tr><td class="table-name">${p.ref}</td><td>${p.date}</td><td>${p.party}</td><td>${p.type==="Vendor"?"Vendor payment":"Customer receipt"}</td><td>${p.invoice}</td><td>${p.method}</td><td class="table-name">${money(p.amount)}</td><td>${statusPill(p.status)}</td></tr>`).join("")}</tbody></table></div></section>
      <div class="help-copy mt-3"><i class="bi bi-shield-lock me-1"></i>Confirmed transactions are adjusted through reversal, not deletion. Allocations cannot exceed the invoice balance.</div>`;
  }
  function render() {
    const pages={dashboard,customers:()=>genericListPage("customers"),vendors:()=>genericListPage("vendors"),companies:()=>genericListPage("companies"),users:usersRolesPage,ingredients:()=>catalogPage("ingredients"),products:()=>catalogPage("products"),slabs:slabsPage,quickquotes:quickQuoteListPage,newquickquote:quickQuote,quickquoteview:quickQuoteViewPage,newquotation:newQuotationPage,quotationview:quotationDetailPage,quotations:quotationsPage,salesorders:salesOrdersPage,invoices:invoicesPage,payments:paymentsPage};
    appShell((pages[currentPage]||dashboard)());
    bindCommon();
    if(currentPage==="newquickquote") bindQuote();
    if(currentPage==="newquotation") bindNewQuotation();
    if(currentPage==="salesorders") document.querySelectorAll(".order-invoice").forEach(b=>b.onclick=()=>openInvoiceModal(b.dataset.no));
    if(currentPage==="invoices"&&!selectedInvoice) document.querySelectorAll(".invoice-open").forEach(b=>b.onclick=()=>{selectedInvoice=invoices[Number(b.dataset.index)];render();});
    if(currentPage==="invoices"&&selectedInvoice){document.getElementById("back-invoices").onclick=()=>{selectedInvoice=null;render();};document.getElementById("invoice-pay").onclick=()=>openPaymentModal(selectedInvoice);document.getElementById("detail-invoice-pdf").onclick=()=>generateInvoicePdf(selectedInvoice);}
  }
  function bindCommon() {
    const bind=(id,fn)=>{const e=document.getElementById(id);if(e)e.onclick=fn;};
    const startNewQuickQuote=()=>{window.quoteDraft=null;window.quoteLoadedCustomer=null;quoteProductRows=[];navigate("newquickquote");};
    const startFormalQuotation=()=>{quotationEditRef=null;quotationDraft={customer:"",quickQuoteRef:"",items:[],extraInfo:""};navigate("newquotation");};
    bind("dash-quote",startNewQuickQuote);
    bind("all-quotes",()=>navigate("quotations"));bind("activity-view",()=>navigate("quotations"));
    bind("new-sales-order",()=>openSalesOrderModal());
    bind("new-quote",startFormalQuotation);bind("quickquote-add",startNewQuickQuote);bind("quickquote-back",()=>navigate("quickquotes"));
    bind("quotation-back",()=>{
      if(quotationEditRef){quotationViewRef=quotationEditRef;quotationEditRef=null;quotationDraft=null;navigate("quotationview");}
      else {quotationDraft=null;navigate("quotations");}
    });
    bind("quotation-reset",()=>{quotationDraft={customer:"",quickQuoteRef:"",items:[],extraInfo:""};renderQuoteAndFocus("#quotation-customer");});
    bind("save-formal-quotation",saveFormalQuotation);
    bind("quotation-view-back",()=>navigate("quotations"));
    bind("quotation-view-pdf",()=>{const quote=quotes.find(item=>item.ref===quotationViewRef);if(quote)generateQuotationPdf(quote);});
    bind("quotation-view-edit",()=>editQuotation(quotationViewRef));
    bind("quotation-view-submit",()=>submitQuotation(quotationViewRef));
    bind("quotation-view-approve",()=>approveQuotation(quotationViewRef));
    bind("quotation-view-sales-order",()=>createSalesOrder(quotationViewRef));
    bind("new-recipe",()=>openRecipeModal());bind("product-tab",()=>{});
    bind("add-record",()=>openMasterModal(currentPage));
    bind("add-ingredient",()=>openIngredientModal());
    bind("add-slab",()=>openSlabModal());
    bind("add-payment",()=>openPaymentModal());
    bind("new-invoice",()=>openInvoiceModal());
    bind("add-user",()=>openUserModal());
    bind("add-role",()=>openRoleModal());
    bind("export-list",()=>showToast("Demo export prepared — no file was downloaded."));
    bind("price-history",()=>showToast("Price history: Aloe Vera Extract · Rs 1,720 → Rs 1,850/kg."));
    bind("reset-quote",()=>{window.quoteDraft=null;window.quoteLoadedCustomer=null;quoteProductRows=[];renderQuoteAndFocus("#quote-customer");showToast("Quick quote reset.");});
    bind("save-quote",saveQuote);
    const search=document.getElementById("record-search");
    if(search) search.addEventListener("input",()=>filterTable(search.value));
    const sf=document.getElementById("status-filter");
    if(sf) sf.onchange=()=>{const q=sf.value;document.querySelectorAll("#quotation-table tbody tr").forEach(r=>r.style.display=(q==="All statuses"||r.textContent.includes(q))?"":"none");};
    const pf=document.getElementById("payment-type");
    if(pf) pf.onchange=()=>{const q=pf.value;document.querySelectorAll("#payment-table tbody tr").forEach(r=>r.style.display=(q==="All payments"||r.cells[3].textContent===q)?"":"none");};
    document.querySelectorAll(".ingredient-edit").forEach(b=>b.onclick=()=>openIngredientModal(Number(b.dataset.index)));
    document.querySelectorAll(".slab-edit").forEach(b=>b.onclick=()=>openSlabModal(Number(b.dataset.index)));
    document.querySelectorAll(".product-edit").forEach(b=>b.onclick=()=>openRecipeModal(Number(b.dataset.index)));
    document.querySelectorAll(".edit-user").forEach(b=>b.onclick=()=>openUserModal(Number(b.dataset.index)));
    document.querySelectorAll(".edit-role").forEach(b=>b.onclick=()=>openRoleModal(Number(b.dataset.index)));
    const userSearch=document.getElementById("user-search");
    if(userSearch)userSearch.oninput=()=>document.querySelectorAll("#user-table tbody tr").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(userSearch.value.toLowerCase())?"":"none");
    document.querySelectorAll(".quote-pdf").forEach(b=>b.onclick=()=>{const q=quotes.find(x=>x.ref===b.dataset.ref);if(q)generateQuotationPdf(q);});
    document.querySelectorAll(".quote-view").forEach(b=>b.onclick=()=>viewQuotation(b.dataset.ref));
    document.querySelectorAll(".quote-submit").forEach(b=>b.onclick=()=>submitQuotation(b.dataset.ref));
    document.querySelectorAll(".quote-approve").forEach(b=>b.onclick=()=>approveQuotation(b.dataset.ref));
    document.querySelectorAll(".quote-sales-order").forEach(b=>b.onclick=()=>createSalesOrder(b.dataset.ref));
    document.querySelectorAll(".quickquote-submit").forEach(b=>b.onclick=()=>submitQuickQuote(b.dataset.ref));
    document.querySelectorAll(".quickquote-approve").forEach(b=>b.onclick=()=>approveQuickQuote(b.dataset.ref));
    document.querySelectorAll(".quickquote-create-quotation").forEach(b=>b.onclick=()=>createQuotationFromQuickQuote(b.dataset.ref));
    document.querySelectorAll(".quickquote-view").forEach(b=>b.onclick=()=>viewQuickQuote(b.dataset.ref));
    bind("quickquote-view-back",()=>navigate("quickquotes"));
    bind("quickquote-view-submit",()=>submitQuickQuote(quickQuoteViewRef));
    bind("quickquote-view-approve",()=>approveQuickQuote(quickQuoteViewRef));
    bind("quickquote-view-create-quotation",()=>createQuotationFromQuickQuote(quickQuoteViewRef));
    document.querySelectorAll(".invoice-pdf").forEach(b=>b.onclick=()=>generateInvoicePdf(invoices[Number(b.dataset.index)]));
  }
  function filterTable(q) {
    const table=document.getElementById("records-table")||document.getElementById("quotation-table")||document.getElementById("sales-order-table")||document.getElementById("invoice-table")||document.getElementById("payment-table");
    if(!table)return;
    table.querySelectorAll("tbody tr").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q.toLowerCase())?"":"none");
  }
  function bindQuote() {
    const customer=document.getElementById("quote-customer");
    const hasCustomer=Boolean(customer.value.trim());
    customer.onchange=()=>{
      const selected=customers.find(c=>c.status==="Active"&&c.name.toLowerCase()===customer.value.trim().toLowerCase());
      if(!selected){
        window.quoteLoadedCustomer=null;window.quoteDraft=null;quoteProductRows=[];
        customer.value="";
        renderQuoteAndFocus("#quote-customer");showToast("Select an active customer from the suggestions.");return;
      }
      window.quoteLoadedCustomer=null;window.quoteDraft=blankQuoteDraft(selected.name,true);
      quoteProductRows=[blankQuoteItem(true)];
      renderQuoteAndFocus(".quote-product-select");
    };
    const updateWeightPrice=row=>{
      if(!String(row.priceChoice||"").startsWith("slab:"))return;
      const slab=slabFor(actualQuantity(row));
      if(slab){const index=slabs.indexOf(slab);row.priceChoice=`slab:${index}`;row.unitPrice=slab.unit;}
      else {row.priceChoice="product";row.unitPrice=productUnitPrice(row.product);}
    };
    const paint=()=>{
      const container=document.getElementById("quote-product-rows");
      if(!container)return;
      container.innerHTML=quoteProductRows.map((row,i)=>`<div class="quote-product-entry">
        <div class="quote-product-field"><label class="form-label" for="quote-product-select-${i}">Product / recipe</label><input id="quote-product-select-${i}" class="form-control quote-product-select" data-index="${i}" list="quote-products-${i}" value="${esc(row.product||"")}" placeholder="Search products..." autocomplete="off" aria-label="Search product ${i+1}" ${hasCustomer?"":"disabled"}><datalist id="quote-products-${i}">${products.map(product=>`<option value="${esc(product.name)}"></option>`).join("")}</datalist></div>
        <div class="quote-product-field"><label class="form-label" for="quote-price-select-${i}">Rate</label><select id="quote-price-select-${i}" class="form-select quote-price-select" data-index="${i}" aria-label="Price basis for product ${i+1}" ${hasCustomer&&row.product?"":"disabled"}><option value="" ${row.priceChoice?"":"selected"}>${row.product?"Select a rate":"Select a product first"}</option>${row.product?`<option value="product" ${row.priceChoice==="product"?"selected":""}>Product · ${money(productUnitPrice(row.product))} / unit</option>${row.priceChoice==="saved"?`<option value="saved" selected>Saved quote · ${money(row.unitPrice)} / unit</option>`:""}<optgroup label="Weight-based prices">${slabs.map((slab,slabIndex)=>`<option value="slab:${slabIndex}" ${row.priceChoice===`slab:${slabIndex}`?"selected":""}>${slab.label} · ${money(slab.unit)} / kg</option>`).join("")}</optgroup>`:""}</select></div>
        <div class="quote-product-field"><label class="form-label" for="quote-product-units-${i}">Total units</label><input id="quote-product-units-${i}" class="form-control quote-product-units" data-index="${i}" type="number" min="0" step="1" value="${row.units}" aria-label="Total units for product ${i+1}" ${hasCustomer?"":"disabled"}></div>
        <div class="quote-product-field"><label class="form-label" for="quote-product-size-${i}">ML / G per unit</label><input id="quote-product-size-${i}" class="form-control quote-product-size" data-index="${i}" type="number" min="0" step="0.01" value="${row.size}" aria-label="ML or grams per unit for product ${i+1}" ${hasCustomer?"":"disabled"}></div>
        <div class="quote-product-field"><label class="form-label" for="quote-product-wastage-${i}">Wastage (gm)</label><input id="quote-product-wastage-${i}" class="form-control quote-product-wastage" data-index="${i}" type="number" min="0" step="0.01" value="${row.wastage}" aria-label="Wastage in grams for product ${i+1}" ${hasCustomer?"":"disabled"}></div>
        <div class="quote-product-field"><label class="form-label" for="quote-product-quantity-${i}">Actual quantity (kg)</label><input id="quote-product-quantity-${i}" class="form-control readonly" type="number" readonly tabindex="-1" value="${hasCustomer?actualQuantity(row).toFixed(3):row.product&&Number(row.units)>0&&Number(row.size)>0?actualQuantity(row).toFixed(3):""}" aria-label="Actual quantity in kilograms for product ${i+1}"></div>
        <div class="quote-product-field"><label class="form-label" for="quote-product-total-${i}">Line total</label><input id="quote-product-total-${i}" class="form-control readonly quote-product-total-price" readonly tabindex="-1" value="${hasCustomer?money(quoteLineTotal(row)):row.product&&Number(row.units)>0&&row.priceChoice?money(quoteLineTotal(row)):""}" aria-label="Line total for product ${i+1}"></div>
      </div>`).join("");
      container.querySelectorAll(".quote-product-select").forEach(el=>el.onchange=()=>{
        const row=quoteProductRows[Number(el.dataset.index)];
        const product=products.find(item=>item.name.toLowerCase()===el.value.trim().toLowerCase());
        if(!product){Object.assign(row,blankQuoteItem(Boolean(customer.value)));renderQuoteAndFocus(".quote-product-select",Number(el.dataset.index));return;}
        row.product=product.name;row.unitPrice=productUnitPrice(product.name);row.priceChoice="product";renderQuoteAndFocus(".quote-price-select",Number(el.dataset.index));
      });
      container.querySelectorAll(".quote-price-select").forEach(el=>el.onchange=()=>{
        const row=quoteProductRows[Number(el.dataset.index)];
        if(el.value==="product"){row.priceChoice="product";row.unitPrice=productUnitPrice(row.product);}
        else if(el.value==="saved"){row.priceChoice="saved";}
        else {
          const slabIndex=Number(el.value.split(":")[1]),slab=slabs[slabIndex];
          row.priceChoice=`slab:${slabIndex}`;row.unitPrice=slab.unit;
        }
        renderQuoteAndFocus(".quote-product-units",Number(el.dataset.index));
      });
      container.querySelectorAll(".quote-product-units").forEach(el=>el.onchange=()=>{const index=Number(el.dataset.index),row=quoteProductRows[index];row.units=Number(el.value)||0;updateWeightPrice(row);renderQuoteAndFocus(".quote-product-size",index);});
      container.querySelectorAll(".quote-product-size").forEach(el=>el.onchange=()=>{const index=Number(el.dataset.index),row=quoteProductRows[index];row.size=Number(el.value)||0;updateWeightPrice(row);renderQuoteAndFocus(".quote-product-wastage",index);});
      container.querySelectorAll(".quote-product-wastage").forEach(el=>el.onchange=()=>{const index=Number(el.dataset.index),row=quoteProductRows[index];row.wastage=Number(el.value)||0;updateWeightPrice(row);renderQuoteAndFocus("#quote-labour");});
    };
    paint();
    const openField=document.getElementById("quote-open-field");
    openField.onchange=()=>{const d=window.quoteDraft||{};d.openField=openField.value;window.quoteDraft=d;};
    const ids=["labour","design","packaging","label","box","carton","transport"];
    ids.forEach(id=>{const el=document.getElementById("quote-"+id);if(el)el.addEventListener("change",()=>{const d=window.quoteDraft||{};d[id]=el.value===""?"":Number(el.value)||0;window.quoteDraft=d;const next=ids[ids.indexOf(id)+1];renderQuoteAndFocus(next?`#quote-${next}`:"#quote-open-field");});});
    const approvedLink=document.getElementById("latest-approved-open");
    if(approvedLink)approvedLink.onclick=()=>navigate("quotations");
  }
  function bindNewQuotation() {
    if(!quotationDraft) quotationDraft={customer:"",quickQuoteRef:"",items:[],extraInfo:""};
    const customerInput=document.getElementById("quotation-customer");
    customerInput.onchange=()=>{
      const selected=customers.find(c=>c.status==="Active"&&c.name.toLowerCase()===customerInput.value.trim().toLowerCase());
      if(!selected){
        quotationDraft={customer:"",quickQuoteRef:"",items:[],extraInfo:""};
        customerInput.value="";
        renderQuoteAndFocus("#quotation-customer");showToast("Select an active customer from the suggestions.");return;
      }
      quotationDraft={customer:selected.name,quickQuoteRef:"",items:[],extraInfo:""};
      renderQuoteAndFocus("#quotation-source-quickquote");
    };
    const sourceSelect=document.getElementById("quotation-source-quickquote");
    if(sourceSelect)sourceSelect.onchange=()=>{
      const source=quickQuotes.find(q=>q.ref===sourceSelect.value&&q.status==="Approved"&&q.customer===quotationDraft.customer);
      quotationDraft.quickQuoteRef=source?.ref||"";
      quotationDraft.items=source?quickQuoteItems(source):[];
      quotationDraft.extraInfo=source?.openField||"";
      renderQuoteAndFocus(source?"#quotation-add-product":"#quotation-source-quickquote");
    };
    document.querySelectorAll(".quotation-product-select").forEach(el=>el.onchange=()=>{
      const index=Number(el.dataset.index),row=quotationDraft.items[index];
      const product=products.find(item=>item.name.toLowerCase()===el.value.trim().toLowerCase());
      if(!product){showToast("Select a product from the product list.");renderQuoteAndFocus(`#quotation-product-select-${index}`);return;}
      Object.assign(row,{product:product.name,unitPrice:productUnitPrice(product.name),priceChoice:"product",quantity:0,size:0,wastage:0});
      renderQuoteAndFocus(`#quotation-product-units-${index}`);
    });
    document.querySelectorAll(".quotation-product-units").forEach(el=>el.oninput=()=>{
      const index=Number(el.dataset.index),item=quotationDraft.items[index];item.units=Number(el.value)||0;
      if(item.size)item.quantity=actualQuantity(item);
      updateQuotationTotals();
    });
    document.querySelectorAll(".quotation-product-rate").forEach(el=>el.oninput=()=>{
      const index=Number(el.dataset.index);quotationDraft.items[index].unitPrice=Number(el.value)||0;
      updateQuotationTotals();
    });
    document.querySelectorAll(".quotation-product-remove").forEach(el=>el.onclick=()=>{
      const index=Number(el.dataset.index);quotationDraft.items.splice(index,1);
      renderQuoteAndFocus(".quotation-product-select",Math.max(0,index-1));
    });
    const addProduct=document.getElementById("quotation-add-product");
    if(addProduct)addProduct.onclick=()=>{
      quotationDraft.items.push({product:"",units:0,size:0,wastage:0,unitPrice:0,priceChoice:"product"});
      renderQuoteAndFocus(".quotation-product-select",quotationDraft.items.length-1);
    };
    const extraInfo=document.getElementById("quotation-extra-info");
    if(!extraInfo.disabled) extraInfo.oninput=()=>{quotationDraft.extraInfo=extraInfo.value;};
  }
  function updateQuotationTotals() {
    const items=quotationDraft?.items||[];
    items.forEach((item,index)=>{
      const line=document.querySelector(`.quotation-line-total[data-index="${index}"]`);
      if(line)line.innerHTML=`${money(quoteLineTotal(item))}${quotePriceBasis(item)==="kg"&&item.size?`<span>${actualQuantity(item).toFixed(3)} kg</span>`:""}`;
    });
    const total=document.getElementById("quotation-total");
    if(total)total.textContent=money(items.reduce((sum,item)=>sum+quoteLineTotal(item),0));
  }
  function generateQuotationPdf(q) {
    if(!window.jspdf?.jsPDF){showToast("PDF library is not loaded. Refresh and try again.");return;}
    const doc=new window.jspdf.jsPDF();
    const pageWidth=doc.internal.pageSize.getWidth(),pageHeight=doc.internal.pageSize.getHeight(),margin=16,contentWidth=pageWidth-margin*2;
    const customer=customers.find(c=>c.name===q.customer);
    const items=q.items?.length?q.items:[{product:q.product,quantity:q.quantity,units:q.units}];
    const drawHeader=continued=>{
      doc.setFillColor(20,77,59);doc.rect(0,0,pageWidth,39,"F");
      doc.setFillColor(95,164,132);doc.roundedRect(margin,10,13,13,3,3,"F");
      doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(16);doc.text("i",margin+4.4,19.5);
      doc.setFontSize(15);doc.text(doc.splitTextToSize(activeCompany.name,contentWidth-67),margin+19,16);
      doc.setFont("helvetica","normal");doc.setFontSize(8);
      doc.text(doc.splitTextToSize(activeCompany.address,contentWidth-67),margin+19,23);
      doc.text(`${activeCompany.phone}  |  ${activeCompany.email}`,margin+19,31);
      doc.setFont("helvetica","bold");doc.setFontSize(12);doc.text(continued?"QUOTATION (CONT.)":"QUOTATION",pageWidth-margin,17,{align:"right"});
      doc.setFont("helvetica","normal");doc.setFontSize(8);doc.text(q.ref||"Quotation",pageWidth-margin,25,{align:"right"});
      doc.text(q.date||"",pageWidth-margin,32,{align:"right"});
      doc.setTextColor(29,41,37);
    };
    const footer=page=>{
      doc.setDrawColor(225,231,227);doc.line(margin,pageHeight-17,pageWidth-margin,pageHeight-17);
      doc.setTextColor(112,123,116);doc.setFont("helvetica","normal");doc.setFontSize(7);
      doc.text(`NTN ${activeCompany.ntn}  |  ${activeCompany.bank}`,margin,pageHeight-11);
      doc.text(`${page} / ${doc.getNumberOfPages()}`,pageWidth-margin,pageHeight-11,{align:"right"});
    };
    drawHeader(false);
    let y=51;
    doc.setFont("helvetica","bold");doc.setFontSize(8);doc.setTextColor(91,106,97);doc.text("PREPARED FOR",margin,y);
    doc.setTextColor(29,41,37);doc.setFontSize(11);doc.text(doc.splitTextToSize(q.customer||"",contentWidth/2-5),margin,y+7);
    doc.setFont("helvetica","normal");doc.setFontSize(8);
    if(customer?.email)doc.text(customer.email,margin,y+13);
    if(customer?.city)doc.text(customer.city,margin,y+18);
    doc.setFillColor(244,248,245);doc.roundedRect(pageWidth-78,y-4,62,q.sourceQuickQuote?30:24,2,2,"F");
    doc.setFont("helvetica","bold");doc.setTextColor(91,106,97);doc.setFontSize(7);doc.text("REFERENCE",pageWidth-73,y+3);
    doc.setTextColor(29,41,37);doc.setFontSize(10);doc.text(q.ref||"Quotation",pageWidth-73,y+10);
    doc.setFont("helvetica","normal");doc.setFontSize(8);doc.text(`Date: ${q.date||""}`,pageWidth-73,y+16);
    if(q.sourceQuickQuote){doc.setFontSize(7);doc.text(`QQ: ${q.sourceQuickQuote}`,pageWidth-73,y+23);}
    y+=q.sourceQuickQuote?35:29;
    doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(29,41,37);doc.text("Quotation details",margin,y);y+=7;
    const columns={product:margin,quantity:114,units:139,unitPrice:160,amount:pageWidth-margin};
    const drawTableHeader=()=>{
      doc.setFillColor(20,77,59);doc.roundedRect(margin,y-5,contentWidth,10,1.5,1.5,"F");
      doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(7);
      doc.text("PRODUCT / DESCRIPTION",columns.product+3,y+1);
      doc.text("QTY (KG)",columns.quantity,y+1,{align:"right"});
      doc.text("UNITS",columns.units,y+1,{align:"right"});
      doc.text("RATE",columns.unitPrice,y+1,{align:"right"});
      doc.text("AMOUNT",columns.amount-3,y+1,{align:"right"});
      y+=10;
    };
    drawTableHeader();
    doc.setFont("helvetica","normal");doc.setFontSize(8);
    items.forEach((item,index)=>{
      const description=doc.splitTextToSize(item.product||"Product",columns.quantity-columns.product-8);
      const rowHeight=Math.max(11,description.length*4+5);
      if(y+rowHeight>pageHeight-27){footer(doc.getNumberOfPages());doc.addPage();drawHeader(true);y=52;drawTableHeader();}
      if(index%2===0){doc.setFillColor(247,249,247);doc.rect(margin,y-4,contentWidth,rowHeight,"F");}
      const unitPrice=Number(item.unitPrice)||Number(q.total)/(Number(item.units)||Number(q.units)||1);
      const amount=Number(item.total)||quoteLineTotal(item);
      doc.setTextColor(29,41,37);doc.setFont("helvetica","bold");doc.text(description,columns.product+3,y+2);
      doc.setFont("helvetica","normal");
      doc.text(`${Number(item.quantity)>0?Number(item.quantity):"—"}`,columns.quantity,y+2,{align:"right"});
      doc.text(`${Number(item.units)||0}`,columns.units,y+2,{align:"right"});
      doc.text(`${money(unitPrice)} / ${quotePriceBasis(item)}`,columns.unitPrice,y+2,{align:"right"});
      doc.setFont("helvetica","bold");doc.text(money(amount),columns.amount-3,y+2,{align:"right"});
      if(item.size) {doc.setFont("helvetica","normal");doc.setTextColor(112,123,116);doc.setFontSize(7);doc.text(`${item.size} ${String(item.sizeUnit||"ml").toUpperCase()} per unit  |  ${Number(item.wastage)||0} gm wastage`,columns.product+3,y+6);}
      doc.setFontSize(8);y+=rowHeight;
    });
    y+=6;
    if(q.openField){
      const notes=doc.splitTextToSize(q.openField,contentWidth-8),noteHeight=notes.length*4+12;
      if(y+noteHeight+20>pageHeight-24){footer(doc.getNumberOfPages());doc.addPage();drawHeader(true);y=52;}
      doc.setFillColor(244,248,245);doc.roundedRect(margin,y,contentWidth,noteHeight,2,2,"F");
      doc.setFont("helvetica","bold");doc.setTextColor(29,41,37);doc.setFontSize(8);doc.text("ADDITIONAL REQUIREMENTS",margin+4,y+6);
      doc.setFont("helvetica","normal");doc.text(notes,margin+4,y+12);y+=noteHeight+8;
    }
    if(y+29>pageHeight-24){footer(doc.getNumberOfPages());doc.addPage();drawHeader(true);y=52;}
    doc.setDrawColor(220,226,222);doc.line(pageWidth-87,y,pageWidth-margin,y);
    doc.setFont("helvetica","bold");doc.setTextColor(91,106,97);doc.setFontSize(8);doc.text("TOTAL (EXCLUDING TAX)",pageWidth-85,y+7);
    doc.setTextColor(20,77,59);doc.setFontSize(15);doc.text(money(q.total),pageWidth-margin,y+16,{align:"right"});
    for(let page=1;page<=doc.getNumberOfPages();page++){doc.setPage(page);footer(page);}
    doc.save(`${q.ref}.pdf`);showToast(`PDF generated for ${q.ref}.`);
  }
  function generateInvoicePdf(i) {
    if(!window.jspdf?.jsPDF){showToast("PDF library is not loaded. Refresh and try again.");return;}
    const doc=new window.jspdf.jsPDF();
    doc.setFillColor(23,107,82);doc.rect(0,0,210,32,"F");
    doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(20);doc.text(activeCompany.name,14,17);
    doc.setFontSize(9);doc.setFont("helvetica","normal");doc.text("TAX INVOICE",14,25);
    doc.setTextColor(29,41,37);doc.setFontSize(12);doc.text(i.no,14,45);
    doc.setFontSize(9);doc.text(`Customer: ${i.customer}`,14,53);doc.text(`Issue date: ${i.date}`,14,60);doc.text(`Due date: ${i.due}`,14,67);
    doc.setFont("helvetica","normal");doc.text(`Sales order: ${i.salesOrder||"Existing invoice"}`,14,75);
    let y=84;
    invoiceItems(i).forEach(item=>{
      doc.setFillColor(246,248,245);doc.rect(14,y,182,14,"F");
      doc.setFont("helvetica","bold");doc.text(`${item.product} · ${Number(item.quantity)>0?`${item.quantity} kg`:"qty not specified"} · ${item.units} units`,18,y+9);
      doc.setFont("helvetica","normal");doc.text(money(item.total),170,y+9);
      y+=18;
    });
    y+=8;doc.setFont("helvetica","bold");doc.text("Invoice total",14,y);doc.text(money(i.total),170,y);
    doc.text("Paid",14,y+8);doc.text(money(i.paid),170,y+8);
    doc.text("Outstanding",14,y+16);doc.text(money(i.total-i.paid),170,y+16);
    doc.setFont("helvetica","normal");doc.setFontSize(8);doc.text(`${activeCompany.address}  |  NTN ${activeCompany.ntn}  |  ${activeCompany.bank}`,14,280);
    doc.save(`${i.no}.pdf`);showToast(`PDF generated for ${i.no}.`);
  }
  function saveQuote() {
    const customer=document.getElementById("quote-customer").value.trim();
    if(!customers.some(c=>c.status==="Active"&&c.name.toLowerCase()===customer.toLowerCase())){showToast("Select an active customer from the suggestions before saving.");return;}
    if(quoteProductRows.length!==1||quoteProductRows.some(r=>!r.product||Number(r.units)<=0||Number(r.size)<=0||Number(r.wastage)<0||Number(r.unitPrice)<=0)){showToast("Enter exactly one complete product with units, ML / G, wastage and a valid price before saving.");return;}
    const fields=["labour","design","packaging","label","box","carton","transport"];
    const d={customer,openField:document.getElementById("quote-open-field").value.trim(),items:quoteProductRows.map(row=>({...row,quantity:actualQuantity(row),wastage:Number(row.wastage)||0,unitPrice:Number(row.unitPrice)||0,total:quoteLineTotal(row)}))};
    fields.forEach(k=>d[k]=Number(document.getElementById("quote-"+k).value)||0);
    const units=quoteProductRows.reduce((sum,r)=>sum+(Number(r.units)||0),0);
    const product=quoteProductRows[0].product;
    const quantity=d.items.reduce((sum,row)=>sum+row.quantity,0);
    const total=d.items.reduce((sum,row)=>sum+row.total,0);
    const ingredientCost=quoteProductRows.reduce((sum,row)=>sum+(products.find(p=>p.name===row.product)?.cost||0)*row.units,0);
    const productionPackagingCost=fields.reduce((sum,key)=>sum+d[key],0);
    const totalCost=ingredientCost+productionPackagingCost;
    const ref=nextReference("QQ",quickQuotes);
    const record={ref,customer,product,quantity,units,date:"18 Nov 2026",total:Math.round(total),ingredientCost,productionPackagingCost,totalCost,labour:d.labour,design:d.design,packaging:d.packaging,label:d.label,box:d.box,carton:d.carton,transport:d.transport,status:"Draft",recipe:product,items:d.items,openField:d.openField};
    quickQuotes.unshift(record);
    window.quoteDraft=null;window.quoteLoadedCustomer=null;quoteProductRows=[];showToast(`Quick Quote ${ref} saved as a draft.`);navigate("quickquotes");
  }
  function nextReference(prefix,records) {
    const highest=records.reduce((max,record)=>{
      const match=String(record.ref||"").match(new RegExp(`^${prefix}-\\d{4}-(\\d+)$`));
      return Math.max(max,Number(match?.[1])||0);
    },0);
    return `${prefix}-2026-${String(highest+1).padStart(4,"0")}`;
  }
  function submitQuickQuote(ref) {
    const quickQuote=quickQuotes.find(q=>q.ref===ref);
    if(!quickQuote||quickQuote.status!=="Draft"){showToast("Only draft Quick Quotes can be submitted.");return;}
    quickQuote.status="Submitted";quickQuoteViewRef=ref;
    navigate("quickquoteview");showToast(`Quick Quote ${ref} submitted for approval.`);
  }
  function approveQuickQuote(ref) {
    const quickQuote=quickQuotes.find(q=>q.ref===ref);
    if(!quickQuote||quickQuote.status!=="Submitted"){showToast("Only submitted Quick Quotes can be approved.");return;}
    quickQuote.status="Approved";quickQuote.approvedAt=new Date().toISOString();
    render();showToast(`Quick Quote ${ref} approved. You can now create a quotation.`);
  }
  function createQuotationFromQuickQuote(ref) {
    const quickQuote=quickQuotes.find(q=>q.ref===ref&&q.status==="Approved");
    if(!quickQuote){showToast("Only approved Quick Quotes can create a quotation.");return;}
    quotationEditRef=null;
    quotationDraft={customer:quickQuote.customer,quickQuoteRef:quickQuote.ref,items:quickQuoteItems(quickQuote),extraInfo:quickQuote.openField||""};
    navigate("newquotation");
  }
  function viewQuotation(ref) {
    if(!quotes.some(q=>q.ref===ref)){showToast("Quotation not found.");return;}
    quotationViewRef=ref;navigate("quotationview");
  }
  function editQuotation(ref) {
    const quote=quotes.find(q=>q.ref===ref);
    if(!quote||!["Draft","Submitted"].includes(quote.status)){showToast("Only draft or submitted quotations can be edited.");return;}
    quotationViewRef=ref;quotationEditRef=ref;
    quotationDraft={customer:quote.customer,quickQuoteRef:quote.sourceQuickQuote||"",items:quotationItems(quote),extraInfo:quote.openField||""};
    navigate("newquotation");
  }
  function viewQuickQuote(ref) {
    if(!quickQuotes.some(q=>q.ref===ref)){showToast("Quick Quote not found.");return;}
    quickQuoteViewRef=ref;navigate("quickquoteview");
  }
  function saveFormalQuotation() {
    const editing=Boolean(quotationEditRef);
    const existingQuote=editing?quotes.find(q=>q.ref===quotationEditRef):null;
    if(editing&&(!existingQuote||!["Draft","Submitted"].includes(existingQuote.status))){showToast("Only draft or submitted quotations can be edited.");return;}
    const customer=document.getElementById("quotation-customer").value.trim();
    const sourceRef=existingQuote?existingQuote.sourceQuickQuote||"":document.getElementById("quotation-source-quickquote")?.value||"";
    const source=sourceRef?quickQuotes.find(q=>q.ref===sourceRef&&q.customer===customer):null;
    const validCustomer=customers.some(c=>c.status==="Active"&&c.name.toLowerCase()===customer.toLowerCase());
    if(!validCustomer||(!editing&&(!source||source.status!=="Approved"))||(sourceRef&&!source)){showToast("Select a customer and one of their approved Quick Quotes before saving.");return;}
    const items=(quotationDraft?.items||[]).map(item=>({...item,units:Number(item.units)||0,unitPrice:Number(item.unitPrice)||0,quantity:item.size?actualQuantity(item):Number(item.quantity)||0,total:quoteLineTotal(item)}));
    if(!items.length||items.some(item=>!products.some(product=>product.name===item.product)||item.units<=0||item.unitPrice<=0)){showToast("Select a product and enter valid units and a rate for every quotation line.");return;}
    const total=items.reduce((sum,item)=>sum+item.total,0);
    const product=items.map(item=>item.product).join(", ");
    const quantity=items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0);
    const units=items.reduce((sum,item)=>sum+item.units,0);
    const ref=existingQuote?.ref||nextReference("QT",quotes);
    const record={...existingQuote,ref,sourceQuickQuote:sourceRef||undefined,customer,product,quantity,units,date:existingQuote?.date||"18 Nov 2026",total:Math.round(total),status:existingQuote?.status||"Draft",recipe:items.map(item=>products.find(productInfo=>productInfo.name===item.product)?.recipe||item.product).join(", "),items,openField:document.getElementById("quotation-extra-info").value.trim(),updatedAt:new Date().toISOString()};
    if(existingQuote){
      Object.assign(existingQuote,record);
      quotationViewRef=ref;quotationEditRef=null;quotationDraft=null;
      showToast(`Quotation ${ref} updated.`);navigate("quotationview");
    }else{
      quotes.unshift(record);
      quotationDraft=null;showToast(`Quotation ${ref} created from Quick Quote ${source.ref}.`);navigate("quotations");
    }
  }
  function approveQuotation(ref) {
    const quote=quotes.find(q=>q.ref===ref);
    if(!quote||quote.status!=="Submitted"){showToast("Only submitted quotations can be approved.");return;}
    quote.status="Approved";quote.approvedAt=new Date().toISOString();
    render();showToast(`Quotation ${ref} approved. You can now create its sales order.`);
  }
  function submitQuotation(ref) {
    const quote=quotes.find(q=>q.ref===ref);
    if(!quote||quote.status!=="Draft"){showToast("Only draft quotations can be submitted.");return;}
    quote.status="Submitted";
    render();showToast(`Quotation ${ref} submitted for approval.`);
  }
  function createSalesOrder(ref) {
    const quote=quotes.find(q=>q.ref===ref);
    if(!quote||quote.status!=="Approved"){showToast("Only approved quotations can be converted to a sales order.");return;}
    if(salesOrders.some(order=>order.quoteRef===ref)){showToast(`A sales order already exists for ${ref}.`);return;}
    const items=quote.items?.length?quote.items.map(item=>({...item,total:Number(item.total)||quoteLineTotal(item)})):[{product:quote.product,quantity:quote.quantity,units:quote.units||1,unitPrice:quote.total/(quote.units||1),total:quote.total}];
    const no=`SO-2026-${String(19+salesOrders.length).padStart(4,"0")}`;
    salesOrders.unshift({no,quoteRef:quote.ref,customer:quote.customer,product:quote.product,quantity:quote.quantity,units:quote.units,items,total:quote.total,date:"18 Nov 2026",status:"Open"});
    navigate("salesorders");showToast(`Sales order ${no} created from ${quote.ref}.`);
  }
  function openSalesOrderModal() {
    const eligible=quotes.filter(q=>q.status==="Approved"&&!salesOrders.some(order=>order.quoteRef===q.ref));
    if(!eligible.length){showToast("Approve a quotation before creating a sales order.");return;}
    modalShell("Create sales order",`<div class="row g-3"><div class="col-12"><label class="form-label">Approved quotation *</label><select class="form-select" id="so-quote">${eligible.map(q=>`<option value="${q.ref}">${q.ref} · ${q.customer} · ${money(q.total)}</option>`).join("")}</select></div><div class="col-12 help-copy">The customer, products, quantities and prices will be copied from the approved quotation.</div></div>`,"Create sales order",modal=>{
      const ref=document.getElementById("so-quote").value;
      modal.hide();createSalesOrder(ref);
    });
  }
  function modalShell(title,body,saveLabel,saveHandler) {
    const old=document.getElementById("active-modal");if(old)old.remove();
    const wrap=document.createElement("div");wrap.id="active-modal";wrap.innerHTML=`<div class="modal fade" tabindex="-1"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${title}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">${body}</div><div class="modal-footer"><button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary" id="modal-save">${saveLabel}</button></div></div></div></div>`;
    document.body.appendChild(wrap);const modal=new bootstrap.Modal(wrap.querySelector(".modal"));wrap.querySelector("#modal-save").onclick=()=>saveHandler(modal);modal.show();wrap.querySelector(".modal").addEventListener("hidden.bs.modal",()=>wrap.remove());
  }
  function openMasterModal(kind) {
    const isCustomer=kind==="customers", isVendor=kind==="vendors", entity=isCustomer?"customer":isVendor?"vendor":"company";
    const fields=isCustomer?[["name","Customer name"],["number","Customer number"],["email","Email"],["city","City"]]:
      isVendor?[["name","Vendor name"],["address","Address"],["city","City"],["phone","Phone"],["bank","Bank"],["country","Country"],["email","Email"],["ntn","NTN"]]:
      [["name","Company name"],["address","Address"],["ntn","NTN"],["phone","Phone"],["email","Email"],["bank","Bank"],["city","City"],["country","Country"]];
    modalShell(`Add ${entity}`,`<div class="row g-3">${fields.map(([id,label])=>`<div class="${fields.length>4?"col-md-6":"col-md-6"}"><label class="form-label">${label} *</label><input class="form-control" id="master-${id}" placeholder="${label}"></div>`).join("")}</div>`, `Save ${entity}`,modal=>{
      const record={};fields.forEach(([id])=>record[id]=document.getElementById("master-"+id).value.trim());
      if(fields.some(([id])=>!record[id])){showToast("Please complete all required fields.");return;}
      if(isCustomer){record.status="Active";record.quotes=0;customers.unshift(record);}
      else if(isVendor){record.number=`VEN-${String(17+vendors.length).padStart(5,"0")}`;record.status="Active";vendors.unshift(record);}
      else companies.unshift(record);
      modal.hide();render();showToast(`${entity[0].toUpperCase()+entity.slice(1)} added successfully.`);
    });
  }
  function openIngredientModal(index) {
    const item=index===undefined?{name:"",price:"",vendor:vendors[0].name}:ingredients[index];
    modalShell(index===undefined?"Add ingredient":"Update ingredient",`<div class="row g-3"><div class="col-md-6"><label class="form-label">Ingredient name *</label><input class="form-control" id="ing-name" value="${esc(item.name)}"></div><div class="col-md-6"><label class="form-label">Price per kg (PKR) *</label><input type="number" class="form-control" id="ing-price" value="${item.price}"></div><div class="col-md-6"><label class="form-label">Vendor</label><select class="form-select" id="ing-vendor">${selectOptions(vendors.map(v=>v.name),item.vendor)}</select></div><div class="col-md-6"><label class="form-label">COA / literature</label><input type="file" class="form-control" id="ing-file"><div class="form-hint">Prototype only — uploaded file is not stored.</div></div></div>`,index===undefined?"Add ingredient":"Save changes",modal=>{
      const name=document.getElementById("ing-name").value.trim(),price=Number(document.getElementById("ing-price").value);
      if(!name||price<=0){showToast("Enter an ingredient name and valid price.");return;}
      if(index===undefined) ingredients.unshift({name,code:`ING-${String(ingredients.length+19).padStart(4,"0")}`,price,vendor:document.getElementById("ing-vendor").value,updated:"18 Nov 2026",status:"Active"});
      else Object.assign(ingredients[index],{name,price,vendor:document.getElementById("ing-vendor").value,updated:"18 Nov 2026"});
      modal.hide();render();showToast("Ingredient saved. Price history updated.");
    });
  }
  function openSlabModal(index) {
    const x=index===undefined?{min:"",max:"",unit:""}:slabs[index];
    modalShell(index===undefined?"Add weight price slab":"Edit weight price slab",`<div class="row g-3"><div class="col-md-4"><label class="form-label">Minimum kg *</label><input type="number" min="1" class="form-control" id="slab-min" value="${x.min===31?"":x.min}"></div><div class="col-md-4"><label class="form-label">Maximum kg</label><input type="number" min="1" class="form-control" id="slab-max" value="${x.max===9999?"":x.max}" placeholder="Leave blank for no limit"></div><div class="col-md-4"><label class="form-label">Price per unit (PKR) *</label><input type="number" min="1" class="form-control" id="slab-unit" value="${x.unit}"></div><div class="col-12"><div class="help-copy">Ranges must not overlap. A blank maximum creates an open-ended slab (e.g. Above 30 kg).</div></div></div>`, "Save slab",modal=>{
      const min=Number(document.getElementById("slab-min").value),rawMax=document.getElementById("slab-max").value,max=rawMax?Number(rawMax):9999,unit=Number(document.getElementById("slab-unit").value);
      if(min<1||max<min||unit<=0){showToast("Enter a valid range and price.");return;}
      if(slabs.some((s,i)=>i!==index&&min<=s.max&&max>=s.min)){showToast("This range overlaps an existing price slab.");return;}
      const obj={min,max,label:max===9999?`Above ${min-1} kg`:`${min}–${max} kg`,unit};
      if(index===undefined)slabs.push(obj);else slabs[index]=obj;
      slabs.sort((a,b)=>a.min-b.min);modal.hide();render();showToast("Price slab saved.");
    });
  }
  function openRecipeModal(index) {
    const p=index===undefined?{name:"",code:"",category:"Skincare",unitPrice:""}:products[index];
    ingredientRows=index===undefined?[{ingredient:ingredients[0].name,qty:0.04},{ingredient:ingredients[1].name,qty:0.025},{ingredient:ingredients[3].name,qty:0.005}]:[{ingredient:ingredients[0].name,qty:0.04},{ingredient:ingredients[2].name,qty:0.02}];
    const body=`<div class="row g-3 mb-4"><div class="col-md-5"><label class="form-label">Product / recipe name *</label><input class="form-control" id="recipe-name" value="${esc(p.name)}" placeholder="e.g. Citrus Hand Lotion"></div><div class="col-md-3"><label class="form-label">Category</label><select class="form-select" id="recipe-category">${selectOptions(["Skincare","Body care","Hair care"],p.category)}</select></div><div class="col-md-2"><label class="form-label">Selling price / unit *</label><input type="number" min="0.01" step="0.01" class="form-control" id="recipe-unit-price" value="${p.unitPrice||""}"></div><div class="col-md-2"><label class="form-label">Approval status</label><select class="form-select" id="recipe-status">${selectOptions(["Draft","In review","Approved"],p.status||"Draft")}</select></div></div>
      <div class="split-heading mb-2"><div><div class="section-label mb-0">BOM ingredients</div><div class="form-hint">Quantity per finished unit · ingredient unit price is per kg</div></div><button class="btn btn-light" id="recipe-add-row"><i class="bi bi-plus me-1"></i>Add ingredient</button></div>
      <div class="recipe-line" style="color:#929c96;font-size:9px"><div>INGREDIENT</div><div>QTY (KG / UNIT)</div><div>PRICE / KG</div><div>LINE COST</div><div></div></div><div id="recipe-rows"></div>
      <div class="d-flex justify-content-end pt-2"><div class="detail-box" style="min-width:200px"><div class="detail-label">Calculated cost per unit</div><div class="detail-value text-success fs-6" id="recipe-total">Rs 0</div></div></div>`;
    modalShell(index===undefined?"New product recipe":"Edit product recipe",body,"Save recipe version",modal=>{
      const name=document.getElementById("recipe-name").value.trim();
      const unitPrice=Number(document.getElementById("recipe-unit-price").value);
      if(!name||unitPrice<=0){showToast("Enter a product name and a valid selling price per unit.");return;}
      const cost=ingredientRows.reduce((sum,r)=>sum+Number(r.qty)*Number(ingredients.find(i=>i.name===r.ingredient)?.price||0),0);
      const record={name,code:p.code||`PRD-${String(products.length+12).padStart(4,"0")}`,category:document.getElementById("recipe-category").value,recipe:`RC-${String(products.length+12).padStart(4,"0")} · v${index===undefined?1:3}`,cost:Math.round(cost),unitPrice,status:document.getElementById("recipe-status").value};
      if(index===undefined)products.unshift(record);else products[index]=record;
      modal.hide();render();showToast("Recipe version saved with ingredient costing.");
    });
    const paintRows=()=>{
      const c=document.getElementById("recipe-rows");if(!c)return;
      c.innerHTML=ingredientRows.map((r,i)=>{const ing=ingredients.find(x=>x.name===r.ingredient)||ingredients[0];return `<div class="recipe-line"><select class="form-select recipe-ingredient" data-i="${i}">${selectOptions(ingredients.map(x=>x.name),r.ingredient)}</select><input class="form-control recipe-qty" data-i="${i}" type="number" min="0" step="0.001" value="${r.qty}"><input class="form-control readonly" readonly value="${money(ing.price)}"><div class="form-control readonly recipe-line-total">${money(ing.price*r.qty)}</div><button class="icon-btn recipe-remove" data-i="${i}"><i class="bi bi-x"></i></button></div>`;}).join("");
      const total=ingredientRows.reduce((a,r)=>a+Number(r.qty)*(ingredients.find(x=>x.name===r.ingredient)?.price||0),0);document.getElementById("recipe-total").textContent=money(total);
      c.querySelectorAll(".recipe-ingredient").forEach(e=>e.onchange=()=>{ingredientRows[Number(e.dataset.i)].ingredient=e.value;paintRows();});
      c.querySelectorAll(".recipe-qty").forEach(e=>e.oninput=()=>{ingredientRows[Number(e.dataset.i)].qty=Number(e.value);paintRows();});
      c.querySelectorAll(".recipe-remove").forEach(e=>e.onclick=()=>{ingredientRows.splice(Number(e.dataset.i),1);paintRows();});
    };
    document.getElementById("recipe-add-row").onclick=()=>{ingredientRows.push({ingredient:ingredients[0].name,qty:0});paintRows();};
    paintRows();
  }
  function openInvoiceModal(salesOrderNo) {
    const available=salesOrders.filter(order=>!invoices.some(invoice=>invoice.salesOrder===order.no));
    const order=salesOrderNo?available.find(item=>item.no===salesOrderNo):available[0];
    if(!order){showToast(salesOrders.length?"There are no uninvoiced sales orders. Create a sales order first.":"Approve a quotation and create a sales order before invoicing.");if(!salesOrders.length)navigate("salesorders");return;}
    modalShell("Create invoice",`<div class="row g-3"><div class="col-md-6"><label class="form-label">Sales order</label><input class="form-control readonly" readonly value="${order.no}"></div><div class="col-md-6"><label class="form-label">Customer</label><input class="form-control readonly" readonly value="${esc(order.customer)}"></div><div class="col-md-6"><label class="form-label">Issue date *</label><input class="form-control" type="date" id="inv-date" value="2026-11-18"></div><div class="col-md-6"><label class="form-label">Due date *</label><input class="form-control" type="date" id="inv-due" value="2026-12-18"></div><div class="col-12 detail-box"><div class="detail-label">Sales order total</div><div class="detail-value">${money(order.total)}</div></div><div class="col-12 help-copy">Invoice lines, customer and total are copied from this sales order. Each order can be invoiced once.</div></div>`, "Create invoice",modal=>{
      const current=salesOrders.find(item=>item.no===order.no);
      if(!current||invoices.some(invoice=>invoice.salesOrder===current.no)){showToast("This sales order has already been invoiced.");return;}
      const date=document.getElementById("inv-date").value,due=document.getElementById("inv-due").value;
      if(!date||!due||due<date){showToast("Enter valid issue and due dates; the due date cannot be earlier than the issue date.");return;}
      const no=`INV-2026-${String(29+invoices.length-4).padStart(4,"0")}`;
      const items=current.items.map(item=>({...item}));
      invoices.unshift({no,salesOrder:current.no,customer:current.customer,date:formatDate(date),due:formatDate(due),total:current.total,paid:0,status:"Issued",items,item:`${current.product} · ${current.units||1} units`});
      modal.hide();navigate("invoices");showToast(`Invoice ${no} created from sales order ${current.no}.`);
    });
  }
  function formatDate(value) { return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}); }
  function openPaymentModal(invoice) {
    const openInvoices=invoices.filter(i=>i.total>i.paid);
    const chosen=invoice||openInvoices[0];
    modalShell("Record payment",`<div class="row g-3">
      <div class="col-md-6"><label class="form-label">Payment type</label><select class="form-select" id="pay-type"><option>Customer receipt</option><option>Vendor payment</option></select></div>
      <div class="col-md-6"><label class="form-label">Payment date *</label><input type="date" class="form-control" id="pay-date" value="2026-11-18"></div>
      <div class="col-md-6"><label class="form-label">Customer / vendor *</label><select class="form-select" id="pay-party">${selectOptions([...customers.filter(c=>c.status==="Active").map(c=>c.name),...vendors.map(v=>v.name)],chosen?.customer||customers[0].name)}</select></div>
      <div class="col-md-6"><label class="form-label">Invoice allocation</label><select class="form-select" id="pay-invoice"><option value="">Unapplied</option>${openInvoices.map(i=>`<option value="${i.no}" ${chosen?.no===i.no?"selected":""}>${i.no} · balance ${money(i.total-i.paid)}</option>`).join("")}</select></div>
      <div class="col-md-6"><label class="form-label">Amount (PKR) *</label><input type="number" min="1" class="form-control" id="pay-amount" value="${chosen?chosen.total-chosen.paid:""}"></div>
      <div class="col-md-6"><label class="form-label">Payment method</label><select class="form-select" id="pay-method">${selectOptions(["Bank transfer","Cash","Cheque","Card","Electronic"],"Bank transfer")}</select></div>
      <div class="col-md-6"><label class="form-label">Reference / cheque no.</label><input class="form-control" id="pay-ref" placeholder="e.g. TRX-218463"></div>
      <div class="col-md-6"><label class="form-label">Bank</label><input class="form-control" id="pay-bank" placeholder="Bank name"></div>
      <div class="col-12"><label class="form-label">Notes</label><input class="form-control" id="pay-notes" placeholder="Optional notes"></div>
      <div class="col-12 help-copy"><i class="bi bi-info-circle me-1"></i>Payment allocation cannot exceed outstanding balance. Confirmation creates an immutable payment entry.</div></div>`, "Confirm payment",modal=>{
      const amount=Number(document.getElementById("pay-amount").value),invno=document.getElementById("pay-invoice").value,party=document.getElementById("pay-party").value;
      if(amount<=0){showToast("Enter a valid payment amount.");return;}
      const target=invoices.find(i=>i.no===invno);
      if(target&&amount>target.total-target.paid){showToast("Payment exceeds the invoice outstanding balance.");return;}
      const type=document.getElementById("pay-type").value==="Vendor payment"?"Vendor":"Customer";
      if(target){target.paid+=amount;target.status=target.paid===target.total?"Paid":"Partially Paid";}
      const ref=`PAY-2026-${String(34+payments.length).padStart(4,"0")}`;
      payments.unshift({ref,date:"18 Nov 2026",party,invoice:target?target.no:"Unapplied",method:document.getElementById("pay-method").value,amount,status:"Confirmed",type:type==="Vendor"?"Vendor":"Customer"});
      modal.hide();if(selectedInvoice){selectedInvoice=target||selectedInvoice;}render();showToast(`Payment ${ref} confirmed and allocated.`);
    });
    const typeEl=document.getElementById("pay-type");
    typeEl.onchange=()=>{const partyEl=document.getElementById("pay-party");const invoiceEl=document.getElementById("pay-invoice");const isVendor=typeEl.value==="Vendor payment";const list=isVendor?vendors.map(v=>v.name):customers.filter(c=>c.status==="Active").map(c=>c.name);partyEl.innerHTML=selectOptions(list,list[0]);invoiceEl.disabled=isVendor;if(isVendor)invoiceEl.value="";};
    document.getElementById("pay-invoice").onchange=e=>{const i=invoices.find(x=>x.no===e.target.value);if(i)document.getElementById("pay-amount").value=i.total-i.paid;};
  }
  function renderLogin() {
    app.innerHTML=`<div class="login-screen"><section class="login-visual"><div class="brand login-logo"><div class="brand-mark" style="background:#fff;color:var(--green)">i</div><div><div class="brand-name" style="color:#fff">Iffe</div><div class="brand-tag" style="color:rgba(255,255,255,.6)">Business workspace</div></div></div><div><div class="eyebrow" style="color:#b4d7c7">A calmer way to run your business</div><h1 class="login-main-title">Everything in your business, in one place.</h1><p class="login-copy">From your first customer quote to the final payment — manage your products, costs and customer relationships with clarity.</p></div><div class="login-visual-foot">© 2026 Iffe ERP · Prototype preview</div></section>
      <section class="login-form-side"><form class="login-form" id="login-form"><div class="eyebrow">Welcome back</div><h2>Sign in to your workspace</h2><p class="page-subtitle mb-4">Use the demo account to explore the Iffe ERP prototype.</p>
        <label class="form-label" for="login-email">Email address</label><input class="form-control mb-3" id="login-email" type="email" value="ayesha@Iffenaturals.pk" required>
        <label class="form-label" for="login-password">Password</label><div class="input-group mb-3"><input class="form-control" id="login-password" type="password" value="Iffe-demo" required><button class="btn btn-light" type="button" id="toggle-password"><i class="bi bi-eye"></i></button></div>
        <div class="d-flex justify-content-between align-items-center mb-4"><label class="d-flex align-items-center gap-2" style="font-size:11px;color:#68746d"><input type="checkbox" checked> Remember me</label><a href="#" id="forgot-password" style="font-size:11px;color:var(--green);text-decoration:none">Forgot password?</a></div>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in <i class="bi bi-arrow-right ms-1"></i></button>
        <div class="login-demo-hint"><i class="bi bi-info-circle me-1"></i>Demo mode — any valid email and password will open the workspace. No credentials are sent or stored.</div>
      </form></section></div>`;
    document.getElementById("login-form").onsubmit=e=>{e.preventDefault();render();};
    document.getElementById("toggle-password").onclick=()=>{const p=document.getElementById("login-password");p.type=p.type==="password"?"text":"password";};
    document.getElementById("forgot-password").onclick=e=>{e.preventDefault();showToast("Password reset is not connected in this browser-only demo.");};
  }
  renderLogin();
})();
