import React from 'react';
import ReactDOM from 'react-dom';
import ConnectionLabel from './ConnectionLabel';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe( 'Connection Label', ()=>{

    beforeAll(()=>{
        configure({ adapter: new Adapter() });
    });
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ConnectionLabel  />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render error for the connection label because no label defined', () => {

        const selector = mount(<ConnectionLabel
            type={'string'} />);

        expect(selector.find('p').length).toBe(1);
        expect(selector.text()).toBe('Unable to create the label missing properties');
    });

    it('should render error for the connection label because no type defined', () => {

        const selector = mount(<ConnectionLabel
            label={'mysql'} />);

        expect(selector.find('p').length).toBe(1);
        expect(selector.text()).toBe('Unable to create the label missing properties');
    });


    it('should render error for the connection label correctly', () => {

        const selector = mount(<ConnectionLabel
            label={'mysql'} type={'string'}/>);

        expect(selector.text()).toBe('mysql');
    });
})