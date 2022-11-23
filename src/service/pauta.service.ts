import { api } from './api';


interface PautaReq {
    orgaoJudicante: string,
    sistemaPauta: string,
    meioJulgamento: string,
    dataSessao: Date,
    dataDivulgacao: Date,
    dataPublicacao: Date,
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