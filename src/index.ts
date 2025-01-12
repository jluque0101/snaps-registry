import {
  VersionStruct,
  VersionRangeStruct,
  ChecksumStruct,
} from '@metamask/utils';
import {
  object,
  array,
  record,
  string,
  union,
  optional,
  Infer,
} from 'superstruct';

const VerifiedSnapVersionStruct = object({
  checksum: ChecksumStruct,
});

export const VerifiedSnapStruct = object({
  id: string(),
  metadata: object({
    name: string(),
  }),
  versions: record(VersionStruct, VerifiedSnapVersionStruct),
});

export const BlockReasonStruct = object({
  explanation: optional(string()),
  url: optional(string()),
});

export type BlockReason = Infer<typeof BlockReasonStruct>;

export const BlockedSnapStruct = union([
  object({
    id: string(),
    versionRange: VersionRangeStruct,
    reason: optional(BlockReasonStruct),
  }),
  object({ checksum: ChecksumStruct, reason: optional(BlockReasonStruct) }),
]);

export const SnapsRegistryDatabaseStruct = object({
  verifiedSnaps: record(string(), VerifiedSnapStruct),
  blockedSnaps: array(BlockedSnapStruct),
});

export type SnapsRegistryDatabase = Infer<typeof SnapsRegistryDatabaseStruct>;

export * from './verify';
