/* eslint-disable import/no-extraneous-dependencies */
import jsdom from 'jsdom';
import 'jest-dom/extend-expect';

const copyProps = (src, target) => {
  const props = Object.getOwnPropertyNames(src)
      .filter(prop => typeof target[prop] === 'undefined')
      .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
};

const setUpDomEnvironment = () => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/' });
  const { window } = dom;

  require.extensions['.css'] = () => null;
  require.extensions['.scss'] = () => null;
  require.extensions['.png'] = () => null;
  require.extensions['.jpg'] = () => null;
  require.extensions['.webp'] = () => null;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
  copyProps(window, global);
};

setUpDomEnvironment();
