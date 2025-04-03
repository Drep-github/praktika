var app = new Vue({
    el: "#bananas",
    data: {
        products: [
            {
                id: 1,
                title: "Red Banana",
                short_text: "Sweet and Nutritious Red Banana",
                image: 'images/banana1.png',
                desc: {
                    plant: {
                        p1: "Medium-sized plant with strong disease resistance.",
                        p2: "High yield and excellent adaptability to tropical climates.",
                        p3: "Produces fruit in 8-10 months after planting."
                    },
                    fruit: {
                        f1: "Distinctive red peel with a creamy, slightly raspberry-like flavor.",
                        f2: "Rich in vitamin C, beta-carotene, and potassium.",
                        f3: "Average fruit size: 12-15 cm long."
                    },
                    cycle: {c1: "Spring", c2: "Summer"},
                    color: "Red"
                }
            },
            {
                id: 2,
                title: "Green Banana",
                short_text: "Firm and Starchy Green Banana",
                image: 'images/banana2.png',
                desc: {
                    plant: {
                        p1: "Strong, tall plant resistant to major banana diseases.",
                        p2: "Adapted for cooking and fresh consumption.",
                        p3: "Fruits mature in 9-12 months after planting."
                    },
                    fruit: {
                        f1: "Firm texture, commonly used for cooking and frying.",
                        f2: "Rich in resistant starch, ideal for digestive health.",
                        f3: "Average fruit size: 15-20 cm long."
                    },
                    cycle: {c1: "Spring", c2: "Autumn"},
                    color: "Green"
                }
            },
            {
                id: 3,
                title: "Yellow Banana",
                short_text: "Classic Sweet Yellow Banana",
                image: 'images/banana3.png',
                desc: {
                    plant: {
                        p1: "Compact plant suitable for high-density cultivation.",
                        p2: "Highly productive with good disease resistance.",
                        p3: "Fruits mature in 8-10 months."
                    },
                    fruit: {
                        f1: "Bright yellow peel with a soft, sweet texture.",
                        f2: "Excellent source of energy and dietary fiber.",
                        f3: "Average fruit size: 18-22 cm long."
                    },
                    cycle: {c1: "Spring", c2: "Winter"},
                    color: "Yellow"
                }
            },
            {
                id: 4,
                title: "Golden Banana",
                short_text: "Premium Small-Sized Yellow Banana",
                image: 'images/banana4.png',
                desc: {
                    plant: {
                        p1: "Short plant ideal for backyard and commercial farming.",
                        p2: "Produces multiple hands per bunch.",
                        p3: "Fruits mature in 7-9 months."
                    },
                    fruit: {
                        f1: "Thin peel with a rich, honey-like sweetness.",
                        f2: "Great for fresh consumption and desserts.",
                        f3: "Average fruit size: 10-14 cm long."
                    },
                    cycle: {c1: "Spring", c2: "Summer"},
                    color: "Yellow"
                }
            },
            {
                id: 5,
                title: "Baby Banana",
                short_text: "Miniature Sweet Yellow Banana",
                image: 'images/banana5.png',
                desc: {
                    plant: {
                        p1: "Dwarf plant, perfect for indoor or small garden cultivation.",
                        p2: "Fast-growing with high fruit yield.",
                        p3: "Fruits mature in 6-8 months."
                    },
                    fruit: {
                        f1: "Tiny, bite-sized bananas with intense sweetness.",
                        f2: "Popular as a snack or in fruit salads.",
                        f3: "Average fruit size: 8-12 cm long."
                    },
                    cycle: {c1: "Spring", c2: "Autumn"},
                    color: "Yellow"
                }
            }
        ],
        product: [],
        cart: [],
        contactFields: [{
            name: "",
            companyName: "",
            position: "",
            city: "",
            country: "",
            telephone: "",
            email: "",
            youAre: "",
            otherSpecify: "",
            interested: "",
            capcha: ""
        }],
        btnVisible: 0,
        cartVisible: 0,
        formSubmitted: false,
        formVisible: 1
    },
    mounted: function () {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods: {
        getProduct: function () {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) this.product = this.products[i];
                    }
                }
            }
        },
        addToCart: function (id) {
            if (window.localStorage.getItem('cart')) {
                this.cart = window.localStorage.getItem('cart').split(',');
            }

            if (this.cart.indexOf(String(id)) == -1) {
                this.cart.push(id);
                window.localStorage.setItem('cart', this.cart.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function () {
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) this.btnVisible = 1;
            if (window.localStorage.getItem('cart') !== null) this.cartVisible = 1;
        },
        getCart: function () {
            if (window.localStorage.getItem('cart')) {
                this.cart = window.localStorage.getItem('cart').split(',');
                for (var value of this.cart) {
                    for (var index in this.products) {
                        if (value == this.products[index].id) {
                            this.product.push(this.products[index])
                        }
                    }
                }
            }
        },
        removeFromCart: function (id) {
            for (var index in this.product) {
                if (id == this.product[index].id) {
                    this.product.splice(index, 1);
                    this.cart.splice(index, 1)
                }
            }
            window.localStorage.setItem('cart', this.cart.join(','));
            this.getCart();
            location.reload();
        },
        makeOrder: function () {

            this.formVisible = 0;
            this.cartVisible = 0;

            this.cart = [];
            window.localStorage.removeItem('cart');
        }
    },
});