import { r as react } from '../common/index-4727b338.js';
import { r as reactDom } from '../common/index-1c5bc8ea.js';
import { p as propTypes$1 } from '../common/index-07930eac.js';

/* eslint-disable no-restricted-globals, eqeqeq  */
/**
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also
 * need affected components to render on the server. One example is when setting
 * a component's descendants to retrieve their index values.
 *
 * Important to note that using this hook as an escape hatch will break the
 * eslint dependency warnings unless you rename the import to `useLayoutEffect`.
 * Use sparingly only when the effect won't effect the rendered HTML to avoid
 * any server/client mismatch.
 *
 * If a useLayoutEffect is needed and the result would create a mismatch, it's
 * likely that the component in question shouldn't be rendered on the server at
 * all, so a better approach would be to lazily render those in a parent
 * component after client-side hydration.
 *
 * TODO: We are calling useLayoutEffect in a couple of places that will likely
 * cause some issues for SSR users, whether the warning shows or not. Audit and
 * fix these.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 *
 * @param effect
 * @param deps
 */

var useIsomorphicLayoutEffect = /*#__PURE__*/ canUseDOM()
  ? react.useLayoutEffect
  : react.useEffect;
/**
 * When in dev mode, checks that styles for a given @reach package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */
// @ts-ignore

var checkStyles = noop;
/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */

function assignRef(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(
        'Cannot assign value "' + value + '" to ref "' + ref + '"',
      );
    }
  }
}
function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}
/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */

function getOwnerDocument(element) {
  return element && element.ownerDocument
    ? element.ownerDocument
    : canUseDOM()
    ? document
    : null;
}
/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */

function isFunction(value) {
  return !!(value && {}.toString.call(value) == '[object Function]');
}
/**
 * No-op function.
 */

function noop() {}
/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */

