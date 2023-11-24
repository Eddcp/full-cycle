import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendLog1WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(eventData: any) {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
