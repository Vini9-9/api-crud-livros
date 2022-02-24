import { getRepository, Repository } from 'typeorm';
import { Livro } from '../../entities/Livro'
import { ILivrosRepository, ICreateLivroDTO, IListLivroDTO, IUpdateLivroDTO} from '../ILivrosRepository'


export class LivrosRepository implements ILivrosRepository{

    private repository: Repository<Livro>;

    constructor(){
        this.repository = getRepository(Livro);
    }

    
    async adiciona({isbn, nome, autor, descricao, estoque}: ICreateLivroDTO): Promise<void> {

        const livro = this.repository.create({
            isbn, nome, autor, descricao, estoque
        })

        await this.repository.save(livro)
        
    }

    async lista({page, limit}: IListLivroDTO): Promise<Livro[]> {

        const pageNumber = page ? page : 1;
        const limitNumber = limit ? limit : 2;

        const resultados = await this.repository.find(
            {
                select: ["nome"], 
                take: limitNumber,
                skip: (pageNumber-1) * limitNumber
            })

        return resultados
    }

    async removePorSbn(isbn: string): Promise<void | Error>{
        await this.repository.delete(isbn);
    }

    async atualizaPorSbn(livro: Livro, { nome, autor, descricao, estoque}: IUpdateLivroDTO): Promise<Livro>{
        
        livro.nome = nome ? nome : livro.nome;
        livro.autor = autor ? autor : livro.autor;
        livro.descricao = descricao ? descricao : livro.descricao;
        livro.estoque = estoque ? estoque : livro.estoque;

        await this.repository.save(livro);

        return livro;
    }

    async buscaPorIsbn(isbn: string): Promise<Livro | undefined>{

        const livro = await this.repository.findOne({ isbn });
        return livro 

    }


}
