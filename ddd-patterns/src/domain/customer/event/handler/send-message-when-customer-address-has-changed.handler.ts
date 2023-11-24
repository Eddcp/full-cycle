import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-has-changed.event";

export default class SendMessageWhenCustomerAddressHasChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: any): void {
    const { eventData } = event || {};
    console.log(
      `Endereço do cliente: ${eventData?.id}, ${eventData?.name} alterado para ${eventData?.Address}`
    );
  }
}
