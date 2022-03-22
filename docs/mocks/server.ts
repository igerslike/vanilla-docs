import {createServer, Model, Factory, Request} from "miragejs";
// @ts-ignore
import { Pagination } from 'paginatedjs';
import { faker } from '@faker-js/faker';
import orderBy from 'lodash/orderBy';
import each from 'lodash/each';
import Fuse from 'fuse.js';
import Ref from 'vue';

/** Fake a look a like Laravel Pagination */
const paginate = (records: Record<string, any>[], request: Request, baseUrl: string) => {

    let postData = JSON.parse(request.requestBody);

    if(postData) {
        console.log('👉 Got Post from Fake API', postData)
    }

    // Search the items function
    const search = (query: string, collection: ReadonlyArray<unknown>) => {

        const options = {
            includeScore: false,
            threshold: 0.3,
            keys: [
                'id',
                'gateway',
                'amount',
                'status'
            ],
        };

        const fuse = new Fuse(collection, options);
        const results = fuse.search(query);
        const filtered = [] as string[];

        each(results, (result: object) => {
            filtered.push(result.item);
        });

        return filtered;
    }

    // Search the items
    const searchQuery = request.queryParams["search"] || postData.search || null;
    if(searchQuery !== null) {
        console.log('🔍 Searching', searchQuery);
        records = search(searchQuery, records);
    }

    const total = records.length;
    const perPage = Number(request.queryParams["perPage"] || postData.perPage || 0);
    const page = Number(request.queryParams["page"] ||  postData.page || 1);
    const paginationInstance = new Pagination(records,perPage);

    paginationInstance.goToPage(page);

    const hasNextPage = paginationInstance.hasMore();
    const hasPreviousPage = paginationInstance.pageNumber > 1;
    const nextPage = paginationInstance.pageNumber+1;
    const previousPage = paginationInstance.pageNumber-1;
    let items = paginationInstance.getPaginated(true);
    const totalPages = paginationInstance.nbPages;
    const showingFrom = (Number(page) -1) * Number(perPage);
    const showTo = showingFrom+perPage;

    // Apply Sorting
    if(postData.sorting) {
        const pluckColumns = postData.sorting.map(a => a.column);
        const pluckDirections = postData.sorting.map(a => a.direction);
        items = orderBy(items, pluckColumns, pluckDirections);
        //console.log('👉 Sorting, Demo only supports',pluckColumns, pluckDirections, items)
    }

    // Apply Filters
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
            this.post("/datatables", (schema,request) => {
                return paginate(
                    schema.db.payments,
                    request,
                    '/datatables'
                )
            });
        },
    });
}