/*
Essa interface serve para receber a Page do backend.
content: guarda o conteúdo.
number: número da página.
first e last: verifica se é a primeira ou última página.
*/
export interface pageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    last: boolean;
    first: boolean
}