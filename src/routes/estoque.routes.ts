import { Router } from 'express';
import { LivrosRepository } from '../repositories/LivrosRepository';

const estoqueRoutes = Router();
const livrosRepository = new LivrosRepository();

/* GET */

estoqueRoutes.get('/', (req, res) => {
    //modelo: ?page=1&limit=5
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit) 

    const estoqueLivros = livrosRepository.lista(page, limit)

    return res.status(200).json(estoqueLivros)
    
})

estoqueRoutes.get('/:isbn', (req, res) => {
    const isbn = req.params.isbn

    const infoLivro = livrosRepository.buscaPorIsbn(isbn)

    return res.status(200).json(infoLivro)
})

/* POST */

estoqueRoutes.post('/', (req, res) => {
    const {isbn, nome, autor, descricao, estoque } = req.body

    const isbnJaAssociado = livrosRepository.buscaPorIsbn(isbn);

    if(isbnJaAssociado){
        return res.status(400).json({error: "ISBN já está associado a outro livro"}) 
    }

    livrosRepository.adiciona({isbn, nome, autor, descricao, estoque });

    return res.status(201).send()    
})

/* PATCH */

estoqueRoutes.patch('/:isbn', (req, res) => {
    var livro = req.body
    const isbn = req.params.isbn

    const isbnJaAssociado = livrosRepository.buscaPorIsbn(isbn);

    if(isbnJaAssociado){
        return res.status(400).json({error: "ISBN já está associado a outro livro"}) 
    }

    livrosRepository.atualizaPorSbn(isbn, livro)

    return res.status(200).send()
    
})

/* DELETE */

estoqueRoutes.delete('/:isbn', (req, res) => {
    const isbn = req.params.isbn

    const isbnJaAssociado = livrosRepository.buscaPorIsbn(isbn);

    if(!isbnJaAssociado){
        return res.status(400).json({error: "ISBN não localizado"}) 
    }

    livrosRepository.removePorSbn(isbn)

    return res.status(200).send()
    
})

export { estoqueRoutes };