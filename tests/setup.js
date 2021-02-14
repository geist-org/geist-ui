const enzyme = require('enzyme')
/**
 * The official repository does not currently support React 17
 * https://github.com/enzymejs/enzyme/issues/2429
 */
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')

enzyme.configure({ adapter: new Adapter() })
