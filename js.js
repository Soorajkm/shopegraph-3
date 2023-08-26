bodyload = () => {
  const navbar = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    {
      name: "Our Products",
      id: "product",
      child: [
        { name: "Product 1", id: "p1" },
        { name: "Product 2", id: "p2" },
        { name: "Product 3", id: "p3" },
        { name: "Product 4", id: "p4" },
      ],
    },
    { name: "Contact Us", id: "contact" },
  ];
  navbar.map((menu) => {
    var li = document.createElement("li");
    li.innerHTML = menu.name;
    document.querySelector("ul").appendChild(li);
  });

  LoadCategories();
  LoadProducts("https://fakestoreapi.com/products");
};

LoadCategories = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => {
      return response.json();
    })
    .then((categories) => {
      categories.unshift("all");
      categories.map((category) => {
        var option = document.createElement("option");
        option.text = category.text = category.toUpperCase();
        option.value = category;
        document.getElementById("lstCategories").appendChild(option);
      });
    });
};

LoadProducts = (url) => {
  document.querySelector("article").innerHTML = "";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((products) => {
      products.map((product) => {
        var div = document.createElement("div");
        div.className = "card m-2 p-2";
        div.style.width = "200px";
        div.innerHTML = `
                                    <img src = ${product.image} height="140px" class="card-img-top">
                                    <div class="card-header overflow-auto" style="height:120px">
                                        <p>${product.title}</p>
                                    </div>
                    `;
        document.querySelector("article").appendChild(div);
      });
    });
};
CategoryChange = () => {
  var categoryName = document.getElementById("lstCategories").value;
  if (categoryName == "all") {
    LoadProducts("http://fakestoreapi.com/products");
  } else {
    LoadProducts(`http://fakestoreapi.com/products/category/${categoryName}`);
  }
};
