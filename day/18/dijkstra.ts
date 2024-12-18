export interface InnerObject {
  toString(): string;
  equals(other: InnerObject): boolean;
}

export class Graph<O extends InnerObject> {
  nodes: GraphNode<O>[] = [];
}

export class GraphNode<O extends InnerObject> {
  neighbors: GraphNode<O>[] = [];

  constructor(public innerObject: O) {}

  toString(): string {
    return this.innerObject.toString();
  }
}
