createApp({
    name: "ShopifyProductVariant",
    render: () => {
        return h(Shopify, {
            data: {
                block_element_selector: block_element_selector,
                option_block_selector: option_block_selector,
                isConflictTheme: isConflictTheme,
                themeData: themeData
            }
        })
    }
}).mount("#nestscale-product-variant")