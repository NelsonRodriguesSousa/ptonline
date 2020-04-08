// Lista de todos os atletas

export const atletas = [
    {
        id: "001",
        nome: "Nelson Sousa",
        admin_id: "idadmin",
        imagemPerfil: "https://i.imgur.com/IPbviwC.jpg",
        email: "nelson_85_sousa@hotmail.com",
        planosTreino: [
            {
                nomePlano: "Treino Peito",
                objetivoDoPlano: "Ganhar massa muscular",
                aquecimento: "CARDIO, DORSAL E BICEP - aquecimento inicial 10min passadeira",
                cardio_alongamentos: "cardio alongamentos",
                plano: [
                    { imagem: "https://i.imgur.com/IKINbZY.jpg" , exercicio: "Supino Inclinado", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                    { imagem: "https://i.imgur.com/hMmgJbP.png",  exercicio: "Chestress", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                    { imagem: "https://i.imgur.com/ZKyajZ6.jpg",  exercicio: "Aberturas", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                    { imagem: "https://i.imgur.com/IKINbZY.jpg", exercicio: "Cross Over", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                ],
                observacoes: "qualquer coisa"
            },
        ],
        planoAlimentar: [
            {
                nomePlano: "Plano Alimentar 1",
                plano: [
                    { refeicao: "ref1", alimentacaoOp1: "Alimentação1", alimentacaoOp2: "Alimentação2", suplementacao_observacoes: "Suplementação1" },
                    { refeicao: "ref2", alimentacaoOp1: "Alimentação2", alimentacaoOp2: "Alimentação2", suplementacao_observacoes: "Suplementação2" },
                    { refeicao: "ref3", alimentacaoOp1: "Alimentação3", alimentacaoOp2: "Alimentação2", suplementacao_observacoes: "Suplementação3" },
                    { refeicao: "ref4", alimentacaoOp1: "Alimentação4", alimentacaoOp2: "Alimentação2", suplementacao_observacoes: "Suplementação4" },
                ],
                observacoes: "TODA A SUPLEMENTAÇÃO É OPCIONAL EXCETO A WHEY "
            },
        ],
        avaliacoes: [
            {
                data: "",
                atleta: "",
                peso: "",
                IMC: "",
                aguaCorporal: "",
                perimetroCintura: "",
                perimentroAnca: "",
                idadeMetabolica: "",
                taxaMetabolicaBasal: "",
                percentagemGorduraCorporal: "",
                fotos: {
                    frente: "",
                    tras: "",
                    lado: "",
                    corpoInteiro: "",
                },
            }
        ]
    }
]

// Atleta logado

export const atleta = {
    id: "001",
    nome: "Nelson Sousa",
    tipoDeUtilizador: "Online", // Ou presencial
    imagemPerfil: "https://i.imgur.com/IPbviwC.jpg",
    email: "nelson_85_sousa@hotmail.com",
    planosTreino: [
        {
            nomePlano: "Treino 1",
            objetivoDoPlano: "Ganhar massa muscular",
            aquecimento: "aquecimento inicial 10min passadeira",
            cardio_alongamentos: "cardio alongamentos",
            plano: [            
                { imagem: "https://i.imgur.com/IKINbZY.jpg" , exercicio: "Bench Dips", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                { imagem: "https://i.imgur.com/hMmgJbP.png",  exercicio: "Dumbbell Pullover", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                { imagem: "https://i.imgur.com/ZKyajZ6.jpg",  exercicio: "Incline barbell bench press", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                { imagem: "https://i.imgur.com/A3yAiZe.jpg", exercicio: "Dumbbell Flyes", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
            ],
            observacoes: "qualquer coisa"
        },
        {
            nomePlano: "Treino 2",
            objetivoDoPlano: "Ganhar massa muscular",
            aquecimento: "aquecimento inicial 10min passadeira",
            cardio_alongamentos: "cardio alongamentos",
            plano: [
                { exercicio: "Supino Inclinado", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                { exercicio: "Chest Press", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                { exercicio: "Aberturas", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
                { exercicio: "Cross Over", repeticoes: "12", series: "4", tempoDescanso: "30seg", observacoes: "Observações" },
            ],
            observacoes: "qualquer coisa"
        },
    ],
    planoAlimentar: [
        {
            nomePlano: "Plano Alimentar 1",
            plano: [
                { 
                    refeicao: "REF1", 
                    alimentacaoOp1: "200ml claras  70g aveia 50g frutos vermelhos ", 
                    alimentacaoOp2: "150ml claras 2 ovos inteiros 1 pão escuro pequeno ½ kiwi", 
                    suplementacao_observacoes: "1 multivitaminico 1 ANIMAL CUTS  1 ortosiphon" 
                },
                { 
                    refeicao: "REF2", 
                    alimentacaoOp1: "1 Lata Atum + 1 ovo 3 bolachas de arroz 100g pepino ou alface", 
                    alimentacaoOp2: "35g whey 3 bolachas de arroz 15g frutos secos", 
                    suplementacao_observacoes: "1 Ortosiphon" 
                },
            ],
            observacoes: "Água Min 3L -  Max 5L. 1X de 15 em 15 dias: 1 CHEAT MEAL (tem de ser ao sábado por causa da dieta) . Toda a suplementação é opcional excepto a whey"
        },
    ],
    avaliacoes: [
        {
            data: "",
            peso: "",
            IMC: "",
            aguaCorporal: "",
            perimetroCintura: "",
            perimentroAnca: "",
            idadeMetabolica: "",
            taxaMetabolicaBasal: "",
            percentagemGorduraCorporal: "",
            fotos: {
                frente: "",
                tras: "",
                lado: "",
                corpoInteiro: "",
            },
        }
    ]
}

export const exercicios = [
    {
        id: "peito1",
        imagem: "www.imagem.png",
        nome: "Supino Inclinado",
    }
]

export default {
    atletas, atleta
}