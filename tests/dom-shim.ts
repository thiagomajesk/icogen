import { DOMParser, Element, Node } from "linkedom";

class TestXMLSerializer {
  serializeToString(node: { toString(): string }): string {
    return node.toString();
  }
}

Object.assign(globalThis, {
  DOMParser,
  XMLSerializer: TestXMLSerializer,
  Node,
  Element,
});
