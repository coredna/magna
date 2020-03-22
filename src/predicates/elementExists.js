import Predicate from '../types/Predicate';

export class ElementExists extends Predicate {

    [Symbol.toStringTag] = 'ElementExists';

    constructor(selector, nodes) {
        super({selector}, nodes)
    }
    predicate({ request }) {
        return !!document.querySelector(this.config.selector)
    }
}

export default (selector, nodes) =>
  new ElementExists(selector, nodes)
