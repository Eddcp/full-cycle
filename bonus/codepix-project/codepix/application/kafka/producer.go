package kafka

import (
	"fmt"
	"os"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

func NewKafkaProducer() *ckafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": os.Getenv("kafkaBootstrapServers"),
	}
	p, err := ckafka.NewProducer(configMap)
	if err != nil {
		panic(err)
	}
	return p
}

func Publish(msg string, topic string, producer *kafka.Producer, deliveryChannel chan ckafka.Event) error {
	message := &ckafka.Message{
		TopicPartition: ckafka.TopicPartition{Topic: &topic, Partition: ckafka.PartitionAny},
		Value: []byte(msg),
	}
	err := producer.Produce(message, deliveryChannel)
	if err != nil {
		return err 
	}
	return nil
}

func DeliverReport(deliveryChannel chan ckafka.Event) {
	for e := range deliveryChannel {
		switch event := e.(type) {
		case *ckafka.Message:
			if event.TopicPartition.Error != nil {
				fmt.Println("Delivery failed:", event.TopicPartition)
			} else {
				fmt.Println("Delivered message to:", event.TopicPartition)
			}
		}
	}
}