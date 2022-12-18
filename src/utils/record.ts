
import { Option } from "@polkadot/types"
import { SubstrateBlock, SubstrateExtrinsic } from "@subql/types";

import {
  Account, MailAddress
} from "../types";

export const getAccount = async (address: string) => {
  let record = await Account.get(address);

  if (!record) {
    record = new Account(address);

    record.address = address;

    await record.save();
  }

  return record;
}

export const getMailAddress = async (type: string, mailaddress: string) => {
  let record = await MailAddress.get(type + mailaddress);

  if (!record) {
    record = new MailAddress(type + mailaddress);

    record.type = type;
    record.mailaddress = mailaddress;

    await record.save();
  }

  return record;
}