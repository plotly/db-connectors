import React from 'react';
import ReactDOM from 'react-dom';
import DBSelector from './DBSelector';
import { shallow,mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe( 'DB Connector', ()=>{

    beforeAll(()=>{
        configure({ adapter: new Adapter() });
    });
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DBSelector />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render the db connector with 1 selector', () => {
        const options = [
            { value: 'DB2', label: 'IBM DB2' }
        ];
        const connectorSelected = ()=>{};

        const selector = mount(<DBSelector 
            options={options} 
            connectorSelected={connectorSelected}/>);
        
        expect(selector.find('input').length).toBe(1);
    });

    it('should render error for the db connector because no selector function defined', () => {
        const options = [
            { value: 'DB2', label: 'IBM DB2' }
        ];

        const selector = mount(<DBSelector 
            options={options} />);

        expect(selector.find('p').length).toBe(1);
        expect(selector.text()).toBe('Unexpected Error creating db selector');
    });
})