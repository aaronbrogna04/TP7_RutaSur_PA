import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

const kafka = new Kafka({
  clientId: 'simulador',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const shipmentId = `ENV-${randomUUID().slice(0, 8)}`;
const tipos = ['CREADO', 'INGRESADO_HUB', 'CLASIFICADO', 'EN_REPARTO', 'ENTREGADO'];

function armarEvento(tipo, secuencia) {
  return {
    eventId: randomUUID(),
    shipmentId,
    tipo,
    ocurridoEn: new Date().toISOString(),
    secuencia,
    hubId: 'HUB-1',
    zonaId: 'ZONA-A',
    repartidorId: 'REP-001',
    version: 1,
  };
}

await producer.connect();

for (let i = 0; i < tipos.length; i++) {
  const evento = armarEvento(tipos[i], i + 1);
  await producer.send({
    topic: 'envios.estados',
    messages: [{ key: shipmentId, value: JSON.stringify(evento) }],
  });
  console.log(`Publicado ${evento.tipo} (secuencia ${evento.secuencia}) de ${shipmentId}`);
}

await producer.disconnect();
