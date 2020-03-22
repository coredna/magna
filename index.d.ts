
export interface Config {
  [key: string]: any
}

export interface RequestConfig extends Config {
  type: string;
  uuid: number;
  url: string,
  params: Params;
  scrollTop: number;
}

export interface Params {
  request: Request;
  config: Config;
}

export interface PopstateParams extends Params {
  response: object;
}

export interface ErrorParams extends Params {
  error: Error
}

export interface Request {
  type: string;
  keywords: Array<string>;
  params: Params;
  scrollTop: number;

  constructor(config: RequestConfig): Request
}

export type State = any

export interface StateSetter {
  (state: State): void
}

export interface StateViewer {
  (state: State): State
}

export type Path = string | Array<string | number>

type INITIALIZED = symbol

export interface BaseNode {

  config: Config
  defaultConfig?: Config
  children: Array<Node>
  parent: Node | void
  id: string
  [Symbol.toStringTag]: string
  [key: string]: any
  INITIALIZED: boolean

  shouldInitialize(params: Params): boolean
  initChildren(): void

  init(params: Params): any
  runInit(params: Params): Promise<any>
  initPromise(params: Params): Promise<any>
  getInitPromise(params: Params): Promise<any> | void
  getParentInitPromise(params: Params): Promise<any>

  popstate(params: PopstateParams): any
  runPopstate(params: PopstateParams): Promise<any>
  popstatePromise(params: PopstateParams): Promise<any>
  getPopstatePromise(params: PopstateParams): Promise<any> | void
  getParentPopstatePromise(params: PopstateParams): Promise<any>

  destroy(params: Params): any
  runDestroy(params: Params): Promise<any>
  destroyPromise(params: Params): Promise<any>
  getDestroyPromise(params: Params): Promise<any> | void
  getParentDestroyPromise(params: Params): Promise<any>

  catch(params: ErrorParams): void
  onCatch(params: ErrorParams): void
  runCatch(params: ErrorParams): any
  onPropagateError(params: ErrorParams): void
  onBubbleError(params: ErrorParams): void

  setState(path: Path, stateSetter: StateSetter): Magna
  subscribe(path: Path, stateViewer: StateViewer): boolean
  unsubscribe(path: Path, stateViewer: StateViewer): boolean
  trigger(path: Path): void

  log(method: string, message: string): void
  info(method: string, message: string): void
}

interface iNode extends BaseNode {
  constructor(config: Config, nodes: Array<Node>): Node
}

interface MagnaConfig {
  debug: boolean
  env: 'development' | 'production' | 'staging'
  setScrollOnPopstate: boolean
}

export interface Magna extends BaseNode {
  debug: boolean
  env: 'development' | 'production' | 'staging'
  __state: State
  __subscribers: Record<string, Node>
  request: Request,
  constructor(nodes: Array<Node>): Magna
  getHistory(): any
  start(config?: MagnaConfig): void
  pushState(object: object, title: string, url: string, params: Params): void
  use(nodes: Array<Node>): Magna
  rerun(): Magna
  __setActiveUrl(): void
  getState(path: Path): State
  setState(path: Path, stateSetter: StateSetter): Magna
}

interface Importer {
  (): Promise<any>
}

interface Import extends BaseNode {
  __promise: Promise<any>
  importer: Importer
  constructor(importer: Importer, nodes: Array<Node>): Import
}

interface Lazy extends BaseNode {
  __promise: Promise<any>
  importer: Importer
  constructor(importer: Importer, config?: Config, nodes?: Array<Node>): Lazy
}

interface Module extends BaseNode {
  constructor(nodes: Array<Node>): Module
}

interface Plugin extends BaseNode {
  constructor(config?: Config): Plugin
}

interface ProcessHrefParams {
  href: string
  regex: RegExp
  params: Params
  keywords: Array<string>
}

interface iPredicate extends BaseNode {
  predicate(params: Params): void
}

export interface Predicate extends iPredicate {
  constructor(config?: Config, nodes?: Array<Node>): Predicate
}

export interface Route extends iPredicate {
  constructor(url: string, nodes: Array<Node>): Route
  processHref(params: ProcessHrefParams): any
  createNewRequest(params: Params): Request
  predicate(params: Params): boolean
}

interface Singleton extends BaseNode {
  initialized: boolean
  constructor(config?: Config): Singleton
}

export type Node = iNode | Import | Lazy | Module | Plugin | Predicate | Route | Singleton
