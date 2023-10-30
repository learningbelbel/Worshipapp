export const ProductService = {
    
    getProductsWithOrdersData() {
        return [
            {
                name: 'Bamboo Watch',
                orders: [
                    {
                        date: '2020-09-13',
                        amount: 65,
                        customer: 'David James',
                    },
                    {
                        date: '2020-05-14',
                        amount: 130,
                        customer: 'Leon Rodrigues',
                    },
                    {
                        date: '2019-01-04',
                        amount: 65,
                        customer: 'Juan Alejandro',
                    },
                    {
                        date: '2020-09-13',
                        amount: 195,
                        customer: 'Claire Morrow',
                    }
                ]
            },
        ]
    },
    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    }
}