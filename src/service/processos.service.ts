import { api } from './api';


interface ProcessoReq {
    numero: string,
    partes: string,
    relator: string,
    resumo: string,
    ordem?: number,
}

// Rotas de Processos
// Pegar todos os processos
export const getProcessos = () => {
    return api
        .get('/processos')
        .then((response) => {

            return response.data;
        });
};


// Rotas de Processos
// Pegar todos os processos
export const getProcessoId = (id: string) => {
    return api
        .get(`/processo/${id}`)
        .then((response) => {

            return response.data;
        });
};


// Pegar os processos sem vínculo
export const getProcessosSemVinculo = () => {
    return api
        .get('/processosSemVinculo')
        .then((response) => {
            return response.data;
        });
};

// Salvar processo  
export const postProcesso = (processo: ProcessoReq) => {

    return api
        .post('/processo',
            JSON.stringify(processo), {
            headers: {
                "Content-Type": "application/json",
            }
        }

        )
        .then((response) => {
            console.log(response.data)
            return response.data;
        });
};

export const putProcesso = (processo: ProcessoReq) => {

    return api
        .put('/processo',
            JSON.stringify(processo), {
            headers: {
                "Content-Type": "application/json",
            }
        }

        )
        .then((response) => {
            console.log(response.data)
            return response.data;
        });
};


export const deleteProcesso = (id: String) => {


    return api
        .delete(`/processo/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }

        )
        .then((response) => {
            console.log(response.data)
            return response.data;
        });
};

export const desvincularProcesso = (pauta: any, processo: any) => {


    api.delete(`/pauta/${pauta.id}/processo`,
        {
            data: JSON.stringify(processo), headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response.data)
            return response.data;
        });
    ;
};

