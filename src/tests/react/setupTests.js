// this allow to use shallow (not include components children)
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// this adds jest-dom's custom assertions (like user will use component)
import '@testing-library/jest-dom/extend-expect';

configure({ adapter: new Adapter() });