export default function getRootNode(node) {
  return node.parent
    ? getRootNode(node.parent)
    : node
}
