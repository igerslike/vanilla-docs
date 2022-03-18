import {createServer, Model, Factory, Request} from "miragejs";
// @ts-ignore
import { Pagination } from 'paginatedjs';
import { faker } from '@faker-js/faker';

/** Fake a look a like Laravel Pagination */
const paginate = (records: Record<string, any>[], request: Request, baseUrl: string) => {
    const total = records.length;
    const perPage = Number(request.queryParams["perPage"] || 0);
    const page = Number(request.queryParams["page"] || 1);
    const paginationInstance = new Pagination(records,perPage)

    paginationInstance.goToPage(page);

    const hasNextPage = paginationInstance.hasMore();
    const hasPreviousPage = paginationInstance.pageNumber > 1;
    const nextPage = paginationInstance.pageNumber+1;
    const previousPage = paginationInstance.pageNumber-1;
    const items = paginationInstance.getPaginated(true);
    const totalPages = paginationInstance.nbPages;
    const showingFrom = (Number(page) -1) * Number(perPage);
    const showTo = showingFrom+perPage;

    let pagesList = [];
    for (let i = 1; i < totalPages; i++) {
        pagesList.push({
            url: baseUrl+'/?page='+i,
            label: i,
            active: i === page
        });
    }

    return {
        data: items,
        links: {
            next: hasNextPage ? baseUrl+'/?page='+nextPage : null,
            previous: hasPreviousPage ? baseUrl+'/?page='+previousPage : null,
            pages: pagesList
        },
        meta: {
            current_page: page,
            from: showingFrom,
            to: showTo,
            total: total,
        },
        responses: {}
    }
};

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
                id(i){
                    return i;
                },
                gateway(i) {
                    return faker.random.arrayElement(['Paypal','Bank Transfer','Credit Card','Bitcoin','Ethereum']);
                },
                amount(i){
                    return faker.datatype.number({min: 10, max: 230})+'€'
                },
                status(i){
                    return faker.random.arrayElement(['Completed','Pending','Refunded']);
                }
            }),
        },

        seeds(server) {
            server.createList('payment', 1000)
        },

        routes() {
            this.get("/datatable/rest/", (schema,request) => {

                return paginate(
                    schema.db.payments,
                    request,
                    '/datatable/rest'
                )
            })
        },
    });
}