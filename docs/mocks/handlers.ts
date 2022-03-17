import { rest } from 'msw';

const handlers = [
    rest.post('/datatable/actions', (req, res, ctx) => {
        return res(
            // Respond with a 200 status code
            ctx.status(200),
        )
    }),
    rest.get('/datatable/rest', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            }),
        )
    }),
]

export default handlers;