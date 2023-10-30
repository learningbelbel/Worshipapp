export const CustomerService = {
    getData() {
        return [
            {
                id: 1000,
                date: '2015-09-13',
                status: 'unqualified',
                user: {
                    name: 'Ioni Bowcher'
                },
                amount: 5
            },
            {
                id: 1000,
                date: '2015-09-13',
                status: 'unqualified',
                user: {
                    name: 'Ioni Bowcher',
                },
                amount: 5
            }
        ]
    },
    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    }
}
