import { Router } from 'express';
import { CreateLivroController } from '../controllers/CreateLivrosController';
import { DeleteLivroController } from '../controllers/DeleteLivroController';
import { ListLivroByIsbnController } from '../controllers/ListLivroByIsbnController';
import { ListLivrosController } from '../controllers/ListLivrosController';
import { UpdateLivroController } from '../controllers/UpdateLivroController';

const estoqueRoutes = Router();

/* GET */

estoqueRoutes.get('/', new ListLivrosController().handle);

estoqueRoutes.get('/:isbn', new ListLivroByIsbnController().handle);

/* POST */

estoqueRoutes.post('/', new CreateLivroController().handle);

/* PATCH */

estoqueRoutes.patch('/:isbn', new UpdateLivroController().handle);

/* DELETE */

estoqueRoutes.delete('/:isbn', new DeleteLivroController().handle);

export { estoqueRoutes };