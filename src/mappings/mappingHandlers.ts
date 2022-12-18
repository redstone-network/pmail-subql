import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { SendMail } from "../types";
import { AccountId } from "@polkadot/types/interfaces";

export async function handleSendMail(
  event: SubstrateEvent
): Promise<void> {
  //Retrieve the record by its ID
  const record = new SendMail(
    `${event.block.block.header.number.toString()}-${
      event.idx
    }`
  );

  const {
    event: {
      data: [to, mail],
    },
  } = event;

  record.to = to.toString();
  record.mail = mail.toString();
  await record.save();
}
