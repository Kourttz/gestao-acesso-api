import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { EmpregadosService } from '../empregados/empregados.service';
import { DebeziumDateUtil } from './utils/debezium-date.util';
import { createDebeziumConnector } from './utils/kafka.connector';
import { ConnectorConfig } from './utils/connector.interface';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    private readonly empregadosService: EmpregadosService,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'api_gestao_de_acessos',
      brokers: ['kafka:29092'],
    });

    const consumer = kafka.consumer({ groupId: 'empregados-consumer' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'empregados_plansul_topic', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (!message.value) return;

        try {
          const event = JSON.parse(message.value.toString());
          const op = event?.op;

          if (!op) return;

          // Caso CREATE ou READ (snapshot inicial)
          if (op === 'c' || op === 'r') {
            const empregado = DebeziumDateUtil.convertEmpregado(event.after);
            if (!empregado?.co_matricula) return;

            await this.empregadosService.create(empregado);
          }

          // Caso UPDATE
          else if (op === 'u') {
            const empregado = DebeziumDateUtil.convertEmpregado(event.after);
            if (!empregado?.co_matricula) return;

            await this.empregadosService.update(empregado.co_matricula, empregado);
          }

          // Caso DELETE
          else if (op === 'd') {
            const matricula = event.before?.co_matricula;
            if (!matricula) return;

            await this.empregadosService.delete(matricula);
          }

        } catch (err) {
          console.error('Erro ao processar mensagem Kafka:', err);
        }
      },
    });
  }
  async criarConnector(config: ConnectorConfig) {
    return await createDebeziumConnector(config);
  }
}
