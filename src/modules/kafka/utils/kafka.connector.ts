import axios from 'axios';
import { ConnectorConfig } from './connector.interface';

export const createDebeziumConnector = async (config: ConnectorConfig, retry = false): Promise<any> => {
  const connectorJson = {
    'connector.class': 'io.debezium.connector.postgresql.PostgresConnector',
    'database.hostname': process.env.DB_HOST,
    'database.port': process.env.DB_PORT,
    'database.user': process.env.DB_USERNAME,
    'database.password': process.env.DB_PASSWORD,
    'database.dbname': process.env.DB_DATABASE,
    'database.server.name': process.env.DB_SERVER_NAME || 'gestao-usuarios-server',
    'plugin.name': 'pgoutput',

    // Variáveis dinâmicas
    'slot.name': `debezium_slot_${config.table}`,
    'publication.name': `debezium_pub_${config.table}`,
    'table.include.list': `${config.schema}.${config.table}`,
    'topic.prefix': config.topicPrefix,

    // Transform
    'transforms': 'route',
    'transforms.route.type': 'org.apache.kafka.connect.transforms.RegexRouter',
    'transforms.route.regex': `${config.topicPrefix}\\.(${config.schema})\\.(${config.table})`,
    'transforms.route.replacement': `${config.topicPrefix}_topic`,
  };

  const baseUrl = `http://kafka-connect:8083/connectors`;
  const url = `${baseUrl}`;

  try {
    const response = await axios.post(
      url,
      { name: config.connectorName, config: connectorJson },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log(`✅ Conector criado: ${config.connectorName}`);
    return response.data;

  } catch (err: any) {
    // Se o conector já existir
    if (err.response && err.response.status === 409) {
      console.log(`⚠️ Conector ${config.connectorName} já existe.`);

      // Evita loop infinito — só tenta uma vez
      if (!retry) {
        console.log(`🧹 Removendo conector antigo: ${config.connectorName}...`);

        try {
          await axios.delete(`${baseUrl}/${config.connectorName}`);
          console.log(`🗑️ Conector ${config.connectorName} removido com sucesso.`);
          console.log(`🔄 Tentando recriar conector ${config.connectorName}...`);
          return await createDebeziumConnector(config, true); // Recursão controlada
        } catch (deleteErr: any) {
          console.error(`❌ Erro ao deletar conector ${config.connectorName}:`, deleteErr.message);
          throw deleteErr;
        }
      } else {
        console.error(`🚫 Já tentamos recriar o conector ${config.connectorName}, abortando.`);
        throw err;
      }

    } else {
      console.error(`❌ Erro ao criar conector ${config.connectorName}:`, err.message);
      throw err;
    }
  }
};