function useForkedRef() {
  for (
    var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0;
    _key4 < _len4;
    _key4++
  ) {
    refs[_key4] = arguments[_key4];
  }

  return react.useMemo(function () {
    if (
      refs.every(function (ref) {
        return ref == null;
      })
    ) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(refs));
}
/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */

function wrapEvent(theirHandler, ourHandler) {
  return function (event) {
    theirHandler && theirHandler(event);

    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

/**
 * Welcome to @reach/portal!
 *
 * Creates and appends a DOM node to the end of `document.body` and renders a
 * React tree into it. Useful for rendering a natural React element hierarchy
 * with a different DOM hierarchy to prevent parent styles from clipping or
 * hiding content (for popovers, dropdowns, and modals).
 *
 * @see Docs   https://reacttraining.com/reach-ui/portal
 * @see Source https://github.com/reach/reach-ui/tree/main/packages/portal
 * @see React  https://reactjs.org/docs/portals.html
 */
/**
 * Portal
 *
 * @see Docs https://reacttraining.com/reach-ui/portal#portal
 */

var Portal = function Portal(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'reach-portal' : _ref$type;
  var mountNode = react.useRef(null);
  var portalNode = react.useRef(null);

  var _useState = react.useState(),
    forceUpdate = _useState[1];

  useIsomorphicLayoutEffect(
    function () {
      // This ref may be null when a hot-loader replaces components on the page
      if (!mountNode.current) return; // It's possible that the content of the portal has, itself, been portaled.
      // In that case, it's important to append to the correct document element.

      var ownerDocument = mountNode.current.ownerDocument;
      portalNode.current =
        ownerDocument === null || ownerDocument === void 0
          ? void 0
          : ownerDocument.createElement(type);
      ownerDocument.body.appendChild(portalNode.current);
      forceUpdate({});
      return function () {
        if (portalNode.current && portalNode.current.ownerDocument) {
          portalNode.current.ownerDocument.body.removeChild(portalNode.current);
        }
      };
    },
    [type],
  );
  return portalNode.current
    ? reactDom.createPortal(children, portalNode.current)
    : react.createElement('span', {
        ref: mountNode,
      });
};

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

var FOCUS_GROUP = 'data-focus-lock';
var FOCUS_DISABLED = 'data-focus-lock-disabled';
var FOCUS_ALLOW = 'data-no-focus-lock';
var FOCUS_AUTO = 'data-autofocus-inside';

/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */
function assignRef$1(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
function useCallbackRef(initialValue, callback) {
  var ref = react.useState(function () {
    return {
      // value
      value: initialValue,
      // last callback
      callback: callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        },
      },
    };
  })[0];
  // update callback
  ref.callback = callback;
  return ref.facade;
}

/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function useMergeRefs(refs, defaultValue) {
  return useCallbackRef(defaultValue, function (newValue) {
    return refs.forEach(function (ref) {
      return assignRef$1(ref, newValue);
    });
  });
}

var hiddenGuard = {
  width: '1px',
  height: '0px',
  padding: 0,
  overflow: 'hidden',
  position: 'fixed',
  top: '1px',
  left: '1px',
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function () {
      if (assigned) {
        throw new Error(
          'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
        );
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function (data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function () {
        buffer = buffer.filter(function (x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function (cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function (x) {
          return cb(x);
        },
        filter: function () {
          return buffer;
        },
      };
    },
    assignMedium: function (cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function () {
        var cbs = pendingQueue;
        pendingQueue = [];
        cbs.forEach(cb);
      };
      var cycle = function () {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function (x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function (filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        },
      };
    },
  };
  return medium;
}
function createMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  return innerCreateMedium(defaults, middleware);
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}

var SideCar = function (_a) {
  var sideCar = _a.sideCar,
    rest = __rest(_a, ['sideCar']);
  if (!sideCar) {
    throw new Error(
      'Sidecar: please provide `sideCar` property to import the right car',
    );
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error('Sidecar medium not found');
  }
  return react.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

var mediumFocus = createMedium({}, function (_ref) {
  var target = _ref.target,
    currentTarget = _ref.currentTarget;
  return {
    target: target,
    currentTarget: currentTarget,
  };
});
var mediumBlur = createMedium();
var mediumEffect = createMedium();
var mediumSidecar = createSidecarMedium({
  async: true,
});

var emptyArray = [];
var FocusLock = /*#__PURE__*/ react.forwardRef(function (props, parentRef) {
  var _extends2;

  var _React$useState = react.useState(),
    realObserved = _React$useState[0],
    setObserved = _React$useState[1];

  var observed = react.useRef();
  var isActive = react.useRef(false);
  var originalFocusedElement = react.useRef(null);
  var children = props.children,
    disabled = props.disabled,
    noFocusGuards = props.noFocusGuards,
    persistentFocus = props.persistentFocus,
    crossFrame = props.crossFrame,
    autoFocus = props.autoFocus,
    allowTextSelection = props.allowTextSelection,
    group = props.group,
    className = props.className,
    whiteList = props.whiteList,
    _props$shards = props.shards,
    shards = _props$shards === void 0 ? emptyArray : _props$shards,
    _props$as = props.as,
    Container = _props$as === void 0 ? 'div' : _props$as,
    _props$lockProps = props.lockProps,
    containerProps = _props$lockProps === void 0 ? {} : _props$lockProps,
    SideCar = props.sideCar,
    shouldReturnFocus = props.returnFocus,
    onActivationCallback = props.onActivation,
    onDeactivationCallback = props.onDeactivation;

  var _React$useState2 = react.useState({}),
    id = _React$useState2[0]; // SIDE EFFECT CALLBACKS

  var onActivation = react.useCallback(
    function () {
      originalFocusedElement.current =
        originalFocusedElement.current || (document && document.activeElement);

      if (observed.current && onActivationCallback) {
        onActivationCallback(observed.current);
      }

      isActive.current = true;
    },
    [onActivationCallback],
  );
  var onDeactivation = react.useCallback(
    function () {
      isActive.current = false;

      if (onDeactivationCallback) {
        onDeactivationCallback(observed.current);
      }
    },
    [onDeactivationCallback],
  );
  var returnFocus = react.useCallback(
    function (allowDefer) {
      var current = originalFocusedElement.current;

      if (Boolean(shouldReturnFocus) && current && current.focus) {
        var focusOptions =
          typeof shouldReturnFocus === 'object' ? shouldReturnFocus : undefined;
        originalFocusedElement.current = null;

        if (allowDefer) {
          // React might return focus after update
          // it's safer to defer the action
          Promise.resolve().then(function () {
            return current.focus(focusOptions);
          });
        } else {
          current.focus(focusOptions);
        }
      }
    },
    [shouldReturnFocus],
  ); // MEDIUM CALLBACKS

  var onFocus = react.useCallback(function (event) {
    if (isActive.current) {
      mediumFocus.useMedium(event);
    }
  }, []);
  var onBlur = mediumBlur.useMedium; // REF PROPAGATION
  // not using real refs due to race conditions

  var setObserveNode = react.useCallback(function (newObserved) {
    if (observed.current !== newObserved) {
      observed.current = newObserved;
      setObserved(newObserved);
    }
  }, []);

  var lockProps = _extends(
    ((_extends2 = {}),
    (_extends2[FOCUS_DISABLED] = disabled && 'disabled'),
    (_extends2[FOCUS_GROUP] = group),
    _extends2),
    containerProps,
  );

  var hasLeadingGuards = noFocusGuards !== true;
  var hasTailingGuards = hasLeadingGuards && noFocusGuards !== 'tail';
  var mergedRef = useMergeRefs([parentRef, setObserveNode]);
  return /*#__PURE__*/ react.createElement(
    react.Fragment,
    null,
    hasLeadingGuards && [
      /*#__PURE__*/ react.createElement('div', {
        key: 'guard-first',
        'data-focus-guard': true,
        tabIndex: disabled ? -1 : 0,
        style: hiddenGuard,
      }),
      /*#__PURE__*/
      // nearest focus guard
      react.createElement('div', {
        key: 'guard-nearest',
        'data-focus-guard': true,
        tabIndex: disabled ? -1 : 1,
        style: hiddenGuard,
      }), // first tabbed element guard
    ],
    !disabled &&
      /*#__PURE__*/ react.createElement(SideCar, {
        id: id,
        sideCar: mediumSidecar,
        observed: realObserved,
        disabled: disabled,
        persistentFocus: persistentFocus,
        crossFrame: crossFrame,
        autoFocus: autoFocus,
        whiteList: whiteList,
        shards: shards,
        onActivation: onActivation,
        onDeactivation: onDeactivation,
        returnFocus: returnFocus,
      }),
    /*#__PURE__*/ react.createElement(
      Container,
      _extends(
        {
          ref: mergedRef,
        },
        lockProps,
        {
          className: className,
          onBlur: onBlur,
          onFocus: onFocus,
        },
      ),
      children,
    ),
    hasTailingGuards &&
      /*#__PURE__*/ react.createElement('div', {
        'data-focus-guard': true,
        tabIndex: disabled ? -1 : 0,
        style: hiddenGuard,
      }),
  );
});
FocusLock.propTypes = {};
FocusLock.defaultProps = {
  children: undefined,
  disabled: false,
  returnFocus: false,
  noFocusGuards: false,
  autoFocus: true,
  persistentFocus: false,
  crossFrame: true,
  allowTextSelection: undefined,
  group: undefined,
  className: undefined,
  whiteList: undefined,
  shards: undefined,
  as: 'div',
  lockProps: {},
  onActivation: undefined,
  onDeactivation: undefined,
};

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function withSideEffect(reducePropsToState, handleStateChangeOnClient) {
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(
        mountedInstances.map(function (instance) {
          return instance.props;
        }),
      );
      handleStateChangeOnClient(state);
    }

    var SideEffect =
      /*#__PURE__*/
      (function (_PureComponent) {
        _inheritsLoose(SideEffect, _PureComponent);

        function SideEffect() {
          return _PureComponent.apply(this, arguments) || this;
        }

        // Try to use displayName of wrapped component
        SideEffect.peek = function peek() {
          return state;
        };

        var _proto = SideEffect.prototype;

        _proto.componentDidMount = function componentDidMount() {
          mountedInstances.push(this);
          emitChange();
        };

        _proto.componentDidUpdate = function componentDidUpdate() {
          emitChange();
        };

        _proto.componentWillUnmount = function componentWillUnmount() {
          var index = mountedInstances.indexOf(this);
          mountedInstances.splice(index, 1);
          emitChange();
        };

        _proto.render = function render() {
          return react.createElement(WrappedComponent, this.props);
        };

        return SideEffect;
      })(react.PureComponent);

    _defineProperty(
      SideEffect,
      'displayName',
      'SideEffect(' + getDisplayName(WrappedComponent) + ')',
    );

    return SideEffect;
  };
}

var toArray = function toArray(a) {
  var ret = Array(a.length);
  for (var i = 0; i < a.length; ++i) {
    ret[i] = a[i];
  }
  return ret;
};

var arrayFind = function arrayFind(array, search) {
  return array.filter(function (a) {
    return a === search;
  })[0];
};

var asArray = function asArray(a) {
  return Array.isArray(a) ? a : [a];
};

var tabSort = function tabSort(a, b) {
  var tabDiff = a.tabIndex - b.tabIndex;
  var indexDiff = a.index - b.index;

  if (tabDiff) {
    if (!a.tabIndex) return 1;
    if (!b.tabIndex) return -1;
  }

  return tabDiff || indexDiff;
};

var orderByTabIndex = function orderByTabIndex(
  nodes,
  filterNegative,
  keepGuards,
) {
  return toArray(nodes)
    .map(function (node, index) {
      return {
        node: node,
        index: index,
        tabIndex:
          keepGuards && node.tabIndex === -1
            ? (node.dataset || {}).focusGuard
              ? 0
              : -1
            : node.tabIndex,
      };
    })
    .filter(function (data) {
      return !filterNegative || data.tabIndex >= 0;
    })
    .sort(tabSort);
};

var tabbables = [
  'button:enabled:not([readonly])',
  'select:enabled:not([readonly])',
  'textarea:enabled:not([readonly])',
  'input:enabled:not([readonly])',
  'a[href]',
  'area[href]',
  'iframe',
  'object',
  'embed',
  '[tabindex]',
  '[contenteditable]',
  '[autofocus]',
];

var queryTabbables = tabbables.join(',');
var queryGuardTabbables = queryTabbables + ', [data-focus-guard]';

var getFocusables = function getFocusables(parents, withGuards) {
  return parents.reduce(function (acc, parent) {
    return acc.concat(
      // add all tabbables inside
      toArray(
        parent.querySelectorAll(
          withGuards ? queryGuardTabbables : queryTabbables,
        ),
      ),
      // add if node is tabble itself
      parent.parentNode
        ? toArray(
            parent.parentNode.querySelectorAll(tabbables.join(',')),
          ).filter(function (node) {
            return node === parent;
          })
        : [],
    );
  }, []);
};

var getParentAutofocusables = function getParentAutofocusables(parent) {
  var parentFocus = parent.querySelectorAll('[' + FOCUS_AUTO + ']');
  return toArray(parentFocus)
    .map(function (node) {
      return getFocusables([node]);
    })
    .reduce(function (acc, nodes) {
      return acc.concat(nodes);
    }, []);
};

var isElementHidden = function isElementHidden(computedStyle) {
  if (!computedStyle || !computedStyle.getPropertyValue) {
    return false;
  }
  return (
    computedStyle.getPropertyValue('display') === 'none' ||
    computedStyle.getPropertyValue('visibility') === 'hidden'
  );
};

var isVisible = function isVisible(node) {
  return (
    !node ||
    node === document ||
    node.nodeType === Node.DOCUMENT_NODE ||
    (!isElementHidden(window.getComputedStyle(node, null)) &&
      isVisible(
        node.parentNode &&
          node.parentNode.nodeType === node.DOCUMENT_FRAGMENT_NODE
          ? node.parentNode.host
          : node.parentNode,
      ))
  );
};

var notHiddenInput = function notHiddenInput(node) {
  return !(
    (node.tagName === 'INPUT' || node.tagName === 'BUTTON') &&
    (node.type === 'hidden' || node.disabled)
  );
};

var getParents = function getParents(node) {
  var parents =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  parents.push(node);
  if (node.parentNode) {
    getParents(node.parentNode, parents);
  }
  return parents;
};

var getCommonParent = function getCommonParent(nodea, nodeb) {
  var parentsA = getParents(nodea);
  var parentsB = getParents(nodeb);

  for (var i = 0; i < parentsA.length; i += 1) {
    var currentParent = parentsA[i];
    if (parentsB.indexOf(currentParent) >= 0) {
      return currentParent;
    }
  }
  return false;
};

var filterFocusable = function filterFocusable(nodes) {
  return toArray(nodes)
    .filter(function (node) {
      return isVisible(node);
    })
    .filter(function (node) {
      return notHiddenInput(node);
    });
};

var getTabbableNodes = function getTabbableNodes(topNodes, withGuards) {
  return orderByTabIndex(
    filterFocusable(getFocusables(topNodes, withGuards)),
    true,
    withGuards,
  );
};

/**
 * actually anything focusable
 */
var getAllTabbableNodes = function getAllTabbableNodes(topNodes) {
  return orderByTabIndex(filterFocusable(getFocusables(topNodes)), false);
};

var parentAutofocusables = function parentAutofocusables(topNode) {
  return filterFocusable(getParentAutofocusables(topNode));
};

var isRadio = function isRadio(node) {
  return node.tagName === 'INPUT' && node.type === 'radio';
};

var findSelectedRadio = function findSelectedRadio(node, nodes) {
  return (
    nodes
      .filter(isRadio)
      .filter(function (el) {
        return el.name === node.name;
      })
      .filter(function (el) {
        return el.checked;
      })[0] || node
  );
};

var correctNode = function correctNode(node, nodes) {
  if (isRadio(node) && node.name) {
    return findSelectedRadio(node, nodes);
  }
  return node;
};

var correctNodes = function correctNodes(nodes) {
  // IE11 has no Set constructor
  var resultSet = new Set();
  nodes.forEach(function (node) {
    return resultSet.add(correctNode(node, nodes));
  });
  // using filter to support IE11
  return nodes.filter(function (node) {
    return resultSet.has(node);
  });
};

var pickFirstFocus = function pickFirstFocus(nodes) {
  if (nodes[0] && nodes.length > 1) {
    return correctNode(nodes[0], nodes);
  }
  return nodes[0];
};

var pickFocusable = function pickFocusable(nodes, index) {
  if (nodes.length > 1) {
    return nodes.indexOf(correctNode(nodes[index], nodes));
  }
  return index;
};

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };

var filterNested = function filterNested(nodes) {
  var l = nodes.length;
  for (var i = 0; i < l; i += 1) {
    var _loop = function _loop(j) {
      if (i !== j) {
        if (nodes[i].contains(nodes[j])) {
          return {
            v: filterNested(
              nodes.filter(function (x) {
                return x !== nodes[j];
              }),
            ),
          };
        }
      }
    };

    for (var j = 0; j < l; j += 1) {
      var _ret = _loop(j);

      if (
        (typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === 'object'
      )
        return _ret.v;
    }
  }
  return nodes;
};

var getTopParent = function getTopParent(node) {
  return node.parentNode ? getTopParent(node.parentNode) : node;
};

var getAllAffectedNodes = function getAllAffectedNodes(node) {
  var nodes = asArray(node);
  return nodes.filter(Boolean).reduce(function (acc, currentNode) {
    var group = currentNode.getAttribute(FOCUS_GROUP);
    acc.push.apply(
      acc,
      group
        ? filterNested(
            toArray(
              getTopParent(currentNode).querySelectorAll(
                '[' +
                  FOCUS_GROUP +
                  '="' +
                  group +
                  '"]:not([' +
                  FOCUS_DISABLED +
                  '="disabled"])',
              ),
            ),
          )
        : [currentNode],
    );
    return acc;
  }, []);
};

var findAutoFocused = function findAutoFocused(autoFocusables) {
  return function (node) {
    return (
      !!node.autofocus ||
      (node.dataset && !!node.dataset.autofocus) ||
      autoFocusables.indexOf(node) >= 0
    );
  };
};

var isGuard = function isGuard(node) {
  return node && node.dataset && node.dataset.focusGuard;
};
var notAGuard = function notAGuard(node) {
  return !isGuard(node);
};

var NEW_FOCUS = 'NEW_FOCUS';

var newFocus = function newFocus(
  innerNodes,
  outerNodes,
  activeElement,
  lastNode,
) {
  var cnt = innerNodes.length;
  var firstFocus = innerNodes[0];
  var lastFocus = innerNodes[cnt - 1];
  var isOnGuard = isGuard(activeElement);

  // focus is inside
  if (innerNodes.indexOf(activeElement) >= 0) {
    return undefined;
  }

  var activeIndex = outerNodes.indexOf(activeElement);
  var lastIndex = outerNodes.indexOf(lastNode || activeIndex);
  var lastNodeInside = innerNodes.indexOf(lastNode);
  var indexDiff = activeIndex - lastIndex;
  var firstNodeIndex = outerNodes.indexOf(firstFocus);
  var lastNodeIndex = outerNodes.indexOf(lastFocus);

  var correctedNodes = correctNodes(outerNodes);
  var correctedIndexDiff =
    correctedNodes.indexOf(activeElement) -
    correctedNodes.indexOf(lastNode || activeIndex);

  var returnFirstNode = pickFocusable(innerNodes, 0);
  var returnLastNode = pickFocusable(innerNodes, cnt - 1);

  // new focus
  if (activeIndex === -1 || lastNodeInside === -1) {
    return NEW_FOCUS;
  }
  // old focus
  if (!indexDiff && lastNodeInside >= 0) {
    return lastNodeInside;
  }
  // first element
  if (activeIndex <= firstNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnLastNode;
  }
  // last element
  if (activeIndex >= lastNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnFirstNode;
  }
  // jump out, but not on the guard
  if (indexDiff && Math.abs(correctedIndexDiff) > 1) {
    return lastNodeInside;
  }
  // focus above lock
  if (activeIndex <= firstNodeIndex) {
    return returnLastNode;
  }
  // focus below lock
  if (activeIndex > lastNodeIndex) {
    return returnFirstNode;
  }
  // index is inside tab order, but outside Lock
  if (indexDiff) {
    if (Math.abs(indexDiff) > 1) {
      return lastNodeInside;
    }
    return (cnt + lastNodeInside + indexDiff) % cnt;
  }
  // do nothing
  return undefined;
};

var getTopCommonParent = function getTopCommonParent(
  baseActiveElement,
  leftEntry,
  rightEntries,
) {
  var activeElements = asArray(baseActiveElement);
  var leftEntries = asArray(leftEntry);
  var activeElement = activeElements[0];
  var topCommon = null;
  leftEntries.filter(Boolean).forEach(function (entry) {
    topCommon = getCommonParent(topCommon || entry, entry) || topCommon;
    rightEntries.filter(Boolean).forEach(function (subEntry) {
      var common = getCommonParent(activeElement, subEntry);
      if (common) {
        if (!topCommon || common.contains(topCommon)) {
          topCommon = common;
        } else {
          topCommon = getCommonParent(common, topCommon);
        }
      }
    });
  });
  return topCommon;
};

var allParentAutofocusables = function allParentAutofocusables(entries) {
  return entries.reduce(function (acc, node) {
    return acc.concat(parentAutofocusables(node));
  }, []);
};

var reorderNodes = function reorderNodes(srcNodes, dstNodes) {
  var remap = new Map();
  // no Set(dstNodes) for IE11 :(
  dstNodes.forEach(function (entity) {
    return remap.set(entity.node, entity);
  });
  // remap to dstNodes
  return srcNodes
    .map(function (node) {
      return remap.get(node);
    })
    .filter(Boolean);
};

var getFocusabledIn = function getFocusabledIn(topNode) {
  var entries = getAllAffectedNodes(topNode).filter(notAGuard);
  var commonParent = getTopCommonParent(topNode, topNode, entries);
  var outerNodes = getTabbableNodes([commonParent], true);
  var innerElements = getTabbableNodes(entries)
    .filter(function (_ref) {
      var node = _ref.node;
      return notAGuard(node);
    })
    .map(function (_ref2) {
      var node = _ref2.node;
      return node;
    });

  return outerNodes.map(function (_ref3) {
    var node = _ref3.node,
      index = _ref3.index;
    return {
      node: node,
      index: index,
      lockItem: innerElements.indexOf(node) >= 0,
      guard: isGuard(node),
    };
  });
};

var getFocusMerge = function getFocusMerge(topNode, lastNode) {
  var activeElement = document && document.activeElement;
  var entries = getAllAffectedNodes(topNode).filter(notAGuard);

  var commonParent = getTopCommonParent(
    activeElement || topNode,
    topNode,
    entries,
  );

  var anyFocusable = getAllTabbableNodes(entries);
  var innerElements = getTabbableNodes(entries).filter(function (_ref4) {
    var node = _ref4.node;
    return notAGuard(node);
  });

  if (!innerElements[0]) {
    innerElements = anyFocusable;
    if (!innerElements[0]) {
      return undefined;
    }
  }

  var outerNodes = getAllTabbableNodes([commonParent]).map(function (_ref5) {
    var node = _ref5.node;
    return node;
  });
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerNodes = orderedInnerElements.map(function (_ref6) {
    var node = _ref6.node;
    return node;
  });

  var newId = newFocus(innerNodes, outerNodes, activeElement, lastNode);

  if (newId === 'NEW_FOCUS') {
    var autoFocusable = anyFocusable
      .map(function (_ref7) {
        var node = _ref7.node;
        return node;
      })
      .filter(findAutoFocused(allParentAutofocusables(entries)));

    return {
      node:
        autoFocusable && autoFocusable.length
          ? pickFirstFocus(autoFocusable)
          : pickFirstFocus(innerNodes),
    };
  }

  if (newId === undefined) {
    return newId;
  }
  return orderedInnerElements[newId];
};

var focusInFrame = function focusInFrame(frame) {
  return frame === document.activeElement;
};

var focusInsideIframe = function focusInsideIframe(topNode) {
  return !!arrayFind(toArray(topNode.querySelectorAll('iframe')), focusInFrame);
};

var focusInside = function focusInside(topNode) {
  var activeElement = document && document.activeElement;

  if (
    !activeElement ||
    (activeElement.dataset && activeElement.dataset.focusGuard)
  ) {
    return false;
  }
  return getAllAffectedNodes(topNode).reduce(function (result, node) {
    return result || node.contains(activeElement) || focusInsideIframe(node);
  }, false);
};

var focusIsHidden = function focusIsHidden() {
  return (
    document &&
    toArray(document.querySelectorAll('[' + FOCUS_ALLOW + ']')).some(function (
      node,
    ) {
      return node.contains(document.activeElement);
    })
  );
};

var focusOn = function focusOn(target) {
  target.focus();
  if (target.contentWindow) {
    target.contentWindow.focus();
  }
};

var guardCount = 0;
var lockDisabled = false;

var setFocus = function (topNode, lastNode) {
  var focusable = getFocusMerge(topNode, lastNode);

  if (lockDisabled) {
    return;
  }

  if (focusable) {
    if (guardCount > 2) {
      // eslint-disable-next-line no-console
      console.error(
        'FocusLock: focus-fighting detected. Only one focus management system could be active. ' +
          'See https://github.com/theKashey/focus-lock/#focus-fighting',
      );
      lockDisabled = true;
      setTimeout(function () {
        lockDisabled = false;
      }, 1);
      return;
    }
    guardCount++;
    focusOn(focusable.node);
    guardCount--;
  }
};

function deferAction(action) {
  // Hidding setImmediate from Webpack to avoid inserting polyfill
  var _window = window,
    setImmediate = _window.setImmediate;

  if (typeof setImmediate !== 'undefined') {
    setImmediate(action);
  } else {
    setTimeout(action, 1);
  }
}

var focusOnBody = function focusOnBody() {
  return document && document.activeElement === document.body;
};

var isFreeFocus = function isFreeFocus() {
  return focusOnBody() || focusIsHidden();
};

var lastActiveTrap = null;
var lastActiveFocus = null;
var lastPortaledElement = null;
var focusWasOutsideWindow = false;

var defaultWhitelist = function defaultWhitelist() {
  return true;
};

var focusWhitelisted = function focusWhitelisted(activeElement) {
  return (lastActiveTrap.whiteList || defaultWhitelist)(activeElement);
};

var recordPortal = function recordPortal(observerNode, portaledElement) {
  lastPortaledElement = {
    observerNode: observerNode,
    portaledElement: portaledElement,
  };
};

var focusIsPortaledPair = function focusIsPortaledPair(element) {
  return lastPortaledElement && lastPortaledElement.portaledElement === element;
};

function autoGuard(startIndex, end, step, allNodes) {
  var lastGuard = null;
  var i = startIndex;

  do {
    var item = allNodes[i];

    if (item.guard) {
      if (item.node.dataset.focusAutoGuard) {
        lastGuard = item;
      }
    } else if (item.lockItem) {
      if (i !== startIndex) {
        // we will tab to the next element
        return;
      }

      lastGuard = null;
    } else {
      break;
    }
  } while ((i += step) !== end);

  if (lastGuard) {
    lastGuard.node.tabIndex = 0;
  }
}

var extractRef = function extractRef(ref) {
  return ref && 'current' in ref ? ref.current : ref;
};

var focusWasOutside = function focusWasOutside(crossFrameOption) {
  if (crossFrameOption) {
    // with cross frame return true for any value
    return Boolean(focusWasOutsideWindow);
  } // in other case return only of focus went a while aho

  return focusWasOutsideWindow === 'meanwhile';
};

var activateTrap = function activateTrap() {
  var result = false;

  if (lastActiveTrap) {
    var _lastActiveTrap = lastActiveTrap,
      observed = _lastActiveTrap.observed,
      persistentFocus = _lastActiveTrap.persistentFocus,
      autoFocus = _lastActiveTrap.autoFocus,
      shards = _lastActiveTrap.shards,
      crossFrame = _lastActiveTrap.crossFrame;
    var workingNode =
      observed || (lastPortaledElement && lastPortaledElement.portaledElement);
    var activeElement = document && document.activeElement;

    if (workingNode) {
      var workingArea = [workingNode].concat(
        shards.map(extractRef).filter(Boolean),
      );

      if (!activeElement || focusWhitelisted(activeElement)) {
        if (
          persistentFocus ||
          focusWasOutside(crossFrame) ||
          !isFreeFocus() ||
          (!lastActiveFocus && autoFocus)
        ) {
          if (
            workingNode &&
            !(focusInside(workingArea) || focusIsPortaledPair(activeElement))
          ) {
            if (document && !lastActiveFocus && activeElement && !autoFocus) {
              // Check if blur() exists, which is missing on certain elements on IE
              if (activeElement.blur) {
                activeElement.blur();
              }

              document.body.focus();
            } else {
              result = setFocus(workingArea, lastActiveFocus);
              lastPortaledElement = {};
            }
          }

          focusWasOutsideWindow = false;
          lastActiveFocus = document && document.activeElement;
        }
      }

      if (document) {
        var newActiveElement = document && document.activeElement;
        var allNodes = getFocusabledIn(workingArea);
        var focusedItem = allNodes.find(function (_ref) {
          var node = _ref.node;
          return node === newActiveElement;
        });

        if (focusedItem) {
          // remove old focus
          allNodes
            .filter(function (_ref2) {
              var guard = _ref2.guard,
                node = _ref2.node;
              return guard && node.dataset.focusAutoGuard;
            })
            .forEach(function (_ref3) {
              var node = _ref3.node;
              return node.removeAttribute('tabIndex');
            });
          var focusedIndex = allNodes.indexOf(focusedItem);
          autoGuard(focusedIndex, allNodes.length, +1, allNodes);
          autoGuard(focusedIndex, -1, -1, allNodes);
        }
      }
    }
  }

  return result;
};

var onTrap = function onTrap(event) {
  if (activateTrap() && event) {
    // prevent scroll jump
    event.stopPropagation();
    event.preventDefault();
  }
};

var onBlur = function onBlur() {
  return deferAction(activateTrap);
};

var onFocus = function onFocus(event) {
  // detect portal
  var source = event.target;
  var currentNode = event.currentTarget;

  if (!currentNode.contains(source)) {
    recordPortal(currentNode, source);
  }
};

var FocusWatcher = function FocusWatcher() {
  return null;
};

var onWindowBlur = function onWindowBlur() {
  focusWasOutsideWindow = 'just'; // using setTimeout to set  this variable after React/sidecar reaction

  setTimeout(function () {
    focusWasOutsideWindow = 'meanwhile';
  }, 0);
};

var attachHandler = function attachHandler() {
  document.addEventListener('focusin', onTrap, true);
  document.addEventListener('focusout', onBlur);
  window.addEventListener('blur', onWindowBlur);
};

var detachHandler = function detachHandler() {
  document.removeEventListener('focusin', onTrap, true);
  document.removeEventListener('focusout', onBlur);
  window.removeEventListener('blur', onWindowBlur);
};

function reducePropsToState(propsList) {
  return propsList.filter(function (_ref5) {
    var disabled = _ref5.disabled;
    return !disabled;
  });
}

function handleStateChangeOnClient(traps) {
  var trap = traps.slice(-1)[0];

  if (trap && !lastActiveTrap) {
    attachHandler();
  }

  var lastTrap = lastActiveTrap;
  var sameTrap = lastTrap && trap && trap.id === lastTrap.id;
  lastActiveTrap = trap;

  if (lastTrap && !sameTrap) {
    lastTrap.onDeactivation(); // return focus only of last trap was removed

    if (
      !traps.filter(function (_ref6) {
        var id = _ref6.id;
        return id === lastTrap.id;
      }).length
    ) {
      // allow defer is no other trap is awaiting restore
      lastTrap.returnFocus(!trap);
    }
  }

  if (trap) {
    lastActiveFocus = null;

    if (!sameTrap || lastTrap.observed !== trap.observed) {
      trap.onActivation();
    }

    activateTrap();
    deferAction(activateTrap);
  } else {
    detachHandler();
    lastActiveFocus = null;
  }
} // bind medium

mediumFocus.assignSyncMedium(onFocus);
mediumBlur.assignMedium(onBlur);
mediumEffect.assignMedium(function (cb) {
  return cb({
    moveFocusInside: setFocus,
    focusInside: focusInside,
  });
});
var FocusTrap = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
)(FocusWatcher);

/* that would be a BREAKING CHANGE!
// delaying sidecar execution till the first usage
const RequireSideCar = (props) => {
  // eslint-disable-next-line global-require
  const SideCar = require('./Trap').default;
  return <SideCar {...props} />;
};
*/

var FocusLockCombination = /*#__PURE__*/ react.forwardRef(function (
  props,
  ref,
) {
  return /*#__PURE__*/ react.createElement(
    FocusLock,
    _extends(
      {
        sideCar: FocusTrap,
        ref: ref,
      },
      props,
    ),
  );
});

var _ref = FocusLock.propTypes || {},
  sideCar = _ref.sideCar,
  propTypes = _objectWithoutPropertiesLoose(_ref, ['sideCar']);

FocusLockCombination.propTypes = propTypes;

var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';

var effectCar = createSidecarMedium();

var nothing = function () {
  return;
};
var RemoveScroll = react.forwardRef(function (props, parentRef) {
  var ref = react.useRef(null);
  var _a = react.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing,
    }),
    callbacks = _a[0],
    setCallbacks = _a[1];
  var forwardProps = props.forwardProps,
    children = props.children,
    className = props.className,
    removeScrollBar = props.removeScrollBar,
    enabled = props.enabled,
    shards = props.shards,
    sideCar = props.sideCar,
    noIsolation = props.noIsolation,
    inert = props.inert,
    allowPinchZoom = props.allowPinchZoom,
    rest = __rest(props, [
      'forwardProps',
      'children',
      'className',
      'removeScrollBar',
      'enabled',
      'shards',
      'sideCar',
      'noIsolation',
      'inert',
      'allowPinchZoom',
    ]);
  var SideCar = sideCar;
  var containerProps = __assign(
    { ref: useMergeRefs([ref, parentRef]) },
    rest,
    callbacks,
  );
  return react.createElement(
    react.Fragment,
    null,
    enabled &&
      react.createElement(SideCar, {
        sideCar: effectCar,
        removeScrollBar: removeScrollBar,
        shards: shards,
        noIsolation: noIsolation,
        inert: inert,
        setCallbacks: setCallbacks,
        allowPinchZoom: !!allowPinchZoom,
        lockRef: ref,
      }),
    forwardProps
      ? react.cloneElement(react.Children.only(children), containerProps)
      : react.createElement(
          'div',
          __assign({}, containerProps, { className: className }),
          children,
        ),
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false,
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

var getNonce = function () {
  if (typeof __webpack_nonce__ !== 'undefined') {
    return __webpack_nonce__;
  }
  return undefined;
};

function makeStyleTag() {
  if (!document) return null;
  var tag = document.createElement('style');
  tag.type = 'text/css';
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute('nonce', nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function () {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function (style) {
      if (counter == 0) {
        if ((stylesheet = makeStyleTag())) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function () {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    },
  };
};

var styleHookSingleton = function () {
  var sheet = stylesheetSingleton();
  return function (styles) {
    react.useEffect(function () {
      sheet.add(styles);
      return function () {
        sheet.remove();
      };
    }, []);
  };
};

var styleSingleton = function () {
  var useStyle = styleHookSingleton();
  var Sheet = function (_a) {
    var styles = _a.styles;
    useStyle(styles);
    return null;
  };
  return Sheet;
};

var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0,
};
var parse = function (x) {
  return parseInt(x || '', 10) || 0;
};
var getOffset = function (gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
  var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
  var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
  if (gapMode === void 0) {
    gapMode = 'margin';
  }
  if (typeof window === 'undefined') {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
  };
};

var Style = styleSingleton();
var getStyles = function (_a, allowRelative, gapMode, important) {
  var left = _a.left,
    top = _a.top,
    right = _a.right,
    gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = 'margin';
  }
  return (
    '\n  .' +
    noScrollbarsClassName +
    ' {\n   overflow: hidden ' +
    important +
    ';\n   padding-right: ' +
    gap +
    'px ' +
    important +
    ';\n  }\n  body {\n    overflow: hidden ' +
    important +
    ';\n    ' +
    [
      allowRelative && 'position: relative ' + important + ';',
      gapMode === 'margin' &&
        '\n    padding-left: ' +
          left +
          'px;\n    padding-top: ' +
          top +
          'px;\n    padding-right: ' +
          right +
          'px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ' +
          gap +
          'px ' +
          important +
          ';\n    ',
      gapMode === 'padding' &&
        'padding-right: ' + gap + 'px ' + important + ';',
    ]
      .filter(Boolean)
      .join('') +
    '\n  }\n  \n  .' +
    zeroRightClassName +
    ' {\n    right: ' +
    gap +
    'px ' +
    important +
    ';\n  }\n  \n  .' +
    fullWidthClassName +
    ' {\n    margin-right: ' +
    gap +
    'px ' +
    important +
    ';\n  }\n  \n  .' +
    zeroRightClassName +
    ' .' +
    zeroRightClassName +
    ' {\n    right: 0 ' +
    important +
    ';\n  }\n  \n  .' +
    fullWidthClassName +
    ' .' +
    fullWidthClassName +
    ' {\n    margin-right: 0 ' +
    important +
    ';\n  }\n'
  );
};
var RemoveScrollBar = function (props) {
  var _a = react.useState(getGapWidth(props.gapMode)),
    gap = _a[0],
    setGap = _a[1];
  react.useEffect(
    function () {
      setGap(getGapWidth(props.gapMode));
    },
    [props.gapMode],
  );
  var noRelative = props.noRelative,
    noImportant = props.noImportant,
    _b = props.gapMode,
    gapMode = _b === void 0 ? 'margin' : _b;
  return react.createElement(Style, {
    styles: getStyles(
      gap,
      !noRelative,
      gapMode,
      !noImportant ? '!important' : '',
    ),
  });
};

var elementCouldBeVScrolled = function (node) {
  var styles = window.getComputedStyle(node);
  return (
    styles.overflowY !== 'hidden' && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowY === 'visible') // scrollable
  );
};
var elementCouldBeHScrolled = function (node) {
  var styles = window.getComputedStyle(node);
  return (
    styles.overflowX !== 'hidden' && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowX === 'visible') // scrollable
  );
};
var locationCouldBeScrolled = function (axis, node) {
  var current = node;
  do {
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current),
        s = _a[1],
        d = _a[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function (_a) {
  var scrollTop = _a.scrollTop,
    scrollHeight = _a.scrollHeight,
    clientHeight = _a.clientHeight;
  return [scrollTop, scrollHeight, clientHeight];
};
var getHScrollVariables = function (_a) {
  var scrollLeft = _a.scrollLeft,
    scrollWidth = _a.scrollWidth,
    clientWidth = _a.clientWidth;
  return [scrollLeft, scrollWidth, clientWidth];
};
var elementCouldBeScrolled = function (axis, node) {
  return axis === 'v'
    ? elementCouldBeVScrolled(node)
    : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
  return axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);
};
var handleScroll = function (
  axis,
  endTarget,
  event,
  sourceDelta,
  noOverscroll,
) {
  var delta = sourceDelta;
  // find scrollable target
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target),
      position = _a[0],
      scroll_1 = _a[1],
      capacity = _a[2];
    var elementScroll = scroll_1 - capacity - position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
    // self content
    (targetInLock && (endTarget.contains(target) || endTarget === target))
  );
  if (
    isDeltaPositive &&
    ((noOverscroll && availableScroll === 0) ||
      (!noOverscroll && delta > availableScroll))
  ) {
    shouldCancelScroll = true;
  } else if (
    !isDeltaPositive &&
    ((noOverscroll && availableScrollTop === 0) ||
      (!noOverscroll && -delta > availableScrollTop))
  ) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

var passiveSupported = false;
if (typeof window !== 'undefined') {
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function () {
        passiveSupported = true;
        return true;
      },
    });
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;

var getTouchXY = function (event) {
  return 'changedTouches' in event
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0];
};
var getDeltaXY = function (event) {
  return [event.deltaX, event.deltaY];
};
var extractRef$1 = function (ref) {
  return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function (id) {
  return (
    '\n  .block-interactivity-' +
    id +
    ' {pointer-events: none;}\n  .allow-interactivity-' +
    id +
    ' {pointer-events: all;}\n'
  );
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = react.useRef([]);
  var touchStartRef = react.useRef([0, 0]);
  var activeAxis = react.useRef();
  var id = react.useState(idCounter++)[0];
  var Style = react.useState(function () {
    return styleSingleton();
  })[0];
  var lastProps = react.useRef(props);
  react.useEffect(
    function () {
      lastProps.current = props;
    },
    [props],
  );
  react.useEffect(
    function () {
      if (props.inert) {
        document.body.classList.add('block-interactivity-' + id);
        var allow_1 = [props.lockRef.current]
          .concat((props.shards || []).map(extractRef$1))
          .filter(Boolean);
        allow_1.forEach(function (el) {
          return el.classList.add('allow-interactivity-' + id);
        });
        return function () {
          document.body.classList.remove('block-interactivity-' + id);
          allow_1.forEach(function (el) {
            return el.classList.remove('allow-interactivity-' + id);
          });
        };
      }
      return;
    },
    [props.inert, props.lockRef.current, props.shards],
  );
  var shouldCancelEvent = react.useCallback(function (event, parent) {
    if ('touches' in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
    var canBeScrolledInMainDirection = locationCouldBeScrolled(
      moveDirection,
      target,
    );
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === 'v' ? 'h' : 'v';
      canBeScrolledInMainDirection = locationCouldBeScrolled(
        moveDirection,
        target,
      );
      // other axis might be not scrollable
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (
      !activeAxis.current &&
      'changedTouches' in event &&
      (deltaX || deltaY)
    ) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(
      cancelingAxis,
      parent,
      event,
      cancelingAxis == 'h' ? deltaX : deltaY,
      true,
    );
  }, []);
  var shouldPrevent = react.useCallback(function (_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
      // not the last active
      return;
    }
    var delta = 'deltaY' in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function (e) {
      return (
        e.name === event.type &&
        e.target === event.target &&
        deltaCompare(e.delta, delta)
      );
    })[0];
    // self event, and should be canceled
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    // outside or shard event
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || [])
        .map(extractRef$1)
        .filter(Boolean)
        .filter(function (node) {
          return node.contains(event.target);
        });
      var shouldStop =
        shardNodes.length > 0
          ? shouldCancelEvent(event, shardNodes[0])
          : !lastProps.current.noIsolation;
      if (shouldStop) {
        event.preventDefault();
      }
    }
  }, []);
  var shouldCancel = react.useCallback(function (name, delta, target, should) {
    var event = { name: name, delta: delta, target: target, should: should };
    shouldPreventQueue.current.push(event);
    setTimeout(function () {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function (
        e,
      ) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = react.useCallback(function (event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = undefined;
  }, []);
  var scrollWheel = react.useCallback(function (event) {
    shouldCancel(
      event.type,
      getDeltaXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  var scrollTouchMove = react.useCallback(function (event) {
    shouldCancel(
      event.type,
      getTouchXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  react.useEffect(function () {
    lockStack.push(Style);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove,
    });
    document.addEventListener('wheel', shouldPrevent, nonPassive);
    document.addEventListener('touchmove', shouldPrevent, nonPassive);
    document.addEventListener('touchstart', scrollTouchStart, nonPassive);
    return function () {
      lockStack = lockStack.filter(function (inst) {
        return inst !== Style;
      });
      document.removeEventListener('wheel', shouldPrevent, nonPassive);
      document.removeEventListener('touchmove', shouldPrevent, nonPassive);
      document.removeEventListener('touchstart', scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar,
    inert = props.inert;
  return react.createElement(
    react.Fragment,
    null,
    inert ? react.createElement(Style, { styles: generateStyle(id) }) : null,
    removeScrollBar
      ? react.createElement(RemoveScrollBar, { gapMode: 'margin' })
      : null,
  );
}

var SideCar$1 = exportSidecar(effectCar, RemoveScrollSideCar);

var ReactRemoveScroll = react.forwardRef(function (props, ref) {
  return react.createElement(
    RemoveScroll,
    __assign({}, props, { ref: ref, sideCar: SideCar$1 }),
  );
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var overlayPropTypes = {
  allowPinchZoom: propTypes$1.bool,
  dangerouslyBypassFocusLock: propTypes$1.bool,
  dangerouslyBypassScrollLock: propTypes$1.bool,
  // TODO:
  initialFocusRef: function initialFocusRef() {
    return null;
  },
  onDismiss: propTypes$1.func,
}; ////////////////////////////////////////////////////////////////////////////////

/**
 * DialogOverlay
 *
 * Low-level component if you need more control over the styles or rendering of
 * the dialog overlay.
 *
 * Note: You must render a `DialogContent` inside.
 *
 * @see Docs https://reacttraining.com/reach-ui/dialog#dialogoverlay
 */

var DialogOverlay = /*#__PURE__*/ react.forwardRef(function DialogOverlay(
  _ref,
  forwardedRef,
) {
  var _ref$isOpen = _ref.isOpen,
    isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
    props = _objectWithoutPropertiesLoose$1(_ref, ['isOpen']);

  react.useEffect(function () {
    return checkStyles();
  }, []); // We want to ignore the immediate focus of a tooltip so it doesn't pop
  // up again when the menu closes, only pops up when focus returns again
  // to the tooltip (like native OS tooltips).

  react.useEffect(
    function () {
      if (isOpen) {
        // @ts-ignore
        window.__REACH_DISABLE_TOOLTIPS = true;
      } else {
        window.requestAnimationFrame(function () {
          // Wait a frame so that this doesn't fire before tooltip does
          // @ts-ignore
          window.__REACH_DISABLE_TOOLTIPS = false;
        });
      }
    },
    [isOpen],
  );
  return isOpen
    ? react.createElement(
        Portal,
        {
          'data-reach-dialog-wrapper': '',
        },
        react.createElement(
          DialogInner,
          Object.assign(
            {
              ref: forwardedRef,
            },
            props,
          ),
        ),
      )
    : null;
});

/**
 * DialogInner
 */

var DialogInner = /*#__PURE__*/ react.forwardRef(function DialogInner(
  _ref2,
  forwardedRef,
) {
  var allowPinchZoom = _ref2.allowPinchZoom,
    _ref2$dangerouslyBypa = _ref2.dangerouslyBypassFocusLock,
    dangerouslyBypassFocusLock =
      _ref2$dangerouslyBypa === void 0 ? false : _ref2$dangerouslyBypa,
    _ref2$dangerouslyBypa2 = _ref2.dangerouslyBypassScrollLock,
    dangerouslyBypassScrollLock =
      _ref2$dangerouslyBypa2 === void 0 ? false : _ref2$dangerouslyBypa2,
    initialFocusRef = _ref2.initialFocusRef,
    onClick = _ref2.onClick,
    _ref2$onDismiss = _ref2.onDismiss,
    onDismiss = _ref2$onDismiss === void 0 ? noop : _ref2$onDismiss,
    onKeyDown = _ref2.onKeyDown,
    onMouseDown = _ref2.onMouseDown,
    _ref2$unstable_lockFo = _ref2.unstable_lockFocusAcrossFrames,
    unstable_lockFocusAcrossFrames =
      _ref2$unstable_lockFo === void 0 ? true : _ref2$unstable_lockFo,
    props = _objectWithoutPropertiesLoose$1(_ref2, [
      'allowPinchZoom',
      'dangerouslyBypassFocusLock',
      'dangerouslyBypassScrollLock',
      'initialFocusRef',
      'onClick',
      'onDismiss',
      'onKeyDown',
      'onMouseDown',
      'unstable_lockFocusAcrossFrames',
    ]);

  var mouseDownTarget = react.useRef(null);
  var overlayNode = react.useRef(null);
  var ref = useForkedRef(overlayNode, forwardedRef);
  var activateFocusLock = react.useCallback(
    function () {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      }
    },
    [initialFocusRef],
  );

  function handleClick(event) {
    if (mouseDownTarget.current === event.target) {
      event.stopPropagation();
      onDismiss(event);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onDismiss(event);
    }
  }

  function handleMouseDown(event) {
    mouseDownTarget.current = event.target;
  }

  react.useEffect(function () {
    return overlayNode.current
      ? createAriaHider(overlayNode.current)
      : void null;
  }, []);
  return react.createElement(
    FocusLockCombination,
    {
      autoFocus: true,
      returnFocus: true,
      onActivation: activateFocusLock,
      disabled: dangerouslyBypassFocusLock,
      crossFrame: unstable_lockFocusAcrossFrames,
    },
    react.createElement(
      ReactRemoveScroll,
      {
        allowPinchZoom: allowPinchZoom,
        enabled: !dangerouslyBypassScrollLock,
      },
      react.createElement(
        'div',
        Object.assign({}, props, {
          ref: ref,
          'data-reach-dialog-overlay': '',

          /*
           * We can ignore the `no-static-element-interactions` warning here
           * because our overlay is only designed to capture any outside
           * clicks, not to serve as a clickable element itself.
           */
          onClick: wrapEvent(onClick, handleClick),
          onKeyDown: wrapEvent(onKeyDown, handleKeyDown),
          onMouseDown: wrapEvent(onMouseDown, handleMouseDown),
        }),
      ),
    ),
  );
});

/**
 * DialogContent
 *
 * Low-level component if you need more control over the styles or rendering of
 * the dialog content.
 *
 * Note: Must be a child of `DialogOverlay`.
 *
 * Note: You only need to use this when you are also styling `DialogOverlay`,
 * otherwise you can use the high-level `Dialog` component and pass the props
 * to it. Any props passed to `Dialog` component (besides `isOpen` and
 * `onDismiss`) will be spread onto `DialogContent`.
 *
 * @see Docs https://reacttraining.com/reach-ui/dialog#dialogcontent
 */

var DialogContent = /*#__PURE__*/ react.forwardRef(function DialogContent(
  _ref3,
  forwardedRef,
) {
  var onClick = _ref3.onClick,
    onKeyDown = _ref3.onKeyDown,
    props = _objectWithoutPropertiesLoose$1(_ref3, ['onClick', 'onKeyDown']);

  return react.createElement(
    'div',
    Object.assign(
      {
        'aria-modal': 'true',
        role: 'dialog',
        tabIndex: -1,
      },
      props,
      {
        ref: forwardedRef,
        'data-reach-dialog-content': '',
        onClick: wrapEvent(onClick, function (event) {
          event.stopPropagation();
        }),
      },
    ),
  );
});

/**
 * Dialog
 *
 * High-level component to render a modal dialog window over the top of the page
 * (or another dialog).
 *
 * @see Docs https://reacttraining.com/reach-ui/dialog#dialog
 */

var Dialog = /*#__PURE__*/ react.forwardRef(function Dialog(
  _ref4,
  forwardedRef,
) {
  var _ref4$allowPinchZoom = _ref4.allowPinchZoom,
    allowPinchZoom =
      _ref4$allowPinchZoom === void 0 ? false : _ref4$allowPinchZoom,
    initialFocusRef = _ref4.initialFocusRef,
    isOpen = _ref4.isOpen,
    _ref4$onDismiss = _ref4.onDismiss,
    onDismiss = _ref4$onDismiss === void 0 ? noop : _ref4$onDismiss,
    props = _objectWithoutPropertiesLoose$1(_ref4, [
      'allowPinchZoom',
      'initialFocusRef',
      'isOpen',
      'onDismiss',
    ]);

  return react.createElement(
    DialogOverlay,
    {
      allowPinchZoom: allowPinchZoom,
      initialFocusRef: initialFocusRef,
      isOpen: isOpen,
      onDismiss: onDismiss,
    },
    react.createElement(
      DialogContent,
      Object.assign(
        {
          ref: forwardedRef,
        },
        props,
      ),
    ),
  );
});

function createAriaHider(dialogNode) {
  var originalValues = [];
  var rootNodes = [];
  var ownerDocument = getOwnerDocument(dialogNode) || document;

  if (!dialogNode) {
    return noop;
  }

  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll('body > *'),
    function (node) {
      var _dialogNode$parentNod, _dialogNode$parentNod2;

      var portalNode =
        (_dialogNode$parentNod = dialogNode.parentNode) === null ||
        _dialogNode$parentNod === void 0
          ? void 0
          : (_dialogNode$parentNod2 = _dialogNode$parentNod.parentNode) ===
              null || _dialogNode$parentNod2 === void 0
          ? void 0
          : _dialogNode$parentNod2.parentNode;

      if (node === portalNode) {
        return;
      }

      var attr = node.getAttribute('aria-hidden');
      var alreadyHidden = attr !== null && attr !== 'false';

      if (alreadyHidden) {
        return;
      }

      originalValues.push(attr);
      rootNodes.push(node);
      node.setAttribute('aria-hidden', 'true');
    },
  );
  return function () {
    rootNodes.forEach(function (node, index) {
      var originalValue = originalValues[index];

      if (originalValue === null) {
        node.removeAttribute('aria-hidden');
      } else {
        node.setAttribute('aria-hidden', originalValue);
      }
    });
  };
}

export { Dialog };
