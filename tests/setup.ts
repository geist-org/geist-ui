import '@testing-library/jest-dom/extend-expect'
import enzyme from 'enzyme'
/**
 * The official repository does not currently support React 17
 * https://github.com/enzymejs/enzyme/issues/2429
 */
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

enzyme.configure({ adapter: new Adapter() })
