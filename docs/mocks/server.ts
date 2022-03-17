import { createServer, Model, Factory } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
    return createServer({
        environment,
        logging: false,
        trackRequests: false,

        models: {
            payment: Model,
        },

        factories: {
            payment: Factory.extend({
                name(i) {
                    return `Payment ${i}`;
                },
            }),
        },

        seeds(server) {
            //server.create("payments", { name: "Bob" })
            server.create("payment", { name: "Alice" })
            server.createList('payment', 10)
        },

        routes() {
            //this.namespace = "api"
            this.get("/datatable/rest/", (schema,request) => {
                console.log(request);
                return {
                    data: schema.payments.all(),
                    links: {
                        next: '/datatable/rest/?page=2',
                        previous: '/datatable/rest/?page=1',
                        pages: [
                            {url: '/datatable/rest/?page=1', label: 1, active: true},
                            {url: '/datatable/rest/?page=2', label: 2, active: true},
                            {url: '/datatable/rest/?page=3', label: 3, active: true},
                            {url: '/datatable/rest/?page=4', label: 4, active: true},
                        ]
                    },
                    meta: {
                        current_page: 1,
                        from: 1,
                        to: 10,
                        total: 100,
                    },
                    responses: {}
                }
            })
        },
    });
}