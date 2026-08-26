const products = [

  {
    id: "ENG-001",
    name: "Heavy Duty Air Filter",
    category: "filters",
    description: "Commercial truck engine air filter.",
    partNumber: "KJK-AF-001",
    icon: "🔵"
  },

  {
    id: "ENG-002",
    name: "Diesel Fuel Filter",
    category: "filters",
    description: "Heavy-duty diesel fuel filtration.",
    partNumber: "KJK-FF-001",
    icon: "⚙️"
  },

  {
    id: "BRK-001",
    name: "Brake Pad Set",
    category: "brakes",
    description: "Heavy-duty commercial vehicle brake pads.",
    partNumber: "KJK-BP-001",
    icon: "🛑"
  },

  {
    id: "BRK-002",
    name: "Brake Disc",
    category: "brakes",
    description: "Heavy-duty truck brake disc.",
    partNumber: "KJK-BD-001",
    icon: "⭕"
  },

  {
    id: "BRK-003",
    name: "Brake Drum",
    category: "brakes",
    description: "Commercial truck brake drum.",
    partNumber: "KJK-BD-002",
    icon: "⭕"
  },

  {
    id: "CLT-001",
    name: "Heavy Duty Clutch Kit",
    category: "clutch",
    description: "Complete commercial vehicle clutch kit.",
    partNumber: "KJK-CL-001",
    icon: "⚙️"
  },

  {
    id: "GBX-001",
    name: "Gearbox Bearing",
    category: "gearbox",
    description: "Heavy-duty transmission bearing.",
    partNumber: "KJK-GB-001",
    icon: "⚙️"
  },

  {
    id: "SUS-001",
    name: "Shock Absorber",
    category: "suspension",
    description: "Heavy-duty truck suspension shock absorber.",
    partNumber: "KJK-SA-001",
    icon: "🔧"
  },

  {
    id: "SUS-002",
    name: "Air Suspension Bag",
    category: "suspension",
    description: "Commercial truck air suspension component.",
    partNumber: "KJK-AS-001",
    icon: "🔘"
  },

  {
    id: "STR-001",
    name: "Steering Component",
    category: "steering",
    description: "Heavy-duty steering replacement component.",
    partNumber: "KJK-ST-001",
    icon: "🔩"
  },

  {
    id: "ELE-001",
    name: "Truck Alternator",
    category: "electrical",
    description: "Commercial vehicle alternator.",
    partNumber: "KJK-ALT-001",
    icon: "⚡"
  },

  {
    id: "ELE-002",
    name: "Truck Starter Motor",
    category: "electrical",
    description: "Heavy-duty diesel starter motor.",
    partNumber: "KJK-STR-001",
    icon: "⚡"
  },

  {
    id: "COL-001",
    name: "Truck Radiator",
    category: "cooling",
    description: "Heavy-duty engine cooling radiator.",
    partNumber: "KJK-RAD-001",
    icon: "🧊"
  },

  {
    id: "COL-002",
    name: "Water Pump",
    category: "cooling",
    description: "Commercial diesel engine water pump.",
    partNumber: "KJK-WP-001",
    icon: "💧"
  },

  {
    id: "LGT-001",
    name: "LED Truck Headlight",
    category: "lighting",
    description: "Heavy-duty LED truck lighting.",
    partNumber: "KJK-LT-001",
    icon: "💡"
  },

  {
    id: "TRY-001",
    name: "Heavy Truck Tyre",
    category: "tyres",
    description: "Commercial truck tyre. Confirm size and application when ordering.",
    partNumber: "KJK-TY-001",
    icon: "🛞"
  },

  {
    id: "TRY-002",
    name: "Trailer Tyre",
    category: "tyres",
    description: "Commercial trailer tyre. Confirm size and load rating.",
    partNumber: "KJK-TY-002",
    icon: "🛞"
  },

  {
    id: "TRL-001",
    name: "Trailer Brake Component",
    category: "trailer",
    description: "Heavy-duty trailer braking component.",
    partNumber: "KJK-TR-001",
    icon: "🔧"
  }

];

const grid = document.getElementById("productGrid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const cartCount = document.getElementById("cartCount");

function getCart() {
  return JSON.parse(localStorage.getItem("kjkCart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("kjkCart", JSON.stringify(cart));
}

function updateCartCount() {
  if (!cartCount) return;

  const cart = getCart();

  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function addToCart(id) {

  const product = products.find(item => item.id === id);

  if (!product) return;

  const cart = getCart();

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartCount();

  alert(`${product.name} added to your quotation basket.`);
}

function renderProducts() {

  const term = search.value.toLowerCase().trim();
  const selectedCategory = category.value;

  const filtered = products.filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.partNumber.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!filtered.length) {
    grid.innerHTML =
      `<div class="empty">No products found.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(product => `

    <article class="product-card">

      <div class="product-image">
        ${product.icon}
      </div>

      <div class="product-info">

        <div class="product-category">
          ${product.category.toUpperCase()}
        </div>

        <h3>${product.name}</h3>

        <p>${product.description}</p>

        <div class="part-number">
          Part No: ${product.partNumber}
        </div>

        <div class="product-actions">

          <span class="product-price">
            Price on Request
          </span>

          <button
            class="add-button"
            onclick="addToCart('${product.id}')">
            Add to Quote
          </button>

        </div>

      </div>

    </article>

  `).join("");
}

search.addEventListener("input", renderProducts);
category.addEventListener("change", renderProducts);

document.getElementById("year").textContent =
  new Date().getFullYear();

renderProducts();
updateCartCount();
