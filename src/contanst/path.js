const PATH = {
    PRODUCT:{
        LIST_PRODUCT: "product",
        DETAIL_PRODUCT: ":id",
    },
    HOME: "home",
    LOGIN: "/login",
    CART: "cart",
    ADMIN:{
        BASE: '/admin/*',
        CUSTOMER: 'manage-customer',
        PRODUCTS: 'manage-products'
    },
    PROFILE: 'profile',
    NOT_FOUND: 'not-found',
}

export default PATH;