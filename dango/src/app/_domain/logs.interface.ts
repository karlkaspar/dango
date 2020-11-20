export class Logs {
  actions: [{
    id: number; // ACTION ID, WILL BE HARDCODED
    userId: number;
    type: string; // CREATE, REMOVE, DELETE etc..
    context: string; // "Album" perhaps..
    contextId: number; // albumId
    subContext: string; // "photo"
    subContextId: number; // photoId
    timeStamp: Date // WHEN DID THE ACTION HAPPEN
  }]
}
