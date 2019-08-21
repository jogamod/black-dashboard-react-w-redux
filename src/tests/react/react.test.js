import './setupTests'
import React from 'react';
import { shallow } from 'enzyme';
import ReduxTest from '../../components/ReduxTest';
import { render } from '@testing-library/react';
import store from '../../store'


describe('ReduxTest component', () => {

    it('renders without crashing', () => {
        shallow(<ReduxTest store={store} />)
    });

    it('renders title message', () => {
        const { getByText } = render(<ReduxTest store={store} />);
        expect(getByText('Redux Test component')).toBeInTheDocument();
    });
})


