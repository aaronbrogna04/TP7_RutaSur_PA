#!/usr/bin/env bash
set -e
K="docker exec rutasur-kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists"

$K --topic envios.estados --partitions 3 --replication-factor 1 --config retention.ms=2592000000
$K --topic envios.promesas --partitions 1 --replication-factor 1 --config cleanup.policy=compact
$K --topic envios.reprogramaciones --partitions 1 --replication-factor 1 --config retention.ms=2592000000
$K --topic alertas.sla --partitions 1 --replication-factor 1 --config retention.ms=604800000
$K --topic notificaciones.enviadas --partitions 1 --replication-factor 1 --config retention.ms=604800000
$K --topic envios.estados.dlq --partitions 1 --replication-factor 1 --config retention.ms=2592000000
