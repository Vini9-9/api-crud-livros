import { getRepository, Repository } from 'typeorm';
import { Livro } from '../../entities/Livro'
import { ILivrosRepository, ICreateLivroDTO, IPageLivroDTO, IUpdateLivroDTO} from '../ILivrosRepository'


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

    async lista(): Promise<Livro[]> {

        const resultados = await this.repository.find()
        return resultados

    }

    async pagina({ page, limit }: IPageLivroDTO): Promise<Livro[]> {
        
        const pageNumber = page ? page : 1;
        const limitNumber = limit ? limit : 5;
    
        const resultados = await this.repository.find(
            {
                take: limitNumber,
                skip: (pageNumber-1) * limitNumber,

                order: {
                    isbn: "ASC",
                }
                
            })
    
        return resultados

    }

    async exibePorPropriedade(livros:Livro[] , propriedade:string ): Promise<Livro[]> {

        function getFields(array: any[], field: string ) {
            return array.map(a => a[field]);
        }

        var livrosPorPropriedade = getFields(livros, propriedade)
    
        return livrosPorPropriedade

    }


    async removePorSbn(isbn: string): Promise<void | Error>{
        await this.repository.delete(isbn);
    }

    async atualizaPorIsbn(livro: Livro, { nome, autor, descricao, estoque}: IUpdateLivroDTO): Promise<Livro | object[]>{

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
