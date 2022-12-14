import { api } from './api';


interface PautaReq {
    orgaoJudicante: string,
    sistemaPauta: string,
    meioJulgamento: string,
    dataSessao: Date,
    dataDivulgacao: Date,
    dataPublicacao: Date,
    id?: string
}


// Métodos para pauta

export const getPautas = () => {
    return api
        .get('/pautas')
        .then((response) => {
            // console.log(response)
            return response.data;
        });
};


// pegar pauta pelo id
export const getPautaId = (id: String) => {

    return api
        .get(`/pauta/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        .then((response) => {
            console.log(response)
            return response.data;
        });
};

export const postPauta = (pauta: PautaReq) => {
    return api
        .post('/pauta',
            JSON.stringify(pauta), {
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

export const putPauta = (pauta: PautaReq) => {
    return api
        .put(`/pauta/${pauta.id}`,
            JSON.stringify(pauta), {
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

export const deletePauta = (id: string) => {
    return api
        .delete(`/pauta/${id}`,
           {
            headers: {
                "Content-Type": "application/json",
            }
        }
        )
        .then((response) => {
            // console.log(response)
            return response;
        });
};

export const postVinculacaoListPauta = (pauta: any, processos: any) => {

    console.log(processos)
    return api
        .post(`/pauta/${pauta.id}/listProcessos`,
            JSON.stringify(processos), {
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

export const postVinculacaoProcessoPauta = (pauta: any, processo: any) => {

    console.log(processo)
    return api
        .post(`/pauta/${pauta.id}/processo`,
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