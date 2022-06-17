declare namespace API {
  /**
   *
   * @export
   * @interface Action
   */
  export interface Action {
    /**
     *
     * @type {number}
     * @memberof Action
     */
    id?: number;
    /**
     * Project ID
     * @type {number}
     * @memberof Action
     */
    projectId?: number;
    /**
     * name
     * @type {string}
     * @memberof Action
     */
    name?: string;
    /**
     * Operation Description
     * @type {string}
     * @memberof Action
     */
    description?: string;
    /**
     * Creator ID
     * @type {number}
     * @memberof Action
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof Action
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof Action
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof Action
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof Action
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface ActionPagination
   */
  export interface ActionPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof ActionPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof ActionPagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof ActionPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof ActionPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<Action>}
     * @memberof ActionPagination
     */
    list?: Array<Action>;
  }
  /**
   *
   * @export
   * @interface ApiResponse
   */
  export interface ApiResponse {
    /**
     *
     * @type {number}
     * @memberof ApiResponse
     */
    code?: number;
    /**
     *
     * @type {string}
     * @memberof ApiResponse
     */
    msg?: string;
  }
  /**
   *
   * @export
   * @interface Group
   */
  export interface Group {
    /**
     *
     * @type {number}
     * @memberof Group
     */
    id?: number;
    /**
     * 名字
     * @type {string}
     * @memberof Group
     */
    name?: string;
    /**
     * description
     * @type {string}
     * @memberof Group
     */
    description?: string;
    /**
     * Creator ID
     * @type {number}
     * @memberof Group
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof Group
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof Group
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof Group
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof Group
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface GroupPagination
   */
  export interface GroupPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof GroupPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof GroupPagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof GroupPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof GroupPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<Group>}
     * @memberof GroupPagination
     */
    list?: Array<Group>;
  }
  /**
   *
   * @export
   * @interface Menu
   */
  export interface Menu {
    /**
     *
     * @type {number}
     * @memberof Menu
     */
    id?: number;
    /**
     * Project ID
     * @type {number}
     * @memberof Menu
     */
    projectId?: number;
    /**
     * name
     * @type {string}
     * @memberof Menu
     */
    name?: string;
    /**
     * Remark
     * @type {string}
     * @memberof Menu
     */
    desc?: string;
    /**
     * i18n primary key
     * @type {string}
     * @memberof Menu
     */
    i18N?: string;
    /**
     * Sort value
     * @type {number}
     * @memberof Menu
     */
    sortOrder?: number;
    /**
     * icon
     * @type {string}
     * @memberof Menu
     */
    icon?: string;
    /**
     * Routing, choose one of link, externalLink
     * @type {string}
     * @memberof Menu
     */
    link?: string;
    /**
     * access route
     * @type {string}
     * @memberof Menu
     */
    externalLink?: string;
    /**
     * Link target
     * @type {string}
     * @memberof Menu
     */
    target?: string;
    /**
     * Whether to disable the menu, 1: not disabled 2: disabled
     * @type {number}
     * @memberof Menu
     */
    disabled?: number;
    /**
     * Hide menu, 1: not hidden 2: hidden
     * @type {number}
     * @memberof Menu
     */
    hide?: number;
    /**
     * hide crumbs, 1: not hide 2: hide
     * @type {number}
     * @memberof Menu
     */
    hideInBreadcrumb?: number;
    /**
     * Parent ID
     * @type {number}
     * @memberof Menu
     */
    parentId?: number;
    /**
     * Creator ID
     * @type {number}
     * @memberof Menu
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof Menu
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof Menu
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof Menu
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof Menu
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface MenuPagination
   */
  export interface MenuPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof MenuPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof MenuPagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof MenuPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof MenuPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<Menu>}
     * @memberof MenuPagination
     */
    list?: Array<Menu>;
  }
  /**
   *
   * @export
   * @interface Org
   */
  export interface Org {
    /**
     *
     * @type {number}
     * @memberof Org
     */
    id?: number;
    /**
     * Organization Code
     * @type {string}
     * @memberof Org
     */
    code?: string;
    /**
     * name
     * @type {string}
     * @memberof Org
     */
    name?: string;
    /**
     * Remark
     * @type {string}
     * @memberof Org
     */
    description?: string;
    /**
     * logo
     * @type {string}
     * @memberof Org
     */
    logo?: string;
    /**
     * Creator ID
     * @type {number}
     * @memberof Org
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof Org
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof Org
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof Org
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof Org
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface OrgNode
   */
  export interface OrgNode {
    /**
     *
     * @type {number}
     * @memberof OrgNode
     */
    id?: number;
    /**
     * name
     * @type {string}
     * @memberof OrgNode
     */
    name?: string;
    /**
     * Remark
     * @type {string}
     * @memberof OrgNode
     */
    description?: string;
    /**
     * Parent ID
     * @type {number}
     * @memberof OrgNode
     */
    parentId?: number;
    /**
     * organization ID
     * @type {number}
     * @memberof OrgNode
     */
    orgId?: number;
    /**
     * root node 1 yes, 2 no
     * @type {number}
     * @memberof OrgNode
     */
    root?: number;
    /**
     * number of levels
     * @type {number}
     * @memberof OrgNode
     */
    depth?: number;
    /**
     * Sort value
     * @type {number}
     * @memberof OrgNode
     */
    order?: number;
    /**
     * Creator ID
     * @type {number}
     * @memberof OrgNode
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof OrgNode
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof OrgNode
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof OrgNode
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof OrgNode
     */
    deletedAt?: string;
    /**
     *
     * @type {any}
     * @memberof OrgNode
     */
    org?: any | null;
  }
  /**
   *
   * @export
   * @interface OrgNodePagination
   */
  export interface OrgNodePagination {
    /**
     * json repose code
     * @type {number}
     * @memberof OrgNodePagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof OrgNodePagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof OrgNodePagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof OrgNodePagination
     */
    limit?: number;
    /**
     *
     * @type {Array<OrgNode>}
     * @memberof OrgNodePagination
     */
    list?: Array<OrgNode>;
  }
  /**
   *
   * @export
   * @interface OrgPagination
   */
  export interface OrgPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof OrgPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof OrgPagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof OrgPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof OrgPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<Org>}
     * @memberof OrgPagination
     */
    list?: Array<Org>;
  }
  /**
   *
   * @export
   * @interface Project
   */
  export interface Project {
    /**
     *
     * @type {number}
     * @memberof Project
     */
    id: number;
    /**
     * ame
     * @type {string}
     * @memberof Project
     */
    name: string;
    /**
     * description
     * @type {string}
     * @memberof Project
     */
    description?: string;
    /**
     * Creator ID
     * @type {number}
     * @memberof Project
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof Project
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof Project
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof Project
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof Project
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface ProjectPagination
   */
  export interface ProjectPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof ProjectPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof ProjectPagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof ProjectPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof ProjectPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<Project>}
     * @memberof ProjectPagination
     */
    list?: Array<Project>;
  }
  /**
   *
   * @export
   * @interface Resource
   */
  export interface Resource {
    /**
     *
     * @type {number}
     * @memberof Resource
     */
    id?: number;
    /**
     * Project ID
     * @type {number}
     * @memberof Resource
     */
    projectId?: number;
    /**
     * name
     * @type {string}
     * @memberof Resource
     */
    name?: string;
    /**
     * resource description
     * @type {string}
     * @memberof Resource
     */
    description?: string;
    /**
     * Resource Type, 1: API 2: Menu 3: Data
     * @type {string}
     * @memberof Resource
     */
    type?: string;
    /**
     * Resource routing, valid when type is 1
     * @type {string}
     * @memberof Resource
     */
    route?: string;
    /**
     * Menu ID, valid when type is 2
     * @type {number}
     * @memberof Resource
     */
    menuId?: number;
    /**
     * Creator ID
     * @type {number}
     * @memberof Resource
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof Resource
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof Resource
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof Resource
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof Resource
     */
    deletedAt?: string;
  }
  /**
   *
   * @export
   * @interface ResourcePagination
   */
  export interface ResourcePagination {
    /**
     * json repose code
     * @type {number}
     * @memberof ResourcePagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof ResourcePagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof ResourcePagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof ResourcePagination
     */
    limit?: number;
    /**
     *
     * @type {Array<Resource>}
     * @memberof ResourcePagination
     */
    list?: Array<Resource>;
  }
  /**
   *
   * @export
   * @interface User
   */
  export interface User {
    /**
     *
     * @type {number}
     * @memberof User
     */
    id?: number;
    /**
     * name
     * @type {string}
     * @memberof User
     */
    username?: string;
    /**
     * Nick name
     * @type {string}
     * @memberof User
     */
    nickname?: string;
    /**
     * password
     * @type {string}
     * @memberof User
     */
    password?: string;
    /**
     * Phone number
     * @type {string}
     * @memberof User
     */
    mobile?: string;
    /**
     * Whether the mobile phone number verification is passed 1 passed, 2 failed
     * @type {number}
     * @memberof User
     */
    mobileVerified?: number;
    /**
     * email
     * @type {string}
     * @memberof User
     */
    email?: string;
    /**
     * Email verification passed 1 passed, 2 failed
     * @type {number}
     * @memberof User
     */
    emailVerified?: number;
    /**
     * 1 enabled, 2 disabled, 3 logged out
     * @type {number}
     * @memberof User
     */
    status?: number;
    /**
     * Gender 1 male, 2 female, 3 unknown
     * @type {number}
     * @memberof User
     */
    gender?: number;
    /**
     * address
     * @type {string}
     * @memberof User
     */
    address?: string;
    /**
     * Last login IP address
     * @type {string}
     * @memberof User
     */
    lastLoginIp?: string;
    /**
     * Last login time
     * @type {string}
     * @memberof User
     */
    lastLoginTime?: string;
    /**
     * Login times (counter)
     * @type {number}
     * @memberof User
     */
    loginCount?: number;
    /**
     * Avatar (picture)
     * @type {string}
     * @memberof User
     */
    avatar?: string;
    /**
     * Creator ID
     * @type {number}
     * @memberof User
     */
    createBy?: number;
    /**
     * Modify person ID
     * @type {number}
     * @memberof User
     */
    updateBy?: number;
    /**
     *
     * @type {string}
     * @memberof User
     */
    createdAt?: string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    updatedAt?: string;
    /**
     *
     * @type {string}
     * @memberof User
     */
    deletedAt?: string;
    /**
     *
     * @type {Array<Group>}
     * @memberof User
     */
    groups?: Array<Group>;
    /**
     *
     * @type {Array<OrgNode>}
     * @memberof User
     */
    orgNodes?: Array<OrgNode>;
  }
  /**
   *
   * @export
   * @interface UserPagination
   */
  export interface UserPagination {
    /**
     * json repose code
     * @type {number}
     * @memberof UserPagination
     */
    code?: number;
    /**
     * total numbers
     * @type {number}
     * @memberof UserPagination
     */
    total?: number;
    /**
     * offset
     * @type {number}
     * @memberof UserPagination
     */
    offset?: number;
    /**
     * limit
     * @type {number}
     * @memberof UserPagination
     */
    limit?: number;
    /**
     *
     * @type {Array<User>}
     * @memberof UserPagination
     */
    list?: Array<User>;
  }
}
