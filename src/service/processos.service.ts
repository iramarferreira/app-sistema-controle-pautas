// import {api} from './api';

// // Rotas de Processos
// // Pegar todos os processos
// export const getProcessos = () => {
//     return api
//       .get('/processos')
//       .then((response) => {
  
//         return response.data;
//       });
//   };

// // Pegar os processos sem vínculo
// export const getProcessosSemVinculo = () => {
//     return api
//       .get('/processosSemVinculo')
//       .then((response) => {
//         return response.data;
//       });
//   };

// // Salvar processo  
// export const postProcesso = (processo: ProcessoReq) => {

// const  Authorization  = 'authHeader()';

// return api
//     .post('/processo',
//     JSON.stringify(processo), {
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": Authorization
//     }
//     }

//     )
//     .then((response) => {
//     console.log(response.data)
//     return response.data;
//     });
// };
  