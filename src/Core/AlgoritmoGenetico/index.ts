// *Importando os serviços
import CursoService from "../../Service/CursoService/CursoService";
import DisciplinaService from "../../Service/DisciplinaService/DisciplinaService";
import ProfessorService from "../../Service/ProfessorService/ProfessorService";
import TurmaService from "../../Service/TurmaService/TurmaService";
import RestricaoService from "../../Service/RestricaoService/RestricaoService";
import SalaService from "../../Service/SalaService/SalaService";

// *Importando tipos
import {
  CursoType,
  DisciplinaType,
  ProfessorType,
  RestricaoType,
  SalaType,
  TurmaType,
} from "../Types";

// *Criando a classe
export default class AlgoritmoGenetico {
  // *Criando os atributos
  public turmas!: TurmaType[];
  public disciplinas!: DisciplinaType[];
  public salas!: SalaType[];
  public cursos!: CursoType[];
  public professores!: ProfessorType[];
  public restricoes!: RestricaoType[];

  public turma: TurmaService | undefined;
  public disciplina: DisciplinaService | undefined;
  public sala: SalaService | undefined;
  public curso: CursoService | undefined;
  public professor: ProfessorService | undefined;
  public restricao: RestricaoService | undefined;

  public aleatorio_dia!: number;
  public aleatorio_horario!: number;
  public qtd_individuos!: number;

  // !população utilizada
  public populacao: DisciplinaType[][][] = [];
  public filhos: DisciplinaType[][][] = [];

  // !valores de fitness de cada individuo
  public fitness: number[] = [];

  // !melhor
  public res: number[] = [];
  public res2: DisciplinaType[][] = [];
  public res3: number[][] = [];

  // *metodo novo
  public dchq: number[][][] = [];

  public dias = ["segunda", "terca", "quarta", "quinta", "sexta"];

  public horarios = [
    "7:10 às 8:00",
    "8:00 às 8:50",
    "8:50 às 9:40",
    "9:50 às 10:40",
    "10:40 às 11:30",
    "11:30 às 12:20",
    "13:00 às 13:50",
    "13:50 às 14:40",
    "14:40 às 15:30",
    "15:40 às 16:30",
    "16:30 às 17:20",
    "17:20 às 18:10",
    "19:00 às 19:50",
    "19:50 às 20:40",
    "20:50 às 21:40",
    "21:40 às 22:30",
  ];

  // *construtor
  constructor() {}

  ngOnInit() {
    this.res[0] = 0;
    this.qtd_individuos = 200;

    return this.recebeDados();
  }

  public async recebeDados() {
    this.turmas = new Array();
    this.disciplinas = new Array();
    this.salas = new Array();
    this.cursos = new Array();
    this.professores = new Array();
    this.restricoes = new Array();

    // !chamando serviços
    const turmaService = new TurmaService();
    const disciplinaService = new DisciplinaService();
    const salaService = new SalaService();
    const cursoService = new CursoService();
    const professorService = new ProfessorService();
    const restricaoService = new RestricaoService();

    // !recebendo dados
    this.turmas = await turmaService.read();
    this.disciplinas = await disciplinaService.read();
    this.salas = await salaService.read();
    this.cursos = await cursoService.read();
    this.professores = await professorService.read();
    this.restricoes = await restricaoService.read();

    console.log("\n\nIniciado.");
    const antes = Date.now();
    const result = this.AG();
    console.log("Tempo de execução: " + (Date.now() - antes) + "ms");

    return result;
  }

  public AG() {
    let pcruzamento = 90,
      pmutacao = 20,
      maxgeracoes = 700;
    let pai1,
      pai2,
      filhogerado,
      i = 0;

    this.iniciaPopulacao();

    while (this.res[2] != 0 && i < maxgeracoes) {
      console.log("GERAÇÃO -----------------: " + (i + 1));
      this.calculaFitness();

      if (i % 10 == 0) {
        this.novoMetodo();
        this.calculaFitness();
      }

      if (this.res[2] != 0) {
        while (this.filhos.length <= this.qtd_individuos) {
          if (this.GeraAleatorio(0, 100) <= pcruzamento) {
            do {
              pai1 = this.selecaoTorneio();
              pai2 = this.selecaoTorneio();
            } while (pai1 == pai2);

            let aleatorio = this.GeraAleatorio(1, 4);

            filhogerado = this.cruzamentoJairo(pai1, pai2, aleatorio);

            if (this.GeraAleatorio(0, 100) <= pmutacao) {
              this.mutacaoDias(filhogerado);
            }

            filhogerado = this.cruzamentoJairo(pai2, pai1, aleatorio);
            if (this.GeraAleatorio(0, 100) <= pmutacao) {
              this.mutacaoDias(filhogerado);
            }
          }
        }

        this.filhosParaPais(); //! passa o vetor de filhos para o de população
      }

      i++;
    }

    console.log("quantidade de gerações: " + i);
    console.log("melhor fitness: " + this.res[0]);
    console.log("quantidade de intervalo de 11: " + this.res[3]);
    console.log("quantidade de aulas duplas: " + this.res[1]);
    console.log("quantidade de restrições: " + this.res[4]);
    console.log("quantidade de choque de horarios: " + this.res[2]);
    // this.MostraResultadoPopulacao();
    console.log("choques: ");
    console.log(this.res3);
    this.exibirResultadoFinal();

    if (this.res[2] != 0) {
      console.clear();
      this.AG();
    }

    return this.pdfResultado();
  }

