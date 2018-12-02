import React from 'react';
import ReactDOM from 'react-dom';
import Query from './Query';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe( 'Query Component', ()=>{

    beforeAll(()=>{
        configure({ adapter: new Adapter() });
    });
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Query />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should fail to render the query component because missing query function', () => {
 

        const queryComponent = mount(<Query />);

        expect(queryComponent.find('p').length).toBe(1);
        expect(queryComponent.text()).toBe('Unexpected error creating Query field.  Missing property');
    });

    it('should render the query component with a button called "query"', () => {
 
        const query = () =>{};
        const queryComponent = mount(<Query query={query} />);

        expect(queryComponent.text()).toBe('Query');
    });
})