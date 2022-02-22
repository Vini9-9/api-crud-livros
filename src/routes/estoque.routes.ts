import { Router } from 'express';
import { Livro } from '../model/Livro';

const estoqueRoutes = Router();

/* GET */

estoqueRoutes.get('/', (req, res) => {
    //modelo: ?page=1&limit=5
    res.status(200).json({ "message":"ok com path"})
    /* const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)  */
    //Estoque.lista(res, page, limit)
})

estoqueRoutes.get('/:sbn', (req, res) => {
    const sbn = parseInt(req.params.sbn)
    //Estoque.buscaPorSbn(sbn, res)
})

/* POST */

estoqueRoutes.post('/', (req, res) => {
    const {sbn, nome, autor, descricao, estoque } = req.body
    const livro = new Livro();

    Object.assign(livro, {
        sbn, nome, autor, descricao, estoque
    })

    return res.status(201).json({ livro })    
    /* var livro = req.body */
    //Estoque.adiciona(livro, res)
})

/* PATCH */

estoqueRoutes.patch('/:sbn', (req, res) => {
    var livro = req.body
    const sbn = req.params.sbn
    //Estoque.atualizaPorSbn(sbn, livro, res)
})

/* DELETE */

estoqueRoutes.delete('/:sbn', (req, res) => {
    const sbn = parseInt(req.params.sbn)
    //Estoque.removePorSbn(sbn, res)
})

export { estoqueRoutes };