import { getAddress } from '@ethersproject/address';
import type { OperatorFunction } from 'rxjs';
import { pipe } from 'rxjs';
import { filter, scan, startWith } from 'rxjs/operators';

import type { RaidenAction } from '../actions';
import { Capabilities, CapsFallback } from '../constants';
import type { Message } from '../messages/types';
import { decodeJsonMessage, getMessageSigner } from '../messages/utils';
import type { RaidenEpicDeps } from '../types';
import { jsonParse } from '../utils/data';
import { assert, ErrorCodes } from '../utils/error';
import type { Address, Signed } from '../utils/types';
import { matrixPresence } from './actions';
import type { Caps, CapsPrimitive } from './types';

const userRe = /^@(0x[0-9a-f]{40})[.:]/i;

/**
 * Extract the address in a matrix userId and returns it, or undefined it none
 *
 * @param userId - matrix user identifier
 * @returns address contained in userId
 */
export function getAddressFromUserId(userId: string): Address | undefined {
  let address: Address | undefined;
  try {
    const match = userRe.exec(userId);
    if (match) address = getAddress(match[1]) as Address;
  } catch (e) {}
  return address;
}

/**
 * Stringify a caps mapping to a caps url
 * E.g.'mxc://raiden.network/cap?k1=true&k2=v2&k2=v3&k4=null&k5=123'
 *
 * @param caps - Capabilities object/mapping
 * @returns stringified version of caps
 */
export function stringifyCaps(caps: Caps): string {
  const url = new URL('mxc://raiden.network/cap');
  // URLSearchParams.append can handle all primitives
  const appendParam = (key: string, value: CapsPrimitive) =>
    url.searchParams.append(key, value as string);
  for (const [key, value] of Object.entries(caps)) {
    if (Array.isArray(value)) value.forEach(appendParam.bind(null, key));
    else appendParam(key, value);
  }
  return url.href;
}

/**
 * Parse a caps string in the format 'mxc://raiden.network/cap?k1=true&k2=v2&k2=v3&k4=null&k5=123'
 * to a { k1: true, k2: ['v2','v3'], k4: null, k5: 123 } object
 *
 * @param caps - caps string
 * @returns Caps mapping object
 */
export function parseCaps(caps?: string | null): Caps | undefined {
  if (!caps) return;
  const result: Mutable<Caps> = {};
  try {
    const url = new URL(caps);
    url.searchParams.forEach((value, key) => {
      let resValue: Caps[string] = value;
      // interpret *some* types of values
      if (/^\d+$/.test(value)) resValue = jsonParse(value) as number | string;
      else {
        const lowValue = value.toLowerCase();
        if (lowValue === 'none' || lowValue === 'null') resValue = null;
        else if (lowValue === 'false') resValue = false;
        else if (lowValue === 'true') resValue = true;
      }
      if (!(key in result)) {
        result[key] = resValue;
      } else {
        let prevValues = result[key];
        if (!Array.isArray(prevValues)) result[key] = prevValues = [prevValues];
        prevValues.push(resValue);
      }
    });
    return result;
  } catch (err) {}
}

/**
 * @param caps - Our or partner caps object (possibly empty/undefined)
 * @param cap - Cap to fetch from
 * @returns Specified capability, with proper fallback
 */
export function getCap<C extends Capabilities>(caps: Caps | undefined | null, cap: C): Caps[C] {
  return caps?.[cap] ?? CapsFallback[cap];
}

/**
 * Return addresses sorted in lexical order
 *
 * @param addresses - Addresses to sort
 * @returns Addresses sorted in lexical order
 */
export function getSortedAddresses<A extends Address[]>(...addresses: A) {
  return addresses.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) as A;
}

/**
 * Extracts peer's addresses which don't need Delivered messages as a set
 *
 * @returns custom operator mapping from stream of RaidenActions to address set
 */
export function getNoDeliveryPeers(): OperatorFunction<RaidenAction, Set<Address>> {
  const noDelivery = new Set<Address>();
  return pipe(
    filter(matrixPresence.success.is),
    scan((acc, presence) => {
      if (!getCap(presence.payload.caps, Capabilities.DELIVERY)) acc.add(presence.meta.address);
      else acc.delete(presence.meta.address);
      return acc;
    }, noDelivery),
    startWith(noDelivery),
  );
}

/**
 * Parse a received message into either a Message or Signed<Message>
 * If Signed, the signer must match the sender's address.
 * Errors are logged and undefined returned
 *
 * @param line - String to be parsed as a single message
 * @param address - Sender's address
 * @param deps - Dependencies
 * @param deps.log - Logger instance
 * @returns Validated Signed or unsigned Message, or undefined
 */
export function parseMessage(
  line: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  address: Address,
  { log }: Pick<RaidenEpicDeps, 'log'>,
): Message | Signed<Message> | undefined {
  if (typeof line !== 'string') return;
  try {
    const message = decodeJsonMessage(line);
    // if Signed, accept only if signature matches sender address
    if ('signature' in message) {
      const signer = getMessageSigner(message);
      assert(signer === address, [
        ErrorCodes.TRNS_MESSAGE_SIGNATURE_MISMATCH,
        {
          sender: address,
          signer,
        },
      ]);
    }
    return message;
  } catch (err) {
    log.warn(`Could not decode message: ${line}: ${err}`);
  }
}