  public MostraResultadoPopulacao(dia: number, horario: number): string {
    let text = "";

    for (let i = 1; i <= this.turmas.length; i++) {
      for (let k = 0; k < this.dias.length; k++) {
        for (let l = 1; l <= 12; l++) {
          if (this.res2[i][k * 16 + l] != undefined) {
            if (k == dia && l == horario) {
              text += this.res2[i][k * 16 + l].nome + "\n";
            }
          }
        }
      }
    }

    return text;
  }

  public pdfResultado() {
    return {
      pageMargins: [20, 60, 20, 60],
      header: {
        margin: 20,
        columns: [
          {
            table: {
              widths: ["*"],
              body: [
                [
                  [
                    {
                      text: "Grade Horária",
                      style: "header",
                    },
                  ],
                ],
              ],
            },
            layout: "noBorders",
          },
        ],
      },
      content: [
        {
          style: "table",
          table: {
            widths: ["20%", "80%"],
            body: [
              [
                { text: "", style: "tableHeader" },
                { text: "Segunda - Feira", style: "tableHeader" },
                // { text: "Terça", style: "tableHeader" },
                // { text: "Quarta", style: "tableHeader" },
                // { text: "Quinta", style: "tableHeader" },
                // { text: "Sexta", style: "tableHeader" },
              ],
              [
                { text: "7:10 às 8:00", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 1) },
              ],
              [
                { text: "8:00 às 8:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 2) },
              ],
              [
                { text: "8:50 às 9:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 3) },
              ],
              [
                { text: "9:50 às 10:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 4) },
              ],
              [
                { text: "10:40 às 11:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 5) },
              ],
              [
                { text: "11:30 às 12:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 6) },
              ],
              [
                { text: "13:00 às 13:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 7) },
              ],
              [
                { text: "13:50 às 14:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 8) },
              ],
              [
                { text: "14:40 às 15:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 9) },
              ],
              [
                { text: "15:40 às 16:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 10) },
              ],
              [
                { text: "16:30 às 17:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 11) },
              ],
              [
                { text: "17:20 às 18:10", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(0, 12) },
              ],
              // [
              //   { text: "19:00 às 19:50", style: "tableHeader" },
              //   { text: "teste2" },
              // ],
              // [
              //   { text: "19:50 às 20:40", style: "tableHeader" },
              //   { text: "teste2" },
              // ],
              // [
              //   { text: "20:50 às 21:40", style: "tableHeader" },
              //   { text: "teste2" },
              // ],
              // [
              //   { text: "21:40 às 22:30", style: "tableHeader" },
              //   { text: "teste2" },
              // ],
            ],
          },
        },
        {
          pageBreak: "before",
          style: "table",
          table: {
            widths: ["20%", "80%"],
            body: [
              [
                { text: "", style: "tableHeader" },
                { text: "Terça - Feira", style: "tableHeader" },
              ],
              [
                { text: "7:10 às 8:00", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 1) },
              ],
              [
                { text: "8:00 às 8:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 2) },
              ],
              [
                { text: "8:50 às 9:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 3) },
              ],
              [
                { text: "9:50 às 10:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 4) },
              ],
              [
                { text: "10:40 às 11:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 5) },
              ],
              [
                { text: "11:30 às 12:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 6) },
              ],
              [
                { text: "13:00 às 13:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 7) },
              ],
              [
                { text: "13:50 às 14:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 8) },
              ],
              [
                { text: "14:40 às 15:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 9) },
              ],
              [
                { text: "15:40 às 16:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 10) },
              ],
              [
                { text: "16:30 às 17:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 11) },
              ],
              [
                { text: "17:20 às 18:10", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(1, 12) },
              ],
            ],
          },
        },
        {
          pageBreak: "before",
          style: "table",
          table: {
            widths: ["20%", "80%"],
            body: [
              [
                { text: "", style: "tableHeader" },
                { text: "Quarta - Feira", style: "tableHeader" },
              ],
              [
                { text: "7:10 às 8:00", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 1) },
              ],
              [
                { text: "8:00 às 8:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 2) },
              ],
              [
                { text: "8:50 às 9:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 3) },
              ],
              [
                { text: "9:50 às 10:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 4) },
              ],
              [
                { text: "10:40 às 11:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 5) },
              ],
              [
                { text: "11:30 às 12:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 6) },
              ],
              [
                { text: "13:00 às 13:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 7) },
              ],
              [
                { text: "13:50 às 14:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 8) },
              ],
              [
                { text: "14:40 às 15:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 9) },
              ],
              [
                { text: "15:40 às 16:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 10) },
              ],
              [
                { text: "16:30 às 17:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 11) },
              ],
              [
                { text: "17:20 às 18:10", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(2, 12) },
              ],
            ],
          },
        },
        {
          pageBreak: "before",
          style: "table",
          table: {
            widths: ["20%", "80%"],
            body: [
              [
                { text: "", style: "tableHeader" },
                { text: "Quinta - Feira", style: "tableHeader" },
              ],
              [
                { text: "7:10 às 8:00", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 1) },
              ],
              [
                { text: "8:00 às 8:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 2) },
              ],
              [
                { text: "8:50 às 9:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 3) },
              ],
              [
                { text: "9:50 às 10:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 4) },
              ],
              [
                { text: "10:40 às 11:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 5) },
              ],
              [
                { text: "11:30 às 12:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 6) },
              ],
              [
                { text: "13:00 às 13:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 7) },
              ],
              [
                { text: "13:50 às 14:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 8) },
              ],
              [
                { text: "14:40 às 15:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 9) },
              ],
              [
                { text: "15:40 às 16:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 10) },
              ],
              [
                { text: "16:30 às 17:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 11) },
              ],
              [
                { text: "17:20 às 18:10", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(3, 12) },
              ],
            ],
          },
        },
        {
          pageBreak: "before",
          style: "table",
          table: {
            widths: ["20%", "80%"],
            body: [
              [
                { text: "", style: "tableHeader" },
                { text: "Sexta - Feira", style: "tableHeader" },
              ],
              [
                { text: "7:10 às 8:00", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 1) },
              ],
              [
                { text: "8:00 às 8:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 2) },
              ],
              [
                { text: "8:50 às 9:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 3) },
              ],
              [
                { text: "9:50 às 10:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 4) },
              ],
              [
                { text: "10:40 às 11:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 5) },
              ],
              [
                { text: "11:30 às 12:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 6) },
              ],
              [
                { text: "13:00 às 13:50", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 7) },
              ],
              [
                { text: "13:50 às 14:40", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 8) },
              ],
              [
                { text: "14:40 às 15:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 9) },
              ],
              [
                { text: "15:40 às 16:30", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 10) },
              ],
              [
                { text: "16:30 às 17:20", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 11) },
              ],
              [
                { text: "17:20 às 18:10", style: "tableHeader" },
                { text: this.MostraResultadoPopulacao(4, 12) },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 11,
          bold: true,
          margin: [0, 0, 0, 4],
        },
        headerSubtitle: {
          fontSize: 10,
          bold: true,
          italics: true,
        },
        table: {
          margin: [0, 20, 0, 10],
        },
        tableHeader: {
          fontSize: 10,
          bold: true,
        },
      },
      defaultStyle: {
        alignment: "justify",
        fontSize: 10,
      },
    };
  }

  public iniciaPopulacao() {
    for (let i = 1; i <= this.qtd_individuos; i++) {
      this.populacao[i] = [];

      for (let j = 1; j <= this.turmas?.length; j++) {
        this.populacao[i][j] = [];

        //? caso especial para ensino medio (inicio)

        if (
          this.cursos[this.localizarCurso(this.turmas[j - 1].curso_id)]
            .agrupamento == 1
        ) {
          let disc1: DisciplinaType[] = [];
          let disc2: DisciplinaType[] = [];
          let qtau: number[] = [];
          let ale;

          for (let k = 1; k <= this.disciplinas.length; k++) {
            // *salva em disc todas as disciplinas daquela turma.
            if (
              this.turmas[j - 1].curso_id == this.disciplinas[k - 1].curso_id &&
              this.turmas[j - 1].periodo == this.disciplinas[k - 1].periodo
            ) {
              disc1.push(this.disciplinas[k - 1]);
              qtau.push(this.disciplinas[k - 1].qtaulas);
            }
          }

          while (disc1.length > 0) {
            ale = this.GeraAleatorio(0, disc1.length - 1);

            if (qtau[ale] % 3 == 0) {
              for (let x = 0; x < 3; x++) {
                disc2.push(disc1[ale]);
                qtau[ale]--;
              }
            } else if (qtau[ale] % 2 == 0) {
              for (let x = 0; x < 2; x++) {
                disc2.push(disc1[ale]);
                qtau[ale]--;
              }
            } else if (qtau[ale] % 5 == 0) {
              for (let x = 0; x < 2; x++) {
                disc2.push(disc1[ale]);
                qtau[ale]--;
              }
            } else {
              for (let x = 0; x < disc1[ale].qtaulas; x++) {
                disc2.push(disc1[ale]);
                qtau[ale]--;
              }
            }

            if (qtau[ale] == 0) {
              disc1.splice(ale, 1);
              qtau.splice(ale, 1);
            }
          }

          // !preeche de manhã
          for (let x = 0; x <= 4; x++) {
            for (let h = 1; h <= 6; h++) {
              this.populacao[i][j][x * 16 + h] = disc2[0];
              disc2.splice(0, 1);
            }
          }

          // !sorteia um dia para preencher a tarde
          while (disc2.length > 0) {
            ale = this.GeraAleatorio(0, 4);
            for (let h = 7; h <= 12; h++) {
              if (
                this.populacao[i][j][ale * 16 + h] == undefined &&
                disc2.length > 0
              ) {
                this.populacao[i][j][ale * 16 + h] = disc2[0];
                disc2.splice(0, 1);
              }
            }
          }
        } else {
          //? caso especial para ensino medio (final)
          for (let k = 1; k <= this.disciplinas.length; k++) {
            // *analisa se pertencem a disciplina daquela turma
            if (
              this.turmas[j - 1].curso_id == this.disciplinas[k - 1].curso_id &&
              this.turmas[j - 1].periodo == this.disciplinas[k - 1].periodo
            ) {
              if (
                this.disciplinas[k - 1].qtaulas %
                  this.cursos[
                    this.localizarCurso(this.disciplinas[k - 1].curso_id)
                  ].agrupamento ==
                0
              ) {
                for (
                  let x = 1;
                  x <=
                  this.disciplinas[k - 1].qtaulas /
                    this.cursos[
                      this.localizarCurso(this.disciplinas[k - 1].curso_id)
                    ].agrupamento;
                  x++
                ) {
                  // !sorteia um dia e um horário do dia.

                  do {
                    this.aleatorio_dia = this.GeraAleatorio(0, 4);

                    if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "matutino" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 1
                    ) {
                      this.aleatorio_horario = this.Sorteio([1, 2, 3, 4, 5, 6]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "matutino" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 2
                    ) {
                      this.aleatorio_horario = this.Sorteio([1, 3, 5]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "matutino" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 3
                    ) {
                      this.aleatorio_horario = this.Sorteio([1, 4]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "vespertino" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 1
                    ) {
                      this.aleatorio_horario = this.Sorteio([
                        7, 8, 9, 10, 11, 12,
                      ]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "vespertino" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 2
                    ) {
                      this.aleatorio_horario = this.Sorteio([7, 9, 11]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "vespertino" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 3
                    ) {
                      this.aleatorio_horario = this.Sorteio([7, 10]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "noturno" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 1
                    ) {
                      this.aleatorio_horario = this.Sorteio([13, 14, 15, 16]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "noturno" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 2
                    ) {
                      this.aleatorio_horario = this.Sorteio([13, 15]);
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "integral" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 1
                    ) {
                      // !preferencia para a manhã
                      if (this.turmas[j - 1].periodo % 2 == 0) {
                        // !tem vagas de manhã
                        if (this.temHorario(i, j, "matutino")) {
                          this.aleatorio_horario = this.Sorteio([
                            1, 2, 3, 4, 5, 6,
                          ]);
                        } else {
                          this.aleatorio_horario = this.Sorteio([
                            7, 8, 9, 10, 11, 12,
                          ]);
                        }
                      } else {
                        // !preferencia para a tarde

                        // !tem vagas de tarde
                        if (this.temHorario(i, j, "vespertino")) {
                          this.aleatorio_horario = this.Sorteio([
                            7, 8, 9, 10, 11, 12,
                          ]);
                        } else {
                          this.aleatorio_horario = this.Sorteio([
                            1, 2, 3, 4, 5, 6,
                          ]);
                        }
                      }
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "integral" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 2
                    ) {
                      // !preferencia para manhã
                      if (this.turmas[j - 1].periodo % 2 == 0) {
                        // !tem vagas de manhã
                        if (this.temHorario(i, j, "matutino")) {
                          this.aleatorio_horario = this.Sorteio([1, 3, 5]);
                        } else {
                          this.aleatorio_horario = this.Sorteio([7, 9, 11]);
                        }
                      } else {
                        //!preferencia para tarde

                        // !tem vagas de tarde
                        if (this.temHorario(i, j, "vespertino")) {
                          this.aleatorio_horario = this.Sorteio([7, 9, 11]);
                        } else {
                          this.aleatorio_horario = this.Sorteio([1, 3, 5]);
                        }
                      }
                    } else if (
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].turno == "integral" &&
                      this.cursos[
                        this.localizarCurso(this.turmas[j - 1].curso_id)
                      ].agrupamento == 3
                    ) {
                      // !preferencia para manhã
                      if (this.turmas[j - 1].periodo % 2 == 0) {
                        // !tem vagas de manhã
                        if (this.temHorario(i, j, "matutino")) {
                          this.aleatorio_horario = this.Sorteio([1, 4]);
                        } else {
                          this.aleatorio_horario = this.Sorteio([7, 10]);
                        }
                      } else {
                        // !preferencia para tarde

                        // !tem vagas de tarde
                        if (this.temHorario(i, j, "vespertino")) {
                          this.aleatorio_horario = this.Sorteio([7, 10]);
                        } else {
                          this.aleatorio_horario = this.Sorteio([1, 4]);
                        }
                      }
                    }
                  } while (
                    this.populacao[i][j][
                      this.aleatorio_dia * 16 + this.aleatorio_horario
                    ] != undefined
                  ); //! analisa se a posição sorteada está vazia

                  for (
                    let h = 0;
                    h <
                    this.cursos[
                      this.localizarCurso(this.disciplinas[k - 1].curso_id)
                    ].agrupamento;
                    h++
                  ) {
                    this.populacao[i][j][
                      this.aleatorio_dia * 16 + this.aleatorio_horario + h
                    ] = this.disciplinas[k - 1]; //! Insere a disciplina na posição sorteada
                  }
                }
              } else {
                // erro: quantidade de aulas incorretas
                console.log("erro: quantidade de aulas incorretas");
                // return;
              }
            }
          }
        }
      }
    }
  }

  public calculaFitness() {
    this.fitness = new Array();

    for (let i = 1; i <= this.qtd_individuos; i++) {
      this.fitness[i] = 160000; // * valor inicial ajustado

      let qtdad = this.aulasDuplas(i); // ? +5 por aula duplas
      let qtdcp = this.choqueHorariosProfessores(i); //? -500 por choque ocorrido
      let qtintervalo = this.intervalo11Horas(i); //? -10 por intervalo ocorrido
      let qtar = this.analiseRestricoes(i); //? -50 por restricao encontrada

      this.resultadoFitness(i, qtdad, qtdcp, qtintervalo, qtar);
    }
  }

  // Verifica se há aulas duplas
  public aulasDuplas(individuo: number): number {
    let qtd = 0;

    let max = 0;
    let j;

    for (let x = 1; x <= this.turmas.length; x++) {
      // *descobrindo agrupamento
      let h = 1;
      let max = 0; // *valor maximo para rodar o while para que não entre em loop infinito caso não encontre aulas

      while (this.populacao[individuo][x][h] == undefined) {
        h++;
        max++;

        if (max === 200) {
          break;
        }
      }

      if (max != 200) {
        let agrp =
          this.cursos[
            this.localizarCurso(this.populacao[individuo][x][h].curso_id)
          ].agrupamento;

        if (agrp == 1) {
          max = 16;
        } else if (agrp == 2) {
          max = 14;
        } else if (agrp == 3) {
          max = 12;
        }

        for (let i = 0; i < 5; i++) {
          j = 1;

          while (j < max) {
            if (
              this.populacao[individuo][x][16 * i + j] != undefined &&
              this.populacao[individuo][x][16 * i + (j + agrp)] != undefined
            ) {
              if (
                this.populacao[individuo][x][16 * i + j] ==
                this.populacao[individuo][x][16 * i + (j + agrp)]
              ) {
                this.fitness[individuo] += 5;
                qtd++;
                // console.log("aula dupla encontrada: " + x + " " + (16 * i + j));
              }
            }

            if (agrp == 1) {
              j++;
            } else if (agrp == 2) {
              j += 2;
            } else if (agrp == 3) {
              j += 3;
            }
          }
        }
      }
    }

    return qtd;
  }

  // Verifica se há choque de horários entre professores
  public choqueHorariosProfessores(individuo: number): number {
    let qtd = 0;

    this.dchq[individuo] = [];
    for (let i = 1; i <= this.turmas.length; i++) {
      this.dchq[individuo][i] = [];

      for (let j = 0; j <= 4; j++) {
        this.dchq[individuo][i][j] = 0;
      }
    }

    // *Horario
    for (let i = 1; i <= 80; i++) {
      // *Turma
      for (let j = 1; j <= this.turmas.length - 1; j++) {
        // *Turmas seguintes
        for (let x = j + 1; x <= this.turmas.length; x++) {
          if (
            this.populacao[individuo][j][i] != undefined &&
            this.populacao[individuo][x][i] != undefined
          ) {
            if (
              this.populacao[individuo][j][i].professor_id ==
              this.populacao[individuo][x][i].professor_id
            ) {
              this.fitness[individuo] -= 500;
              qtd++;

              if (i <= 16) {
                this.dchq[individuo][j][0]++;
                this.dchq[individuo][x][0]++;
              } else if (i <= 32) {
                this.dchq[individuo][j][1]++;
                this.dchq[individuo][x][1]++;
              } else if (i <= 48) {
                this.dchq[individuo][j][2]++;
                this.dchq[individuo][x][2]++;
              } else if (i <= 64) {
                this.dchq[individuo][j][3]++;
                this.dchq[individuo][x][3]++;
              } else if (i <= 80) {
                this.dchq[individuo][j][4]++;
                this.dchq[individuo][x][4]++;
              }
            }
          }
        }
      }
    }

    return qtd;
  }

  // Verifica se há intervalo de 11 horas
  public intervalo11Horas(individuo: number): number {
    let qtd = 0;

    for (let i = 1; i < 5; i++) {
      for (let j = 1; j <= this.turmas.length; j++) {
        if (
          this.populacao[individuo][j][16 * i] != undefined &&
          this.populacao[individuo][j][16 * i + 1] != undefined
        ) {
          if (
            this.populacao[individuo][j][16 * i].professor_id ==
            this.populacao[individuo][j][16 * i + 1].professor_id
          ) {
            this.fitness[individuo] -= 10;
            qtd++;
          }
        }
      }
    }

    return qtd;
  }

  // Verifica se há restrições
  public analiseRestricoes(individuo: number): number {
    let qtd = 0;

    for (let i = 1; i <= this.turmas.length; i++) {
      for (let j = 0; j < this.restricoes.length; j++) {
        let h = 0,
          max = 0;

        if (this.restricoes[j].periodo == "manhã") {
          h = 1 + this.restricoes[j].dia * 16;
          max = h + 5;
        } else if (this.restricoes[j].periodo == "tarde") {
          h = 7 + this.restricoes[j].dia * 16;
          max = h + 5;
        } else if (this.restricoes[j].periodo == "noite") {
          h = 13 + this.restricoes[j].dia * 16;
          max = h + 3;
        }

        for (; h <= max; h++) {
          if (this.populacao[individuo][i][h] != undefined) {
            if (
              this.populacao[individuo][i][h].professor_id ==
              this.restricoes[j].professor_id
            ) {
              this.fitness[individuo] -= 50;
              qtd++;
            }
          }
        }
      }
    }

    return qtd;
  }

  // Seleciona os pais para o cruzamento
  public selecaoTorneio(): number {
    let aleatorio: number,
      maior: number = 0,
      retorno: number = 0;
    let qtd: number = this.qtd_individuos * 0.25;
    let posicoes: number[] = new Array();

    for (let i = 0; i < qtd; ) {
      aleatorio = this.GeraAleatorio(1, this.qtd_individuos);

      if (!posicoes.includes(aleatorio)) {
        posicoes.push(aleatorio);
        i++;
      }
    }

    for (let i = 0; i < qtd; i++) {
      if (this.fitness[posicoes[i]] > maior) {
        maior = this.fitness[posicoes[i]];
        retorno = posicoes[i];
      }
    }
    return retorno;
  }

  // Cruzamento
  public cruzamentoJairo(
    pai1: number,
    pai2: number,
    aleatorio: number
  ): number {
    let restante: DisciplinaType[][] = new Array();
    let pos_restante: number[][] = [];
    let posicao_filho: number;

    for (let i = 1; i <= this.turmas.length; i++) {
      pos_restante[i] = [];

      for (let j = 1; j <= 80; j++) {
        if (this.populacao[pai2][i][j] == undefined) {
          pos_restante[i][j] = 0;
        } else {
          pos_restante[i][j] = 1;
        }
      }
    }

    if (this.filhos.length == 0) {
      posicao_filho = 1;
    } else {
      posicao_filho = this.filhos.length;
    }

    this.filhos[posicao_filho] = [];

    // pegando parte do pai1
    for (let i = 1; i <= this.turmas.length; i++) {
      this.filhos[posicao_filho][i] = [];

      for (let j = 1; j <= 16 * aleatorio; j++) {
        if (this.populacao[pai1][i][j] != undefined) {
          this.filhos[posicao_filho][i][j] = this.populacao[pai1][i][j];
        }
      }
    }

    // analisando informações restantes do pai2 se estão no pai1
    for (let i = 1; i <= this.turmas.length; i++) {
      restante[i] = [];

      for (let j = 16 * aleatorio + 1; j <= 80; j++) {
        if (this.populacao[pai2][i][j] != undefined) {
          let a,
            x = 0;

          do {
            a = this.populacao[pai2][i].indexOf(
              this.populacao[pai1][i][j],
              16 * aleatorio + 1 + x
            );
            x++;
          } while (pos_restante[i][a] == 0 && 16 * aleatorio + 1 + x < 81);

          if (pos_restante[i][a] == 0 && 16 * aleatorio + 1 + x > 80) {
            a = -1;
          }

          if (a == -1) {
            restante[i].push(this.populacao[pai1][i][j]);
          } else {
            this.filhos[posicao_filho][i][a] = this.populacao[pai2][i][a];
            pos_restante[i][a] = 0;
          }
        }
      }
    }

    let contrestante;

    for (let i = 1; i <= this.turmas.length; i++) {
      contrestante = 0;

      for (
        let j = aleatorio * 16 + 1;
        j <= 80 && contrestante < restante[i].length;
        j++
      ) {
        if (
          this.populacao[pai2][i][j] != undefined &&
          this.filhos[posicao_filho][i][j] == undefined
        ) {
          this.filhos[posicao_filho][i][j] = restante[i][contrestante];
          contrestante++;
        }
      }

      for (
        let j = aleatorio * 16 + 1;
        j <= 80 && contrestante < restante[i].length;
        j++
      ) {
        if (
          this.populacao[pai1][i][j] != undefined &&
          this.filhos[posicao_filho][i][j] == undefined
        ) {
          this.filhos[posicao_filho][i][j] = restante[i][contrestante];
          contrestante++;
        }
      }
    }

    return posicao_filho;
  }

  public filhosParaPais() {
    for (let i = 1; i <= this.qtd_individuos; i++) {
      if (this.filhos[i] != undefined) {
        this.populacao[i] = this.filhos[i];
      }
    }
    this.filhos = [];
  }

  // Gera um valora aleatorio entre min e max
  public GeraAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Sorteia um valor do vetor
  public Sorteio(num: number[]): number {
    return num[this.GeraAleatorio(0, num.length - 1)];
  }

  public temHorario(i: number, j: number, periodo: string) {
    if (periodo == "matutino") {
      for (let d = 0; d < 5; d++) {
        for (let h = 1; h < 7; h++) {
          if (this.populacao[i][j][d * 16 + h] == undefined) {
            return true; //*tem vaga ainda
          }
        }
      }
      return false; //*esta cheio
    } else if (periodo == "vespertino") {
      for (let d = 0; d < 5; d++) {
        for (let h = 7; h < 13; h++) {
          if (this.populacao[i][j][d * 16 + h] == undefined) {
            return true; //*tem vaga ainda
          }
        }
      }
      return false; //*esta cheio
    }
  }

  // Retorna a posição do curso no vetor de cursos
  public localizarCurso(id: string): number {
    for (let i = 0; i < this.cursos.length; i++) {
      if (this.cursos[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  public mutacaoDias(individuo: number) {
    let dia1: number, dia2: number;
    let troca: DisciplinaType;

    do {
      dia1 = this.GeraAleatorio(0, 4);
      dia2 = this.GeraAleatorio(0, 4);
    } while (dia1 == dia2);

    for (let i = 1; i <= this.turmas.length; i++) {
      for (let j = 1; j <= 16; j++) {
        if (
          this.filhos[individuo][i][dia1 * 16 + j] != undefined &&
          this.filhos[individuo][i][dia2 * 16 + j] != undefined
        ) {
          troca = this.filhos[individuo][i][dia1 * 16 + j];
          this.filhos[individuo][i][dia1 * 16 + j] =
            this.filhos[individuo][i][dia2 * 16 + j];
          this.filhos[individuo][i][dia2 * 16 + j] = troca;
        } else if (
          this.filhos[individuo][i][dia1 * 16 + j] != undefined &&
          this.filhos[individuo][i][dia2 * 16 + j] == undefined
        ) {
          this.filhos[individuo][i][dia2 * 16 + j] =
            this.filhos[individuo][i][dia1 * 16 + j];
          delete this.filhos[individuo][i][dia1 * 16 + j];
        } else if (
          this.filhos[individuo][i][dia1 * 16 + j] == undefined &&
          this.filhos[individuo][i][dia2 * 16 + j] != undefined
        ) {
          this.filhos[individuo][i][dia1 * 16 + j] =
            this.filhos[individuo][i][dia2 * 16 + j];
          delete this.filhos[individuo][i][dia2 * 16 + j];
        }
      }
    }
  }

  public novoMetodo() {
    let dia1 = 0,
      maior = 0,
      dia2 = 0;
    let troca: DisciplinaType;

    for (let individuo = 1; individuo <= this.qtd_individuos; individuo++) {
      for (let i = 1; i <= this.turmas.length; i++) {
        // acha o dia com mais choques
        maior = 0;
        for (let k = 0; k <= 4; k++) {
          if (this.dchq[individuo][i][k] > maior) {
            maior = this.dchq[individuo][i][k];
            dia1 = k;
          }
        }

        if (maior == 1) {
          for (let k = 0; k <= 4; k++) {
            if (this.dchq[individuo][i][k] == 1 && k != dia1) {
              dia2 = k;
            }
          }
        } else {
          do {
            dia2 = this.GeraAleatorio(0, 4);
          } while (dia1 == dia2);
        }

        // troca por outro dia aleatorio
        if (maior != 0) {
          for (let j = 1; j <= 16; j++) {
            if (
              this.populacao[individuo][i][dia1 * 16 + j] != undefined &&
              this.populacao[individuo][i][dia2 * 16 + j] != undefined
            ) {
              troca = this.populacao[individuo][i][dia1 * 16 + j];
              this.populacao[individuo][i][dia1 * 16 + j] =
                this.populacao[individuo][i][dia2 * 16 + j];
              this.populacao[individuo][i][dia2 * 16 + j] = troca;
            } else if (
              this.populacao[individuo][i][dia1 * 16 + j] != undefined &&
              this.populacao[individuo][i][dia2 * 16 + j] == undefined
            ) {
              this.populacao[individuo][i][dia2 * 16 + j] =
                this.populacao[individuo][i][dia1 * 16 + j];
              delete this.populacao[individuo][i][dia1 * 16 + j];
            } else if (
              this.populacao[individuo][i][dia1 * 16 + j] == undefined &&
              this.populacao[individuo][i][dia2 * 16 + j] != undefined
            ) {
              this.populacao[individuo][i][dia1 * 16 + j] =
                this.populacao[individuo][i][dia2 * 16 + j];
              delete this.populacao[individuo][i][dia2 * 16 + j];
            }
          }
        }
      }
    }
  }

  // Retorna o melhor resultado do fitness
  public resultadoFitness(
    posicao: number,
    ad: number,
    cp: number,
    intervalo: number,
    ar: number
  ) {
    if (this.fitness[posicao] > this.res[0]) {
      this.res[0] = this.fitness[posicao];
      this.res[1] = ad;
      this.res[2] = cp;
      this.res[3] = intervalo;
      this.res[4] = ar;
      this.res2 = this.populacao[posicao];
      this.res3 = this.dchq[posicao];
    } else if (this.fitness[posicao] == this.res[0]) {
      if (this.res[2] >= cp) {
        this.res[0] = this.fitness[posicao];
        this.res[1] = ad;
        this.res[2] = cp;
        this.res[3] = intervalo;
        this.res[4] = ar;
        this.res2 = this.populacao[posicao];
      }
    }
  }

  public exibirResultadoFinal() {
    console.log("Resultado Final - Melhor Solução Encontrada:");
    console.log("Fitness: " + this.res[0]);
    console.log("Aulas Duplas: " + this.res[1]);
    console.log("Choque de Horários Professores: " + this.res[2]);
    console.log("Intervalo de 11 Horas: " + this.res[3]);
    console.log("Restrições Encontradas: " + this.res[4]);
    console.log("Configuração de Horários:");
    for (let i = 1; i <= this.turmas.length; i++) {
      console.log("Turma " + i + ":");
      for (let j = 1; j <= 80; j++) {
        if (this.res2[i][j] !== undefined) {
          const aulaInfo = {
            nomeDisciplina: this.res2[i][j].nome,
            nomeProfessor: this.res2[i][j].professor.nome,
            qtaulas: this.res2[i][j].qtaulas,
            periodo: this.res2[i][j].periodo,
            horario: j,
          };
          console.log(JSON.stringify(aulaInfo));
        }
      }
    }
  }
}
