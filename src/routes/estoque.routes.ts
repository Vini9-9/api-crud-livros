import { Router } from 'express';
import { LivrosRepository } from '../repositories/LivrosRepository';
import { CreateLivroService } from '../services/CreateLivroService'
import { DeleteLivroByIsbnService } from '../services/DeleteLivroByIsbnService';
import { ListLivroByIsbnService } from '../services/ListLivroByIsbnService';
import { ListLivroService } from '../services/ListLivroService'
import { UpdateLivroByIsbnService } from '../services/UpdateLivroByIsbnService';

const estoqueRoutes = Router();
const livrosRepository = new LivrosRepository();

/* GET */

estoqueRoutes.get('/', (req, res) => {
    //modelo: ?page=1&limit=5
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit) 

    const listLivroService = new ListLivroService(livrosRepository)
    const estoqueLivros = listLivroService.execute({page, limit})

    return res.status(200).json(estoqueLivros)
    
})

estoqueRoutes.get('/:isbn', (req, res) => {
    const isbn = req.params.isbn

    const listLivroByIsbnService = new ListLivroByIsbnService(livrosRepository)
    const infoLivro = listLivroByIsbnService.execute(isbn)

    return res.status(200).json(infoLivro)
})

/* POST */

estoqueRoutes.post('/', (req, res) => {
    const {isbn, nome, autor, descricao, estoque } = req.body

    const createLivroService = new CreateLivroService(livrosRepository)
    createLivroService.execute({isbn, nome, autor, descricao, estoque})

    return res.status(201).send()    
})

/* PATCH */

estoqueRoutes.patch('/:isbn', (req, res) => {
    var { nome, autor, descricao, estoque} = req.body
    const isbn = req.params.isbn

    const updateLivroByIsbnService = new UpdateLivroByIsbnService(livrosRepository)
    updateLivroByIsbnService.execute(isbn, { nome, autor, descricao, estoque})

    return res.status(200).send()
    
})

/* DELETE */

estoqueRoutes.delete('/:isbn', (req, res) => {
    const isbn = req.params.isbn

    const deleteLivroByIsbnService = new DeleteLivroByIsbnService(livrosRepository)
    deleteLivroByIsbnService.execute(isbn)

    return res.status(200).send()
    
})

export { estoqueRoutes };