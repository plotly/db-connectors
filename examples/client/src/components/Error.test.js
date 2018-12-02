import React from 'react';
import ReactDOM from 'react-dom';
import Error from './Error';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe( 'Error Component', ()=>{

    beforeAll(()=>{
        configure({ adapter: new Adapter() });
    });
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Error />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render the error component with provided message', () => {
        const errorMsg = 'An error occured';
        const connectorSelected = ()=>{};

        const error = mount(<Error 
            message={errorMsg} 
           />);
        
        expect(error.find('p').length).toBe(1);

        expect(error.text()).toBe('An error occured');
    });

    it('should render the error component without provided message', () => {
        const errorMsg = 'An error occured';

        const error = mount(<Error />);
        
        expect(error.find('p').length).toBe(1);

        expect(error.text()).toBe('Unexpected Error building the component');
    });
})