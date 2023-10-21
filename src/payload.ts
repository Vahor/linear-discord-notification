import * as z from "zod";


export const TeamSchema = z.object({
  "id": z.string(),
  "key": z.string(),
  "name": z.string(),
});
export type Team = z.infer<typeof TeamSchema>;


export const LabelSchema = z.object({
  "id": z.string(),
  "color": z.string(),
  "name": z.string(),
});
export type Label = z.infer<typeof LabelSchema>;

export const StateSchema = LabelSchema.extend({
  "type": z.string(),
});
export type State = z.infer<typeof StateSchema>;

export const DataSchema = z.object({
  "id": z.string(),
  "createdAt": z.coerce.date(),
  "updatedAt": z.coerce.date(),
  "number": z.number(),
  "title": z.string(),
  "priority": z.number(),
  "boardOrder": z.number(),
  "sortOrder": z.number(),
  "teamId": z.string(),
  "previousIdentifiers": z.array(z.any()),
  "creatorId": z.string(),
  "stateId": z.string(),
  "priorityLabel": z.string(),
  "subscriberIds": z.array(z.string()),
  "labelIds": z.array(z.string()),
  "state": StateSchema,
  "team": TeamSchema,
  "labels": z.array(LabelSchema),
  "description": z.string().optional(),
  "descriptionData": z.string().optional(),
});
export type Data = z.infer<typeof DataSchema>;

export const PayloadSchema = z.object({
  "action": z.enum(["create", "update"]),
  "createdAt": z.coerce.date(),
  "data": DataSchema,
  "url": z.string(),
  "type": z.string(),
  "organizationId": z.string(),
  "webhookTimestamp": z.number(),
  "webhookId": z.string(),
});
export type Payload = z.infer<typeof PayloadSchema>;
