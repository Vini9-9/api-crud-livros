import { Router } from 'express';
import  listLivrosController from '../useCases/ListLivros/';
import  ListLivroByIsbnController  from '../useCases/ListLivroByIsbn/';
import  createLivroController from '../useCases/CreateLivro/';
import  updateLivroController from '../useCases/UpdateLivro/';
import  deleteLivroController  from '../useCases/DeleteLivro/';

const estoqueRoutes = Router();

/* GET */

estoqueRoutes.get('/', (req, res) =>{
    return listLivrosController().handle(req, res);
});

estoqueRoutes.get('/:isbn', (req, res) =>{
    return ListLivroByIsbnController().handle(req, res);
});

/* POST */

estoqueRoutes.post('/', (req, res) =>{
    return createLivroController().handle(req, res);
});

/* PATCH */

estoqueRoutes.patch('/:isbn', (req, res) =>{
    return updateLivroController().handle(req, res);
});

/* DELETE */

estoqueRoutes.delete('/:isbn', (req, res) =>{
    return deleteLivroController().handle(req, res);
});

export { estoqueRoutes };