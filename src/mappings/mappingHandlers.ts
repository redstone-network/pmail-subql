import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { Account, MailAddress, Mail, Contact } from "../types";
import { AccountId } from "@polkadot/types/interfaces";
import { getAccount, getMailAddress } from "../utils";


export async function handleSendMail(
  event: SubstrateEvent
): Promise<void> {
  //Retrieve the record by its ID
  const record = new Mail(
    `${event.block.block.header.number.toString()}-${
      event.idx
    }`
  );

  const {
    event: {
      data: [from, to, mail],
    },
  } = event;

  {
    let strType = Object.keys(from)[0];
    let strAddr = from[strType];
    let mailAddress = await getMailAddress(strType, strAddr);
    record.fromId = mailAddress.id;
  }
  {
    let strType = Object.keys(to)[0];
    let strAddr = to[strType];
    let mailAddress = await getMailAddress(strType, strAddr);
    record.toId = mailAddress.id;
  }

  let t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(mail["timestamp"]);

  record.timestamp = t;
  record.hash = mail["storeHash"];
  await record.save();
}

export async function handleSendAlias(
  event: SubstrateEvent
): Promise<void> {
  const {
    event: {
      data: [account, addr, alias],
    },
  } = event;

  const owner = await getAccount(account.toString());

  let strType = Object.keys(addr)[0];
  let strAddr = addr[strType];
  let mailAddress = await getMailAddress(strType, strAddr);

  const record = new Contact(
    `${owner.id}-${
      mailAddress.id
    }`
  );
  
  record.ownerId = owner.id;
  record.addrId = mailAddress.id;
  record.alias = alias.toString();
  await record.save();
}